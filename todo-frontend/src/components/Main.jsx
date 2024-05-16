import React from "react";
import { useState, useEffect } from "react";

export default function Main() {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState([]);

  useEffect(() => {
    const fetch_data = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/todo_list/");
        if (!response.ok) {
          throw new Error(response.error);
        }
        const data = await response.json();
        setTodos(data);
      } catch (error) {
        setError(error);
      }
    };
    fetch_data();
  }, []);
  return (
    <main>
      <ul className="w-[50%] mx-auto flex flex-col gap-3 my-4">
        {todos.map((item) => {
          const date = new Date(item.created_at);
          const formattedDate = date.toLocaleString();
          return (
            <li key={item.id} className="bg-slate-200 rounded-2xl p-3">
              <h1 className="text-3xl">{item.title}</h1>
              <h3>{item.description}</h3>
              {item.is_completed ? (
                <li className="bg-green-500 p-3 text-white w-[20%] text-center rounded-2xl">
                  Completed
                </li>
              ) : (
                <li className="bg-red-500 p-3 text-white w-[20%] text-center rounded-2xl">
                  Not Completed
                </li>
              )}
              <h3>{formattedDate}</h3>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
