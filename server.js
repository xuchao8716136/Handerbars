var http = require("http");
var url = require("url");

function start(route, handle) {
    function onRequest(request, response) {
        // 将数据给分段缓存
        var postData = '';
        var pathname = url.parse(request.url).pathname;
        // 请求是客户端发送的，客户端发送的请求在 request里面
        // 然后服务器接受了客户端发送的数据，每次访问时，就是一次请求的送达，返回的信息用 response 来处理

        console.log("Request for " + pathname + " received.");
        request.setEncoding('utf-8')
        request.addListener('data',function (postDataChunk) {
            postData += postDataChunk

        })
        request.addListener('end',function () {
            route(handle, pathname, response, postData)
        })
        route(handle, pathname, response)
    }
    http.createServer(onRequest).listen(8888);
    console.log("Server has started.");
}

exports.start = start;