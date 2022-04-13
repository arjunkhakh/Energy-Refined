const router = require('express').Router()

const review =  require('./review')

router.use('/userpage', review)

module.exports = router