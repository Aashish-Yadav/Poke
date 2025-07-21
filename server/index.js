const express = require('express');
const dotenv = require('dotenv');
const mongoose =  require('mongoose');
const AuthRoutes = require('./Routes/AuthRoutes');
dotenv.config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI,)
.then(()=>{
    console.log("database connection establish")
})
.catch(()=>{
    console.log("error in database connection")
})

app.use('/',AuthRoutes)


app.listen(process.env.PORT, ()=>{
    console.log(`app is listening at port ${process.env.PORT}`)
})