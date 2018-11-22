const { Router } = require('express')
const pop = require('../jsons/pop')
const pod = require('../jsons/pod')
const router = Router()

// orders

router.get('/jobs/:type/:id/proofs', function (req, res) {
  if (req.params.type === 'DELIVERY') {
    res.json(pod)
  } else {
    res.json(pop)
  }
})

module.exports = router

