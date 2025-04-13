// src/components/TaskList.jsx
import React, { useState } from "react";
import TaskItem from "./TaskItem";

const TaskList = ({ tasks, onEdit, onDelete, onToggleComplete }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      filterCategory === "" || task.category === filterCategory;

    return matchesSearch && matchesCategory;
  });

  // Get unique categories from tasks
  const categories = [...new Set(tasks.map((task) => task.category).filter(Boolean))];


  return (
    <div className="mt-4 sm:mt-6">
      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
        <input
          type="text"
          placeholder="Search by title or description..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 border rounded-md w-full sm:w-1/2 shadow"
        />

        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-4 py-2 border rounded-md w-full sm:w-1/3 shadow"
        >
          <option value="">All Categories</option>
          {categories.map((cat, idx) => (
            <option key={idx} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Task Items */}
      {filteredTasks.length > 0 ? (
        filteredTasks.map((task) => (
          <TaskItem
            key={task._id}
            task={task}
            onEdit={onEdit}
            onDelete={onDelete}
            onToggleComplete={onToggleComplete}
          />
        ))
      ) : (
        <p className="text-center text-gray-500 mt-6">No tasks found.</p>
      )}
    </div>
  );
};

export default TaskList;
