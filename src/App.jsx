import { useState, useEffect } from "react";
import "./App.css";
import Items from "./components/Items.jsx";
import TaskForm from "./components/taskForm.jsx";
import { getTasks, updateTask } from "./taskUtils.js";

const completed = "completed";
const notCompleted = "complete";

function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasksResponse = await getTasks();
        if (tasksResponse) {
          setTasks(tasksResponse);
        } else {
          console.log('no task data available');
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchTasks();
  }, []);
  
  const handleTaskAdded = async () => {
    try {
      const updatedTasks = await getTasks();
      setTasks(updatedTasks);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteTask = (id) => {
    const newTasks = tasks.filter((task) => (task.id) !== id);
    localStorage.setItem('tasks', JSON.stringify(newTasks));
    setTasks(newTasks);
  };

  const handleCompletedTask = (id) => {
    const updatedTasks = tasks
      .map((task) => ((((task.id))) === id ? { ...task, status: task.status === completed ? notCompleted : completed } : task))

      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      setTasks(updatedTasks);
  };

  const handleEditTask = (id) => {
    const taskToEdit = tasks.find((task) => (task.id) === id);
    setEditingTask(taskToEdit);
    setIsFormOpen(true);
  };

  const handleUpdateTask = async (updatedTask) => {
    try {
      await updateTask(updatedTask);
      const updatedTasks = tasks.map((task) => (task.id) === (updatedTask.id) ? updatedTask : task );
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      setTasks(updatedTasks);
      setEditingTask(null);
    } catch (error) {
      console.error(error);
    }
  };

  const sortedTasks = tasks && tasks.length > 0
  ? tasks.sort((a, b) => a.status === completed ? 1 : b.status === completed ? -1 : b.originalIndex - a.originalIndex)
  : tasks;

  const [isFormOpen, setIsFormOpen] = useState(false);
  const toggleFormBtnClass = isFormOpen ? "translate" : "addItem";
  
  const handleToggleForm = () => {
    setIsFormOpen(!isFormOpen);
    setEditingTask(null);
  };

  return (
    <>
      <h1>to-do</h1>
      <main>
        {Array.isArray(sortedTasks) && sortedTasks.length === 0 ? (
          <p className="error">No tasks available</p>
        ) : (
          Array.isArray(sortedTasks) && sortedTasks.map((task) => (
            <Items
              className={task.status === completed ? "animate" : ""}
              key={task.id}
              title={task.title}
              category={task.category}
              status={task.status}
              onComplete={() => handleCompletedTask(task.id)}
              unDoTaskCompletion={() => handleCompletedTask(task.id)}
              editTask={() => handleEditTask(task.id)}
              deleteTask={() => handleDeleteTask(task.id)}
            />
          ))
        )}
      </main>
      <section className="form">
        <TaskForm
          isFormOpen={isFormOpen}
          setIsFormOpen={setIsFormOpen}
          onTaskAdded={handleTaskAdded}
          onUpdateTask={handleUpdateTask}
          editingTask={editingTask}
        />
      </section>
      <button className={toggleFormBtnClass} onClick={handleToggleForm}>
        +
      </button>
    </>
  );
}

export { notCompleted };
export default App;
