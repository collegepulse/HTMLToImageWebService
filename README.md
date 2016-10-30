# HTMLToImageWebService

HTMLToImageWebService is a web service (built on top of PhantomJS) for rendering HTML as an image.

It is designed to be **fast** and **fault-tolerant**.

# API

## POST /

Use `Content-Type: application/x-www-form-urlencoded` when making requests.

| Key            	| Type   	| Default 	| Description                                                              	|
|----------------	|--------	|---------	|--------------------------------------------------------------------------	|
| content        	| string 	| ""      	| HTML document to render as image.                                        	|
| transactionId  	| string 	| uuid    	| A unique string associated with an individual HTTP request.              	|
| viewportWidth  	| number 	| 1024    	| Width of viewport (in pixels) to render HTML document in.                	|
| viewportHeight 	| number 	| 768     	| Height of viewport (in pixels) to render HTML document in.               	|
| format         	| string 	| "PNG"   	| File format to return. One of "PNG", "GIF", or "JPEG".                   	|
| delay          	| number 	| 0       	| Number of (approximate) milliseconds to delay before rendering the page. 	|
| zoomFactor     	| number 	| 1       	| Scaling factor for render.                                               	|
