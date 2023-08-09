import React, { useEffect } from 'react'
import Todo from './Todo'
import { useDispatch, useSelector } from 'react-redux'
import { supabase } from '../supabaseClient'
import { setTodos } from '../store/Slices/TodoSlice';


function TodoList() {
  const dispatch = useDispatch()
  const loading = useSelector((state) => state.todos.loading)
  const Todos = useSelector((state) => state.todos.todos )

  useEffect(() => {
    getTodos();
  }, []);

  async function getTodos() {
    const { data } = await supabase.from("TodoItem").select();
    dispatch(setTodos(data))
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