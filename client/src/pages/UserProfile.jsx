import React from 'react'
import Header from '../conponent/Header'
import Footer from '../conponent/Footer'
import profile from '../asset/profile.jpg';
import { useLocation,Link } from 'react-router-dom';
import { useStateValue } from '../Context/StateProvider';
const UserProfile = () => {
    const {search} = useLocation();
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl ? redirectInUrl : '/';
    const user =   JSON.parse(localStorage.getItem("userInfo"))?.user;
  return (
    <div className='w-full'>
        <Header/>
       <div className='mt-28'>
                <div className='flex justify-center items-center m-4'>
                <img src={profile}  className=' w-32 h-32 min-w[44px] object-cover rounded-full shadow-lg' alt="user-pic" />        
                </div>
                <div className='flex flex-col  text-xl text-textColor justify-center items-center'>
                    <p className='underline capitalize font-bold w-full text-sm m-10 text-center'>Username:   {user?.username}</p>
                    <p className='underline capitalize font-bold w-full text-sm m-10 text-center'>Full- name:      {user?.name}</p>
                    <p className='underline capitalize font-bold w-full text-sm m-10 text-center'> Email:    {user?.email}</p>
                    {/* <div className='flex  text-textColor flex-col mb-6 justify-center items-center my-6'>
                        <p className='text-4xl'>Update your profile</p>
                        <input type="text" placeholder='home Address' className='border-0 bg-white border-b-2 w-full border-textColor ' />
                    </div>*/}
                 {/* <button type='button' className=' bg-red-500 w-full text-white m-2 p-2 rounded-xl'>Change your Password</button>          */}
                 
                </div> 
                <div  className='flex justify-center items-center m-4 flex-col' >
                <button type='button' className=' border-textColor border hover:bg-red-600 w-full text-white m-2 p-2 rounded-xl'>Edit your profile</button>    
                <button type='button' className=' border-textColor border hover:bg-red-600 w-full text-white m-2 p-2 rounded-xl'>Become a Seller</button>    
                <button type='button' className=' border-textColor border hover:bg-red-600 w-full text-white m-2 p-2 rounded-xl'>Change Password</button>          
                <Link to={`/login?redirect=${redirect}`} className='w-full'>
                     <button type='button' className=' border-textColor border hover:bg-red-600 w-full text-white m-2 p-2 rounded-xl'>Logout</button>   
                </Link>          
                    <button type='button' className=' bg-red-500 w-full text-white m-2 p-2 rounded-xl'>Delete Account</button>         
                </div>
               
       </div>
       <Footer/>
    </div>
  )
}

export default UserProfile
