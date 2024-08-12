import React, { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTaskInput, setEditTaskInput] = useState('');

  const handleAddTask = () => {
    if (taskInput.trim()) {
      setTasks([...tasks, { id: Date.now(), text: taskInput }]);
      setTaskInput('');
    }
  };

  const handleEditTask = (id) => {
    setEditTaskId(id);
    const task = tasks.find((task) => task.id === id);
    setEditTaskInput(task.text);
  };

  const handleUpdateTask = () => {
    if (editTaskInput.trim()) {
      setTasks(
        tasks.map((task) =>
          task.id === editTaskId ? { ...task, text: editTaskInput } : task
        )
      );
      setEditTaskId(null);
      setEditTaskInput('');
    }
  };

  const handleRemoveTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="App">
      <h1>To-Do App</h1>
      <div>
        <input
          type="text"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          placeholder="Add new task"
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>

      {editTaskId !== null && (
        <div>
          <input
            type="text"
            value={editTaskInput}
            onChange={(e) => setEditTaskInput(e.target.value)}
            placeholder="Edit task"
          />
          <button onClick={handleUpdateTask}>Update Task</button>
          <button onClick={() => setEditTaskId(null)}>Cancel</button>
        </div>
      )}

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <span>{task.text}</span>
            <button onClick={() => handleEditTask(task.id)}>Edit</button>
            <button onClick={() => handleRemoveTask(task.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
