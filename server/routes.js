const express = require('express');
const routers = express.Router();
const cors = require('cors');
const Class = require('./task');
const fs = require('fs').promises; 
routers.use(cors());
routers.use(express.json());


routers.get('/task', async (req, res) => {
    try {
        const classAll = await  Class.find();
        res.json(classAll);
    } catch (error) {
        console.error("Error fetching tasks:", error);  
        res.status(500).json({ message: "Internal Server Error" });
    }
});

routers.delete('/task', async (req,res) => {
    try{
        const searching = await Class.findOne(req.body);
        if(!searching){
             res.status(404).json({message: 'haigaad oldsongui'})
        }
        await searching.deleteOne();
        res.json({message: 'Amjilttai ustgagdlaa'})
    }catch(err){
        res.status(500).json({message: err.message})
    }
}
)

routers.post('/task', async (req, res) => {
    try {
        const classInstance = await Class.create(req.body);
        res.json(classInstance);
    } catch (error) {
        console.error("Error creating class:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})
routers.put('/task', checkClass, async (req,res)=>{
    if(req.body.day == null || req.body.time == null || req.body.classType==null || req.body.className==null || req.body.roomNumber==null ){
        return res.status(400).json({message: 'Invalid request body'})
    }else{

    const { day, time, classType, className, roomNumber } = req.body;
    
   
    res.classFind.day = day;
    res.classFind.time = time;
    res.classFind.classType = classType;
    res.classFind.className = className;
    res.classFind.roomNumber = roomNumber;

    try{
        console.log(res.classFind);
        const updatedClass = await res.classFind.save();
        res.json(updatedClass);
    }catch(err){
        res.status(400).json({message:err.message})
    }
}
})
async function checkClass(req,res,next){
    try {
        const { day, time } = req.body;
        const classFind = await Class.find({ day, time });
        
        if (classFind.length === 0) {
            return res.status(404).json({ message: 'No class found for the given day and time.' });
        }
        
        res.classFind = classFind[0];
        next();
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}
module.exports = routers;