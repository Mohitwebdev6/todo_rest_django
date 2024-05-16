import React, { useEffect } from "react";
import { useState } from "react";

export default function Main({ item, formattedDate }) {
  
  const [disable, setDisable] = useState(true)
  const [data, setData] = useState({ "title": item.title, "description": item.description, "is_completed": item.is_completed })

  const toggleComplete = () => {
    setData(prev => ({ ...prev, "is_completed": !prev.is_completed }))
  }

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/v1/todo/${item.id}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).catch(err => {
      console.log(err)
    })
  }, [data])

  const toggleEdit = (e) => {
    setDisable((val) => !val)
    if (!disable) {
      e.target.innerText = "edit"
    }
    else {
      e.target.innerText = "update"
    }
  }

  return (
    <li key={item.id} className="bg-slate-200 rounded-2xl p-3 list-none">
      <input type="text" name="title" value={data.title} onChange={(e)=>{setData(prev=>({...prev,"title":e.target.value}))}} disabled={disable} /><br />
      <textarea name="description" value={data.description} onChange={(e) => { setData((prev) => ({ ...prev, "description": e.target.value })) }} disabled={disable} ></textarea><br />
      {data.is_completed ? (
        <button className="bg-green-500 p-3 text-white w-[20%] text-center rounded-2xl" onClick={toggleComplete} >
          Completed
        </button>
      ) : (
        <button className="bg-red-500 p-3 text-white w-[20%] text-center rounded-2xl" onClick={toggleComplete} >
          Not Completed
        </button>
      )}
      <h3>{formattedDate}</h3>

      <button className=" rounded-lg p-2 bg-blue-400 px-5 text-white" onClick={(e) => { toggleEdit(e) }}>Edit</button>
    </li>
  );
}
