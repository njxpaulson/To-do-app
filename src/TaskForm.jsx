import React, { useState, useEffect } from 'react';
import { createTask, updateTask } from './taskUtils';

function TaskForm( {isFormOpen, setIsFormOpen, onTaskAdded, editingTask, onUpdateTask} ) {
    const formClass = isFormOpen ? "addTaskForm" : "hidden";
    const maskClass = isFormOpen ? "mask" : "notVisible";
    const [taskTitle, setTaskTitle] = useState('');
    const [taskCategory, setTaskCategory] = useState('');

    useEffect(() => {
      if (editingTask) {
        setTaskTitle(editingTask.title);
        setTaskCategory(editingTask.category);
      } else {
        setTaskTitle('');
        setTaskCategory("");
      }
    }, [editingTask]);    

    const handleCreateTask = async (event) => {
      event.preventDefault();
      const newTask = { id: editingTask ? (editingTask.id) : Date.now(), title: taskTitle, category: taskCategory, status: "Complete" };
      if (!newTask.title || !newTask.category) {
        alert("Please enter a title and category.");
        return;
      }
      if (editingTask) {
        try {
          const updatedTask = { ...editingTask, title: newTask.title, category: newTask.category };
          await updateTask(updatedTask);
          onUpdateTask(updatedTask);
        } catch (error) {
          console.error(error);
          alert("Error updating task: " + error.message);
        }
      } else {
        try {
          const response = await createTask(newTask);
          onTaskAdded();
        } catch (error) {
          console.error(error);
          alert("Error creating task: " + error.message);
        }
      }
      setTaskTitle('');
      setTaskCategory('');
      setIsFormOpen(false);
    }; 

    const taskTitleChange = (event) => {
      setTaskTitle(event.target.value);
    };

    const taskCategoryChange = (event) => {
      setTaskCategory(event.target.value);
    };
    
    return (
      <>
        <div className={maskClass}></div>
        <form className={formClass} onSubmit={handleCreateTask}>
          <input
            type="text"
            placeholder="Add a to-do item"
            value={taskTitle}
            onChange={taskTitleChange}
          />
          <input
            type="text"
            placeholder="Add a category"
            value={taskCategory}
            onChange={taskCategoryChange}
          />
          <button type="submit" className="add">
            {editingTask ? "Update" : "Save"}
          </button>
        </form>
      </>
    );
}

export default TaskForm