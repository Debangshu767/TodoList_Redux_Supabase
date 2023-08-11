import React, { useEffect, useState } from 'react'
import Todo from './Todo'
import { useDispatch, useSelector } from 'react-redux'
import { supabase } from '../supabaseClient'
import { setTodos } from '../store/Slices/TodoSlice';


function TodoList() {
  const token =  useSelector(state=>state.token.token)
  const dispatch = useDispatch()
  const [loading,setLoading] = useState(true)
  const Todos = useSelector((state) => state.todos.todos )

  useEffect(() => {
    setLoading(true)
    getTodos();
    
  }, []);

  async function getTodos() {
    const { data } = await supabase.from("TodoItem").select().eq('user_id',token.user.id);
    dispatch(setTodos(data))
    setLoading(false)
  }

  return (
    <div className="flex flex-col gap-7 p-7 items-center w-full">
      <div className='  bg-blue-300 px-4 py-2 rounded-lg text-white'> Let's get things DONE ! </div>
        {loading ?  <p>Loading</p> : <>
        {Todos.map((todo) => (
          <Todo key = {todo.id} todo = {todo} />
          
        ))} </>}
        
      </div>
  )
}

export default TodoList