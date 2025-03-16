import React, { useState, useEffect, useMemo } from "react";
import { FaPlus, FaTrash, FaCheckCircle } from "react-icons/fa";
import "../styles/Todo.css";

const Todo = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  // ✅ Get logged-in user
  const currentUser = JSON.parse(localStorage.getItem("loggedInUser"));

  // ✅ Generate a fixed key for storing tasks for each user
  const storageKey = useMemo(() => {
    return currentUser ? `tasks_${currentUser.email}` : "tasks_guest";
  }, [currentUser]);

  // ✅ Load tasks immediately when the component mounts
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem(storageKey)) || [];
    setTasks(storedTasks);
  }, [storageKey]); // ✅ Now correctly tracks user changes

  // ✅ Save tasks when they change
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem(storageKey, JSON.stringify(tasks));
    }
  }, [tasks, storageKey]);

  const addTask = () => {
    if (newTask.trim()) {
      const newTaskItem = { id: Date.now(), text: newTask, completed: false };
      setTasks([...tasks, newTaskItem]);
      setNewTask("");
    }
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    localStorage.setItem(storageKey, JSON.stringify(updatedTasks));
  };

  const toggleComplete = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem(storageKey, JSON.stringify(updatedTasks));
  };

  return (
    <div className="todo">
      <h2>📌 Todo List</h2>
      <p className="user-info">
        Logged in as: <strong>{currentUser ? currentUser.email : "Guest"}</strong>
      </p>

      {/* Input Field & Add Button */}
      <div className="input-container">
        <input
          type="text"
          placeholder="Add a new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
        />
        <button onClick={addTask}>
          Add
        </button>
      </div>

      {/* Task List */}
      <ul>
        {tasks.length === 0 ? (
          <p className="no-tasks">No tasks added yet! 🎯</p>
        ) : (
          tasks.map((task) => (
            <li key={task.id} className={task.completed ? "completed" : ""}>
              <span onClick={() => toggleComplete(task.id)}>
                <FaCheckCircle className={`task-icon ${task.completed ? "checked" : ""}`} />
                {task.text}
              </span>
              <button className="delete-btn" onClick={() => deleteTask(task.id)}>
                <FaTrash />
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Todo;
