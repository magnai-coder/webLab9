const express = require('express');
const app = express();
const router = require('./routes');

app.use('/routes', router);

const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017",(err) =>{
    if(!err) console.log('Mongo амжилттай холбогдлоо');
    else console.log('Mongo холбогдоход алдаа гарлаа.')
})



app.listen(3001, ()=>{console.log('3001 port ажиллаж байна')})
