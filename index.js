/* jshint esversion: 6*/

const http = require('http');
const connect = require('connect');
const httpProxy = require('http-proxy');
const replacement = require('./replacement');

const proxy = httpProxy.createProxyServer({
});

const app = connect();

app.use((req, res, next)=> {
    if (/heat_map\?/.test(req.url) && /json/i.test(req.headers.accept)) {
        let _write = res.write;
        let _writeHead = res.writeHead;

        const d = replacement;
        const buf = Buffer.from(JSON.stringify(d), 'utf-8');
        res.write = function (data, encoding) {
            // debugger
            _write.apply(res, [buf]);
            // _write.apply(res, arguments);
        };

        res.writeHead = function (code, headers) {
            const contentType = this.getHeader('content-type');
            const contentEncoding = this.getHeader('content-encoding');
            res.removeHeader('Content-Length');
            if (headers) {
                delete headers['content-length'];
            }
            res.removeHeader('Content-Encoding');
            if (headers) {
                delete headers['content-encoding'];
            }
            _writeHead.apply(res, arguments);
        };
    }
    next();
});

app.use((req, res)=> {
    console.log(req.url);
    proxy.web(req, res, { target: 'http://localhost:8000' });
});


http.createServer(app).listen(8080);
