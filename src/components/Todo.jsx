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
    <div className=" flex flex-row gap-5 justify-between w-full max-w-[500px]" key={todo.id}>
            <div className="text-xl text-blue-300 font-bold">{todo.Title}</div>
            <button className="bg-red-300 uppercase text-white p-2 rounded-xl hover:bg-red-400" onClick={() => handleDelete(todo.id)}>delete</button>
    </div>
  )
}

export default Todo