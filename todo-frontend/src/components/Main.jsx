import React from 'react'
import { useState,useEffect } from 'react'



export default function Main() {
    const [todos,setTodos]=useState([])
    const [error,setError]=useState([])
    useEffect(()=>{
        const fetch_data=async ()=>{
            try{
                const response=await fetch("http://127.0.0.1:8000/api/todo_list/")
                if (!response.ok){
                    throw new Error(response.error)
                }
                const data= await response.json()
                setTodos(data)
            }
            catch (error){
                setError(error)
            }
        }
        fetch_data()
    },[])
    return (
        <main>
            <h1>{todos}</h1>
        </main>
    )
}
