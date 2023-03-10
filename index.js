const express = require('express')
const app = express();
require('./models/config')
const dotenv = require ('dotenv')
dotenv.config()
const bodyparser = require('body-parser')
const router = require('./router/mainRouter')

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", router)

const server = app.listen(process.env.PORT,function(req,res){
    console.log(`Server is running on port no:${process.env.port}`);
})

module.exports = server