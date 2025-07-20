const express = require('express');
const dotenv = require('dotenv');
const AuthRoutes = require('./Routes/AuthRoutes')
dotenv.config();



const app = express();
app.use(express.json());
app.use('/signup',AuthRoutes)

app.listen(process.env.PORT, ()=>{
    console.log(`app is listening at port ${process.env.PORT}`)
})