import { supabase } from '../supabaseClient'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { createTodo } from '../store/Slices/TodoSlice';



  

function InputField() {
    const dispatch = useDispatch()

    const [newTodo, setNewTodo] = useState([]);
   
  const handleAdd = async (newTodo) => {
    const { data, error } = await supabase
      .from("TodoItem")
      .insert([{ Title: newTodo }])
      .select();
      dispatch(createTodo(data[0]))
  };

  return (
    <>

    <div className=" flex justify-center text-blue-400 font-black text-3xl items-center p-2 m-auto uppercase">Todo List</div>
      <div className="flex flex-row gap-2 justify-center items-center p-2" >
        <input className="border-2 border-blue-200 rounded-lg p-2 w-full max-w-[500px] "
          onChange={(event) => setNewTodo(event.target.value)}
          type="text"
        />
        <button className="bg-blue-300 uppercase p-2 rounded-lg text-white hover:bg-blue-400" onClick={() => {handleAdd(newTodo)}}> Add </button>
      </div>


    </>
  )
}

export default InputField