// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);

  // Fetch tasks from backend
  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/tasks");
      setTasks(response.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Delete a task
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  // Toggle task completion
  const handleToggleComplete = async (id) => {
    try {
      const taskToUpdate = tasks.find((task) => task._id === id);
      const updatedTask = { ...taskToUpdate, completed: !taskToUpdate.completed };
      await axios.put(`http://localhost:5000/api/tasks/${id}`, updatedTask);
      fetchTasks();
    } catch (err) {
      console.error("Error toggling task status:", err);
    }
  };

  // Set task to be edited
  const handleEdit = (task) => {
    setEditTask(task);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Clear edit state after update or cancel
  const clearEdit = () => {
    setEditTask(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600 px-4 sm:px-0 py-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center mb-6 text-white">Task Mate</h1>

        {/* Task Form for Add/Edit */}
        <div className="bg-white shadow-lg rounded-xl p-6 mb-6 border-2 border-indigo-300">
          <TaskForm
            fetchTasks={fetchTasks}
            editTask={editTask}
            clearEdit={clearEdit}
          />
        </div>

        {/* Task List with Search and Filter */}
        <div className="bg-white shadow-lg rounded-xl p-6 border-2 border-purple-300">
          <TaskList
            tasks={tasks}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onToggleComplete={handleToggleComplete}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
