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
    <div className="flex flex-col gap-4 p-4 items-center w-full">
        {loading ?  <p>Loading</p> : <>
        {Todos.map((todo) => (
          <Todo key = {todo.id} todo = {todo} />
          
        ))} </>}
        
      </div>
  )
}

export default TodoList