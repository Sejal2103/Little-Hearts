const express = require('express');
const app=express();
const port = 5000;
const mongoDB = require('./db');

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
})
mongoDB();


app.use(express.json());
app.use('/api', require('./routes/createUser'));
app.use('/api', require('./routes/loginUser'));
app.use('/api', require('./routes/displayData'));
app.use('/api/order', require('./routes/OrderData'));

app.listen(port, ()=>{
    console.log("running on port 5000");
})