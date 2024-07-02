const express = require('express')
const { createUser, loginUser ,loginRedirectUser,userExists,renderUser, logoutUser} = require('./main')
const route = express.Router()


route.post('/register',userExists, createUser)
route.get('/',renderUser)
route.get('/login',loginRedirectUser)
route.post('/login',loginUser)
route.get('/logout',logoutUser)

module.exports = route