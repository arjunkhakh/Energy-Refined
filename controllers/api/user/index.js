const router = require('express').Router()

const createUser =  require('./creat')



router.use('/create', createUser)

module.exports = router