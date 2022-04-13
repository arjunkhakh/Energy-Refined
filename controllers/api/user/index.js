const router = require('express').Router()

const createUser =  require('./create')
const deleteUser = require('./delete')
const editUser = require('./edit')

router.use('/userpage', createUser)
router.use('/userpage', deleteUser)
router.use('/userpage', editUser)

module.exports = router