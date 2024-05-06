const mongoose = require('mongoose');


const taskSchema = new mongoose.Schema({
    day: String,
    time: Number,
    classType: String,
    className: String,
    roomNumber: Number
});
const newModel2 = new mongoose.model('classSchedule', taskSchema)
const data2 = async()=>{
    const result = await newModel2.insertMany([{day: "Мягмар", time: 1, className: "Програмчлалын хэлний зарчимууд" ,classType: "Лекц", roomNumber: 214},
                                             {day: "Мягмар", time: 2, className: "Програмчлалын хэлний зарчимууд" ,classType: "Лаборатори",roomNumber: 202},
                                             {day: "Лхагва", time: 6, className: "Веб систем ба технологи" ,classType: "Лекц",roomNumber: 229},
                                             {day: "Лхагва", time: 6, className: "Веб систем ба технологи" ,classType: "Лекц",roomNumber: 229},
                                             {day: "Баасан", time: 6, className: "Программ хангамжийн төслийн менежмент" ,classType: "lecture",roomNumber: 229},
                                             {day: "Баасан", time: 7, className: "Программ хангамжийн төслийн менежмент" ,classType: "Лекц",roomNumber: 229},
                                             {day: "Баасан", time: 2, className: "Компьютерийн загварчлал, симуляц" ,classType: "Лекц",roomNumber: 406},
                                             {day: "Дадлага", time: 3, className: "Компьютерийн загварчлал, симуляц" ,classType: "Лекц",roomNumber: 401},
                                             {day: "Лхагва", time: 5, className: "Веб систем ба технологи" ,classType: "Лаборатори",roomNumber: 401},
                                             {day: "Лхагва", time: 1, className: "Бакалаврын дипломын төсөл" ,classType: "Лекц",roomNumber: 121},
    ]);
}
data2();



const Class = mongoose.model('classSchedule', taskSchema);


module.exports = {Class};
