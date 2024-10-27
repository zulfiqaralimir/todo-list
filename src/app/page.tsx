"use client";

import { useState } from 'react';

type Task = {
  id: number;
  text: string;
  completed: boolean;
  dateAdded: string;
};

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>("");

  const addTask = () => {
    if (newTask.trim()) {
      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleString();

      setTasks([
        ...tasks,
        { id: Date.now(), text: newTask, completed: false, dateAdded: formattedDate }
      ]);
      setNewTask("");
    }
  };

  const deleteTask = (taskId: number) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const toggleComplete = (taskId: number) => {
    setTasks(
      tasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px", textAlign: "center" }}>
      <h1>To-Do List</h1>
      <input
        type="text"
        placeholder="Add a new task"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        style={{ padding: "8px", width: "70%", marginRight: "8px", borderRadius: "4px" }}
      />
      <button onClick={addTask} style={{ padding: "8px 12px", borderRadius: "4px", cursor: "pointer" }}>
        Add
      </button>
      <ul style={{ listStyleType: "none", padding: "0", marginTop: "20px" }}>
        {tasks.map((task) => (
          <li
            key={task.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px",
              marginBottom: "10px",
              backgroundColor: "#f9f9f9",
              borderRadius: "4px",
              border: "1px solid #eee",
              textDecoration: task.completed ? "line-through" : "none"
            }}
          >
            <div>
              <span>{task.text}</span>
              <small style={{ display: "block", fontSize: "0.8em", color: "#777" }}>{task.dateAdded}</small>
            </div>
            <div>
              <button
                onClick={() => toggleComplete(task.id)}
                style={{ marginRight: "8px", cursor: "pointer", borderRadius: "4px" }}
              >
                {task.completed ? "Undo" : "Complete"}
              </button>
              <button
                onClick={() => deleteTask(task.id)}
                style={{ backgroundColor: "#e63946", color: "#fff", borderRadius: "4px", cursor: "pointer" }}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
