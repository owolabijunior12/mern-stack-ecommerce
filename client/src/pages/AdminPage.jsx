import React from 'react'
import Header from '../conponent/Header';
import { useNavigate,Link, useLocation } from 'react-router-dom'
import Footer from '../conponent/Footer';
import { FaPlus } from 'react-icons/fa';

const AdminPage = () => {
    const userInfo= localStorage.getItem("fullname")
  return (
    <div className='w-full'>
        <Header/>
        <div className='flex justify-center items-center m-28'>
            <div  className='flex justify-between w-full'>
                    <div className='text-4xl text-textColor'>{userInfo?.length<9 ?userInfo.slice(0,12):userInfo}</div>
                    <Link to={'/adminpageadder'}>
                            <FaPlus values='Add New Product'  className='text-4xl text-textColor border p-2 rounded-sm  border-textColor'/>
                    </Link>
                   
            </div>
         
        </div>
        <Footer/>
    </div>
  )
}

export default AdminPage
