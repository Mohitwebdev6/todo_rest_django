import React, { useState } from "react";

export default function Navbar({setDeleted}) {
  const [todo,setTodo]=useState("")

  async function submitData() {
    console.log(todo)
    try {
      let response = await fetch(`http://127.0.0.1:8000/api/v1/todo/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: todo }),
      });
      if(!response.ok){
        throw new Error("Data not saved due to some error")
      }
      setDeleted((prev)=>!prev)
      setTodo("")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <nav className=" bg-slate-300 flex justify-between p-5 ">
      <ul className=" flex gap-3">
        <li>
          <a href="#">Home</a>
        </li>
        <li>
          <a href="#">About</a>
        </li>
      </ul>
      <div className=" flex items-center w-3/6 justify-center">
        <input
          value={todo}
          onChange={(e) => {
            setTodo(e.target.value);
          }}
          className=" outline-none rounded-l-xl w-3/6 px-2 py-1"
          type="text"
          name="todo"
          id="todo"
        />
        <button
          onClick={submitData}
          className=" bg-blue-400 px-3 py-1 rounded-r-xl"
        >
          Add Todo
        </button>
      </div>
      <div>
        <button>Log-Out</button>
      </div>
    </nav>
  );
}
