import React from 'react'
import { Link } from 'react-router-dom'
import  oops from '../assets/Oops.svg'

function PageNotFound() {
  return (
    <div className=' flex flex-col justify-center items-center'>
        <img src={oops} className='w-[400px] h-[400px]' alt="" />
        <Link to={'/'} className="bg-blue-300 text-center uppercase p-2 rounded-lg text-white hover:bg-blue-400 w-[100px]"> Login </Link>

    </div>
  )
}

export default PageNotFound