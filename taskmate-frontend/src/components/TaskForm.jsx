import React, { useState, useEffect } from "react";
import axios from "axios";

const TaskForm = ({ fetchTasks, editTask, clearEdit }) => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    category: "",
  });

  useEffect(() => {
    if (editTask) {
      setTask({
        ...editTask,
        dueDate: editTask.dueDate
          ? new Date(editTask.dueDate).toISOString().split("T")[0]
          : "",
      });
    }
  }, [editTask]);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editTask) {
        await axios.put(`http://localhost:5000/api/tasks/${editTask._id}`, task);
        clearEdit();
      } else {
        await axios.post("http://localhost:5000/api/tasks", task);
      }
      fetchTasks();
      setTask({ title: "", description: "", dueDate: "", category: "" });
    } catch (err) {
      console.error("Error submitting task:", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 sm:p-6 rounded-xl shadow-md flex flex-col gap-3"
    >
      <h2 className="text-xl font-bold">{editTask ? "Edit Task" : "Add New Task"}</h2>
      <input
        type="text"
        name="title"
        value={task.title}
        onChange={handleChange}
        placeholder="Title"
        required
        className="border p-2 rounded"
      />
      <textarea
        name="description"
        value={task.description}
        onChange={handleChange}
        placeholder="Description"
        required
        className="border p-2 rounded"
      />
      <input
        type="date"
        name="dueDate"
        value={task.dueDate}
        onChange={handleChange}
        required
        className="border p-2 rounded"
      />
      <input
        type="text"
        name="category"
        value={task.category}
        onChange={handleChange}
        placeholder="Category"
        required
        className="border p-2 rounded"
      />
      <div className="flex flex-col sm:flex-row gap-2">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full sm:w-auto"
        >
          {editTask ? "Update" : "Add Task"}
        </button>
        {editTask && (
          <button
            type="button"
            onClick={clearEdit}
            className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded w-full sm:w-auto"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default TaskForm;
