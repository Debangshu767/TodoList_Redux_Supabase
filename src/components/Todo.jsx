import { supabase } from '../supabaseClient'
import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { removeTodo } from '../store/Slices/TodoSlice';
import { BsFillTrashFill } from 'react-icons/bs'

function Todo({ todo }) {
  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState(todo.isChecked);

  const handleCheckboxChange = async () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);

    // Update isChecked in the database
    await supabase
      .from('TodoItem')
      .update({ isChecked: newCheckedState })
      .eq('id', todo.id);
  };

  const handleDelete = async () => {
    const { error } = await supabase.from('TodoItem').delete().eq('id', todo.id);
    if (!error) {
      dispatch(removeTodo(todo.id));
    }
  };

  useEffect(() => {
    // Set the initial checkbox state based on the todo's isChecked value
    setIsChecked(todo.isChecked);
  }, [todo.isChecked]);

  return (
    <div className="flex flex-row gap-5 justify-between items-center w-full max-w-[500px] rounded-lg p-4 border-t-4 border-blue-200 shadow-md shadow-slate-300" key={todo.id}>
      <div className='flex flex-row gap-5 items-center'>
        <input
          type="checkbox"
          className='w-6 h-6 accent-blue-300 rounded-full'
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <div className="text-lg text-blue-300 font-extralight">{todo.Title}</div>
      </div>
      <button className="bg-red-300 uppercase text-white p-2 rounded-full hover:bg-red-400" onClick={handleDelete}><BsFillTrashFill /></button>
    </div>
  );
}

export default Todo;
