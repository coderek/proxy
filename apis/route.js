const { Router } = require('express')
const routesResponse = require('../jsons/routes')
const manifestResponse = require('../jsons/route-manifest')
const waypointsResponse = require('../jsons/waypoints')

const router = Router()


// respond with "hello world" when a GET request is made to the homepage
router.get('/2.0/routes', function (req, res) {
  res.set('Content-Type', 'application/json')
  res.json(routesResponse)
})

router.post('/2.0/routes', function (req, res) {
  res.json({data: [{id: 123}]})
})

router.get('/2.0/routes/:id/manifest', function (req, res) {
  res.json(manifestResponse)
})

router.patch('/2.0/routes/:id', function (req, res) {
  setTimeout(() => {
    if (Math.random() > 0.5) {
      res.json({data: {id: Number(req.params.id)}})
    } else {
      res.status(403).json({data: {id: Number(req.params.id)}})
    }
  }, 1000)
})

router.get('/2.0/waypoints', function (req, res) {
  res.json(waypointsResponse)
})

module.exports = router
