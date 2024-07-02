const express =require("express")
const session = require("express-session")
const route = require("./route")
const index = express()
const port = 3000
const path = require('path')

index.use(session({
    secret:'keyboard cat',
    cookie: {}
}));

index.set('view engine', 'ejs')
index.set('views', path.join(__dirname, 'views'));
index.use(express.json());
index.use(express.urlencoded({extended:false}))
index.use(express.static(path.join(__dirname,'public')));
index.use(route)

index.listen(port, ()=>{
    console.log("server is running on port "+port)
})
