/* jshint esversion: 6*/

const http = require('http');
const connect = require('connect');
const httpProxy = require('http-proxy');

const proxy = httpProxy.createProxyServer({});

const app = connect();

const mapping = new Map();
mapping.set(/reporting\/accounts\?/, require('./jsons/accounts'));

app.use((req, res, next)=> {
    for (const [key, replacement] of mapping) {
        if (key.test(req.url)) {
            console.log('Matched', key);
            let _write = res.write;
            let _writeHead = res.writeHead;

            const d = replacement;
            const buf = Buffer.from(JSON.stringify(d), 'utf-8');
            res.write = function (data, encoding) {
                _write.apply(res, [buf]);
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
                _writeHead.apply(res, [200, headers]);
            };
        }
    }
    next();
});

app.use((req, res)=> {
    console.log(req.url);
    proxy.web(req, res, { target: 'http://localhost:8083' });
});


console.log("Listening on 8989");
http.createServer(app).listen(8989);
