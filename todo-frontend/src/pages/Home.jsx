import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Main from '../components/Main'
import { useState,useEffect } from 'react'

export default function Home() {
    const [todos, setTodos] = useState([]);
    const [error, setError] = useState(null);
    const [deleted,setDeleted]=useState(true);



    useEffect(() => {
       fetch("http://127.0.0.1:8000/api/v1/todo/")
       .then((res)=>{
        return res.json()
       })
       .then((res)=>{
        setTodos(res)
       })
       .catch(err=>{
        setError(err.message)
        
       })
    }, [deleted]);
    return (
        <div>
            <Navbar setDeleted={setDeleted}></Navbar>
            <ul className="w-[50%] mx-auto flex flex-col gap-3 my-4 list-none min-h-lvh justify-center">
                {error?<div className=' bg-red-300 text-center p-4 rounded-lg'>{error}</div>:(todos.map((item) => {
                    const date = new Date(item.created_at);
                    const formattedDate = date.toLocaleString();
                    return (<Main setDeleted={setDeleted} formattedDate={formattedDate} key={item.id} item={item}></Main>)
                }))}
                
            </ul>
            <Footer></Footer>
        </div>
    )
}
