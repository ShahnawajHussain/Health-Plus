const express = require('express');
const colors = require('colors');
const moragan = require('morgan');
const path = require('path');
const dotenv = require('dotenv');
const connectDB=require("./config/db")
dotenv.config({path: path.resolve(__dirname, 'routes/.env')});

connectDB();

const app = express();

app.use(express.json());
app.use(moragan("dev"));

//routes
app.use('/api/v1/user',require("./routes/userRoutes"))
app.use('/api/v1/admin',require("./routes/adminRoutes"))
app.use('/api/v1/doctor',require("./routes/doctorRoutes"))

//listen port
const PORT= process.env.PORT || 8080
app.listen(PORT,()=>{
    console.log(`server running in ${process.env.NODE_MODE} mode on port ${process.env.PORT}`
    );
});