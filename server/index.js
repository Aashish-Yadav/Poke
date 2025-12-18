const express = require('express');
const dotenv = require('dotenv');
const mongoose =  require('mongoose');
const AuthRoutes = require('./Routes/AuthRoutes');
const cors = require('cors');
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
    origin: '*',
    credentials: true,  
}))

mongoose.connect(process.env.MONGO_URI,)
.then(()=>{
    console.log("database connection establish")
})
.catch(()=>{
    console.log("error in database connection")
})

app.use('/user',AuthRoutes)


app.listen(process.env.PORT, ()=>{
    console.log(`app is listening at port ${process.env.PORT}`)
})