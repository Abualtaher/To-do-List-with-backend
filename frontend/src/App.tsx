import React, { useEffect, useState } from "react";
import axios from "axios";

interface Todo {
  id: number;
  task: string;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [task, setTask] = useState("");

  const fetchTodos = async () => {
    const res = await axios.get<Todo[]>("http://localhost:3001/api/todos");
    setTodos(res.data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async () => {
    if (!task.trim()) return;
    await axios.post("http://localhost:3001/api/todos", { task });
    setTask("");
    fetchTodos();
  };

  const deleteTodo = async (id: number) => {
    await axios.delete(`http://localhost:3001/api/todos/${id}`);
    fetchTodos();
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>📝 To-Do List</h1>
      <input
        placeholder="New Task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button onClick={addTodo}>Add</button>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.task}
            <button
              onClick={() => deleteTodo(todo.id)}
              style={{ marginLeft: 10 }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
