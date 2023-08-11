import { supabase } from '../supabaseClient'
import React from 'react'
import { useDispatch } from 'react-redux';
import { removeTodo } from '../store/Slices/TodoSlice';
import { BsFillTrashFill } from 'react-icons/bs'


function Todo({todo}) {
  const dispatch = useDispatch()  
    const handleDelete = async (id) => {
      const { error } = await supabase.from("TodoItem").delete().eq("id", id);
  
      dispatch(removeTodo(id))
  
      
    };
  return (
    <div className=" flex flex-row gap-5 justify-between items-center w-full max-w-[500px] rounded-lg p-4 border-t-4 border-blue-200 shadow-md shadow-slate-300" key={todo.id}>
            
            
            <div className='flex flex-row gap-5 items-center'>
            <input type="checkbox" className='w-6 h-6 accent-blue-300 rounded-full' />
            <div className="text-lg text-blue-300 font-extralight">{todo.Title}</div>
            </div>
            <button className="bg-red-300 uppercase text-white p-2 rounded-full hover:bg-red-400" onClick={() => handleDelete(todo.id)}><BsFillTrashFill/></button>
            
    </div>
  )
}

export default Todo