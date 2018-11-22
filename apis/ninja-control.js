const { Router } = require('express')
const jobinfo = require('../jsons/job')
const router = Router()

// ninja-control

router.get('/job-info', function (req, res) {
  res.json(jobinfo)
})

module.exports = router


