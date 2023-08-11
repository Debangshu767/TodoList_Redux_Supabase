import { supabase } from '../supabaseClient'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createTodo } from '../store/Slices/TodoSlice';
import { useNavigate } from 'react-router-dom';
import { IoLogOut } from 'react-icons/io5';


  

function InputField() {
  const navigate = useNavigate()
  const token =  useSelector(state=>state.token.token)
    const dispatch = useDispatch()

    const [newTodo, setNewTodo] = useState([]);
   
  const handleAdd = async (newTodo) => {
    const { data, error } = await supabase
      .from("TodoItem")
      .insert([{ Title: newTodo , user_id: token.user.id }])
      .select();
      dispatch(createTodo(data[0]))
      
  };

  const handleLogout = () => {
    sessionStorage.removeItem('token')
    navigate('/')

  }

  return (
    <>
    <div className='flex flex-row items-center rounded-b-lg justify-between m-auto max-w-[800px] bg-blue-400 p-4'>
    <div className=" text-white font-black text-3xl p-2uppercase">TaskIte</div>
    <div className=' flex flex-row gap-6 items-center'>
      <div className=' font-bold text-xl text-white capitalize'>{token.user.user_metadata.user_name}</div>
      <button onClick={handleLogout} className="text-xl   uppercase p-2 rounded-full text-white hover:bg-red-400"><IoLogOut/></button>
    </div>
    </div>
    
      <div className="flex flex-row gap-2 justify-center items-center mt-5 p-2" >
        <input className="border-2 border-blue-200 rounded-lg p-2 w-full max-w-[500px] "
          onChange={(event) => setNewTodo(event.target.value)}
          type="text"
        />
        <button className="bg-blue-300 uppercase p-2 px-5 rounded-lg text-white hover:bg-blue-400" onClick={() => {handleAdd(newTodo)}}> Add </button>
      </div>


    </>
  )
}

export default InputField