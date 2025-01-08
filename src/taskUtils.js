import { notCompleted } from './App';


const createTask = async (newTask) => {
  try {
    let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    if (!tasks) tasks = [];
    if (
      tasks.find(
        (task) =>
          task.title === newTask.title && task.category === newTask.category && task.status === notCompleted
      )
    ) {
      alert("Task already exists!");
      return;
    }
    newTask.originalIndex = tasks.length;
    tasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    return newTask;
  } catch (error) {
    console.error(error);
  }
};

const updateTask = async (updatedTask) => {
    try {
      const tasks = JSON.parse(localStorage.getItem('tasks') || []);
      const taskIndex = tasks.findIndex((task) => (task.id) === (updatedTask.id));
      if (taskIndex !== -1) {
        tasks[taskIndex] = updatedTask;
        if (updateTask) {
          localStorage.setItem('tasks', JSON.stringify(tasks));
        } else {
          console.error('error');
        }
        return updatedTask;
      } else {
        console.log("Task not found");
      }
    } catch (error) {
      console.error(error);
    }
};
  
const getTasks = async () => {
  try {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
  } catch (error) {
    console.error(error);
    return [];
  }
}; 
  
export { createTask, getTasks, updateTask };