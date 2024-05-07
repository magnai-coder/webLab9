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
        console.log(searching)
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


routers.post('/register',(req, res) =>{
     ClassIn.EmployeeModel.create(req.body)
    .then(employees => res.json(employees))
    .catch(err => res.json(err))
   
    })

routers.post('/login', async(req, res) =>{
    const {email, password} = req.body;
       const user =  await ClassIn.EmployeeModel.findOne({email});
       if(!user){
        return res.status(404).json({err: 'user not found'});
       }
       res.json(user);
      
})

routers.get('/users', async (req, res) => {
    try {
        const rawData = await fs.readFile('users.json', 'utf8');
        const jsonData = JSON.parse(rawData);
        res.json(jsonData);
    } catch (error) {
        console.error("Error reading users file:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

routers.post('/users', (req,res)=>{
    const rawData = fs.readFile('users.json');
    const jsonData = JSON.parse(rawData);
    const newUserData = req.body;
    const arrayOfUserIds = Object.keys(jsonData).map(userId=>parseInt(userId));
    const nextUserId = Math.max(...arrayOfUserIds)+1;
    updatedUsers = {
            ...jsonData,
            [nextUserId]:newData
    }
    fs.writeFileSync('users.json', JSON.stringify(updatedUsers));
    res.send('New user added successfully');
})

module.exports = routers;