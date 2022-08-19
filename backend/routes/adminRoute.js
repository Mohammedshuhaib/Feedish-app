const express = require('express')

const router = express.Router()
const adminController = require('../controller/admin/Authentication')

router.post('/login', adminController.adminLogin)

module.exports = router
