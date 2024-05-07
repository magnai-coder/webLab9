import './App.css';
import { useState } from 'react';

function App() {
  const [responseData, setResponse] = useState([]);
  const [day, setDay] = useState("");
  const [time, setTime] = useState("");
  const [classType, setType] = useState("");
  const [className, setClassName] = useState("");
  const [roomNumber, setClassNumber] = useState("");

  const handleRefresh = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/routes/task", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error Status: ${response.status}`);
      }

      const data = await response.json();
      setResponse(data);
    } catch (error) {
      console.error("fetch error", error);
    }
  };


  const handleAddClass = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/routes/task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ day, time, classType, className, roomNumber })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error Status: ${response.status}`);
      }
      const data = await response.json();
      setResponse(data);
    } catch (error) {
      console.error("fetch error", error);
    }
    let input = document.getElementById("day");
    let input2 = document.getElementById("time");
    let input3 = document.getElementById("type");
    let input4 = document.getElementById("name");
    let input5 = document.getElementById("number");
    input.value = "";
    input2.value = "";
    input3.value = "";
    input4.value = "";
    input5.value = "";
   
  };
  const handleDeletion = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/routes/task", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ day, time, classType, className, roomNumber })
      });
      if (!response.ok) {
        throw new Error(`HTTP error Status: ${response.status}`);
      }
      const data = await response.json();
      setResponse(data);
    } catch (error) {
      console.error("fetch error", error);
    }
    let input = document.getElementById("day");
    let input2 = document.getElementById("time");
    let input3 = document.getElementById("type");
    let input4 = document.getElementById("name");
    let input5 = document.getElementById("number");
    input.value = "";
    input2.value = "";
    input3.value = "";
    input4.value = "";
    input5.value = "";
   
  };


  return (
    <div className="App">
      <div className="App-header">
        <table>
          <thead>
            <tr>
              <th>Day</th>
              <th>Time</th>
              <th>Class Type</th>
              <th>Class Name</th>
              <th>Room Number</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(responseData) ? (
              responseData.map((val, key) => (
                  <tr key={key}>
                    <td>{val.day}</td>
                    <td>{val.time}</td>
                    <td>{val.classType}</td>
                    <td>{val.className}</td>
                    <td>{val.roomNumber}</td>
                  </tr>
                ))
            ) : (
              <tr>
                <td colSpan="5">No data available</td>
              </tr>
          )}
          </tbody>
        </table>
        <button onClick={handleRefresh}>Шинэчлэх</button>
        <form id="allInput">
          <label for="day">Өдөр</label>
          <input type="text" name='day' id="day" onChange={(e) => setDay(e.target.value)}></input>
          <br></br>
          <label for="time">Цаг</label>
          <input type="text" name='time' id="time" onChange={(e) => setTime(e.target.value)}></input>
          <br></br>
          <label for="type">Хичээлийн төрөл</label>
          <input type="text" name='type' id="type" onChange={(e) => setType(e.target.value)}></input>
          <br></br>
          <label for="name">Хичээлийн нэр</label>
          <input type="text" name='name' id="name" onChange={(e) => setClassName(e.target.value)}></input>
          <br></br>
          <label for="number">Анги дугаар</label>
          <input type="text" name='number' id="number" onChange={(e) => setClassNumber(e.target.value)}></input>
          <br></br>
          <button type='submit' onClick={handleAddClass}>Нэмэх</button>
          <button type='submit' onClick={handleDeletion}>Хасах</button>
          <button type='submit' name="submitAddItem">Засах</button>
        </form>
      </div>
    </div>
  );
}

export default App;