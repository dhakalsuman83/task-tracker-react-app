import { useState } from "react";
import Header from './components/Header';
import Tasks from './components/Tasks';

function App() {
  const [tasks,setTasks]=useState([
  {
    id: 1,
    text: "Doctors Appointment",
    day: "Feb 5th at 2:30PM",
    remainder: true,
  },
  {
    id: 2,
    text: "Meeting at school",
    day: "Feb 6th at 1:30PM",
    remainder: true,
  },
  {
    id: 3,
    text: "Food Shopping",
    day: "Feb 5th at 3:30PM",
    remainder: false,
  },
  ])
  //delete Task
  const deleteTask = (id) => {
   setTasks(tasks.filter(task=> task.id !=id))
  }
  
  //Toggle Remainder
  return (
    <div className="container">
      <Header />
      {(tasks.length > 0) ? (
        <Tasks tasks={tasks} onDelete={deleteTask} />
      ) : (
          "No task to Show"
      )
      }
    </div>
  );
}

export default App;
