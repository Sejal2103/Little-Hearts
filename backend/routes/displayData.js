const express = require('express');
const router = express.Router();

router.post('/foodData',(req,res)=>{
    try{
        res.send([global.Products,global.category]);
    } catch(err){
        console.log(err.message)
        res.send("server error, try again later")
    }
})

module.exports = router;