const express = require('express')
const { createUser, loginUser ,loginRedirectUser,userExists,renderUser, logoutUser, deleteUser,deleteRedirectUser} = require('./main')
const route = express.Router()


route.post('/register',userExists, createUser)
route.get('/',renderUser)
route.get('/login',loginRedirectUser)
route.post('/login',loginUser)
route.get('/logout',logoutUser)
route.get('/delete-user',deleteRedirectUser)
route.post('/delete-user',deleteUser)

module.exports = route