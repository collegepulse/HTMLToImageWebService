/* eslint no-var: 0 */
/* eslint no-console: 0 */
/* eslint vars-on-top: 0 */

var webserver = require('webserver');
var system = require('system');
var port = system.env.HTML_TO_IMAGE_PORT ? system.env.HTML_TO_IMAGE_PORT : 5566;
var server = webserver.create();
var uuid = require('node-uuid');

var service = server.listen(port, function (request, response) {
  var page = require('webpage').create();
  try {
    var config = {
      content: request.post && request.post.content ? request.post.content : '',
      delay: request.post && request.post.delay ? Number(request.post.delay) : 0,
      format: request.post && request.post.format ? request.post.format : 'PNG',
      transactionid: request.headers && request.headers.transactionid ?
        request.headers.transactionid : uuid.v4(),
      viewportWidth: request.post && request.post.viewportWidth ?
        Number(request.post.viewportWidth) : 1024,
      viewportHeight: request.post && request.post.viewportHeight ?
        Number(request.post.viewportHeight) : 768,
      zoomFactor: request.post && request.post.zoomFactor ? Number(request.post.zoomFactor) : 1
    };
    page.viewportSize = {
      width: config.viewportWidth,
      height: config.viewportHeight
    };
    page.zoomFactor = config.zoomFactor;
    page.content = config.content;
    window.setTimeout(function () {
      response.setHeader('transactionid', config.transactionid);
      response.setHeader('Content-Type', 'image/' + config.format);
      response.setEncoding('binary');
      response.write(atob(page.renderBase64(config.format)));
      page.close();
      response.close();
    }, config.delay);
  } catch (err) {
    console.log('[Error]', err);
    response.statusCode = 500;
    response.write('An error occured.');
    response.close();
    page.close();
  }
});

if (service) {
  console.log('[Info] Web server running on port', port);
} else {
  console.log('[Error] Could not create web server listening on port', port);
  // eslint-disable-next-line no-undef
  phantom.exit(1);
}
