
import { useState, useEffect } from "react";
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom'
import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import About from "./components/About";

function App() {
  const api = "http://localhost:5000/tasks"
  const [showAddTask,setShowAddTask]=useState(false)
  const [tasks, setTasks] = useState([])
  
  useEffect(() => {
    const getTask = async () => {
      const taskFromServer = await fetchTasks();
      setTasks(taskFromServer)
    }
        getTask()
  },[])
  
  //fetch tasks
  const fetchTasks = async () => {
    // console.log(process.env.PORT)
    // const devEnv = process.env.NODE_ENV !== "production"
    const res= await fetch(`${api}`);
    const data = await res.json()
    return data;
  }

  //fetch task
  const fetchTask = async (id) => {
    // const devEnv = process.env.NODE_ENV !== "production"
    // const { REACT_APP_DEV_URL, REACT_APP_PROD_URL } = process.env;
    const res= await fetch(`${api}/${id}`);
    const data = await res.json()
    return data;
  }

  //Add Task
  const addTask = async (task) => {
    // const devEnv = process.env.NODE_ENV !== "production"
    // const { REACT_APP_DEV_URL, REACT_APP_PROD_URL } = process.env;
    const res = await fetch(`${api}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body:JSON.stringify(task)
    })

    const data = await res.json()
    setTasks([...tasks,data])
    // const id = Math.floor(Math.random() * 1000) + 1;
    // const newTask = { id, ...task }
    // setTasks([...tasks,newTask])
    
  }

  //delete Task
  const deleteTask = async (id) => {
    // const devEnv = process.env.NODE_ENV !== "production"
    // const { REACT_APP_DEV_URL, REACT_APP_PROD_URL } = process.env;
    await fetch(`${api}/${id}`
      , {
        method: 'DELETE'
    });
   setTasks(tasks.filter(task=> task.id !== id))
  }
  
  //Toggle Remainder
  const toggleRemainder = async (id) => {
    // const devEnv = process.env.NODE_ENV !== "production"
    // const { REACT_APP_DEV_URL, REACT_APP_PROD_URL } = process.env;
    const taskToToggle = await fetchTask(id);
    const updtask = { ...taskToToggle, reminder: !taskToToggle.reminder }
    const res = await fetch(`${api}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': "application/json"
      },
      body:JSON.stringify(updtask)
    })

    const data = await res.json()

    setTasks(tasks.map(task => task.id === id ? {...task,reminder:!data.reminder}:task
    ))
  }

  return (
    <Router>
      <div className="container">
        <Header onShow={()=>setShowAddTask(!showAddTask)} showAdd={showAddTask}  />
        
        <Routes>
          <Route path='/' exact element={<>
            {showAddTask && <AddTask onAdd={addTask}/>}
            {(tasks.length > 0) ? (
              <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleRemainder}/>
              ) : (
              "No task to Show"
            )
          }
          </>} />
          <Route path='/about' element={<About/>} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
