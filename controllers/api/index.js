const router = require('express').Router()

const review =  require('./review')
const userRoutes = require('./user')

router.use('/userpage', review)
router.use('/user', userRoutes)

module.exports = router