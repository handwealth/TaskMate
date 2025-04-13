// src/components/TaskItem.jsx
import React from "react";

const TaskItem = ({ task, onEdit, onDelete, onToggleComplete }) => {
  const {
    title,
    description,
    dueDate,
    category,
    completed,
    _id,
  } = task;

  return (
    <div className="bg-white shadow-md p-4 rounded-lg mb-4 flex flex-col gap-2 border-l-4 border-blue-500">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
        <h3 className={`text-lg font-semibold ${completed ? "line-through text-gray-500" : ""}`}>
          {title}
        </h3>
        <span
          className={`text-sm px-2 py-1 rounded self-start sm:self-auto ${
            completed ? "bg-green-200 text-green-800" : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {completed ? "Completed" : "Pending"}
        </span>
      </div>
      
      <p className="text-sm text-gray-600">{description}</p>
      
      <div className="text-sm text-gray-500 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
        <p>Due: {new Date(dueDate).toLocaleDateString()}</p>
        <p className="font-medium text-blue-600">{category}</p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-2 mt-2">
        <button
          onClick={() => onToggleComplete(_id)}
          className="text-xs px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600 w-full sm:w-auto"
        >
          {completed ? "Mark Incomplete" : "Mark Complete"}
        </button>
        <button
          onClick={() => onEdit(task)}
          className="text-xs px-3 py-2 bg-yellow-400 text-white rounded hover:bg-yellow-500 w-full sm:w-auto"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(_id)}
          className="text-xs px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 w-full sm:w-auto"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
