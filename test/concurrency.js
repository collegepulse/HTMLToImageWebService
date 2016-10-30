/* eslint no-console: 0 */

/* Tests concurrent requests. */

const request = require('request');
const _ = require('lodash');

let transactionids = _.range(50);
transactionids.forEach(function (transactionid) {
  request({
    url: 'http://localhost:5566/',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      transactionid: transactionid
    },
    form: {content: transactionid}
  }, function (error, response) {
    if (String(transactionid) !== String(response.headers.transactionid)) {
      console.log('Expected', transactionid, 'to equal', response.headers.transactionid);
    }
  });
});
