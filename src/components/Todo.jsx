import { supabase } from '../supabaseClient'
import React from 'react'
import { useDispatch } from 'react-redux';
import { removeTodo } from '../store/Slices/TodoSlice';



function Todo({todo}) {
  const dispatch = useDispatch()  
    const handleDelete = async (id) => {
      const { error } = await supabase.from("TodoItem").delete().eq("id", id);
  
      dispatch(removeTodo(id))
  
      
    };
  return (
    <div className=" flex flex-row gap-5 justify-between items-center w-full max-w-[500px] rounded-lg p-2 shadow-md shadow-slate-300" key={todo.id}>
            
            <div className="text-xl text-blue-300 font-bold">{todo.Title}</div>
            <div className='flex flex-row gap-12 items-center'>
            <input type="checkbox" className='w-6 h-6 accent-blue-300 text-blue-200 bg-gray-100 border-gray-300 rounded-full' />
            <button className="bg-red-300 uppercase text-white p-2 rounded-xl hover:bg-red-400" onClick={() => handleDelete(todo.id)}>delete</button>
            </div>
            
    </div>
  )
}

export default Todo