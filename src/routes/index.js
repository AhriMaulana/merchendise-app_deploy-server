const express = require('express')
const router = express.Router()
const { uploadFile } = require('../middlewares/upload')
const { auth } = require('../middlewares/auth')

const { addItem, deleteItem, editItem, getItems, getItem } = require('../controller/item')
const { register, login, checkAuth } = require('../controller/user')

router.post('/item',auth, uploadFile('image'), addItem)
router.get('/getItems', getItems)
router.get('/getItem/:id', getItem)
router.patch('/updateItem/:id',auth, uploadFile('image'), editItem)
router.delete('/item/:id',auth, deleteItem)
router.post('/register', register)
router.post('/login', login)
router.get('/checkAuth', auth, checkAuth)

module.exports = router