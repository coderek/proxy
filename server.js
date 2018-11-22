const express = require('express')
const cors = require('cors')
const httpProxy = require('http-proxy');

const app = express()
const routeRouter = require('./apis/route')
const ordersRouter = require('./apis/orders')
const ninjaControlRouter = require('./apis/ninja-control')
const driverRouter = require('./apis/driver')

const corsOptions = {
  credentials: true,
  allowedHeaders: 'Accept,Authorization,Cache-Control,Content-Type,DNT,If-Modified-Since,Keep-Alive,Origin,User-Agent,X-Mx-ReqToken,X-Requested-With,timezone,csrf_token,version,x-nv-shipper-id,x-nv-firebase-token',
  origin: 'http://operatorv2-local.ninjavan.co:7000'
}

app.use(cors(corsOptions))
app.use('/route', routeRouter)
app.use('/orders', ordersRouter)
app.use('/ninja-control', ninjaControlRouter)
app.use('/driver', driverRouter)

const proxy = httpProxy.createProxyServer({
  target: {
    protocol: 'https:',
    host: 'api-dev.ninjavan.co',
    port: 443,
    path: '/sg'
  },
  changeOrigin: true
});

app.use((req, res)=> {
  proxy.web(req, res);
});

const port = 3333
app.listen(port, () => console.log(
  `Operator fake server is listening on port ${port}!`))
