import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import profile from '../asset/profile.jpg';
import {FiLogOut} from "react-icons/fi";
import { productData } from '../pages/DemoDatas';
import { filters } from '../utils/styles';

const Sidebar = () => {
  const {search} = useLocation();  
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';
  const userInfo= localStorage.getItem("fullname")
  return (
    <div className='w-auto mt-28'>
          <div className="fixed left-0 text-white bottom-0 h-full bg-black w-[300px] ">
            {/* <HiMenu className=' text-4xl  lg:hidden text-white '/>    */}
          
          <div className="flex bg-black justify-between px-4 py-4">            
          <Link to={'/'}>
              <h1 className='py-3 px-2  text-xl text-textColor'>IBOYTECH STORE</h1>           
        </Link>
            <button>
              {/* <AiFillCloseCircle className=' text-xl text-red-500'/> */}
            </button>
          </div>
          <hr />

         
          <div className="flex flex-col gap-10 m-2  text-xl scroll-m-1 overflow-scroll overflow-y-scroll bg-scroll text-textColor">
            {/* <div className='flex justify-between'>                   
                  <p  className='mx-5 my-2 text-textColor text-4xl'><small><Link to={`/login?redirect=${redirect}`}><FiLogOut values="LogOut" /></Link></small>  </p>
            </div> */}
                <div className='flex justify-between bottom-0 left-0 mt-4 '   >     
                        <Link to={"/user-profile"}>
                        <  div className=' flex gap-1' >
                                <img src={profile}  className=' w-16 h-16 min-w[44px] object-cover rounded-full shadow-lg' alt="user-pic" />        
                                <p className='text-4xl font-bold capitalize'> {userInfo?.length >9?userInfo.slice(0,11):userInfo}... <div className='text-lg'>Admin</div></p>
                              </div>
                        </Link>         
                          
                       <p  className='mx-5 my-2 text-textColor text-4xl'><small><Link to={`/login?redirect=${redirect}`}><FiLogOut values="LogOut" /></Link></small>  </p>
                 </div>                
            <div className="flex flex-col">
                  <h1 className='text-4xl pb-2 capitalize'>Categorys</h1>
                  {filters.map(({name})=>
                    <p className= 'p-4 text-textColor'>{name}</p>
                    
                  )}
              </div>          
            <div className="flex flex-col">
                  <h1 className='text-4xl pb-2 capitalize'>Setting</h1>
                  
                    <p className= 'p-4 text-textColor'>Dark Mood</p>                                    
                    <p className= 'p-4 text-textColor'> Settings</p>                                                                                          
                    <p className= 'p-4 text-textColor'>Become a Seller</p> 
                     <p className= 'p-4 text-textColor'>Help Center</p>                                    
              </div>          
                  
            <div>              
            </div>
            {/* <div className='flex justify-between bottom-0 left-0 mt-20 '   >     
            <Link to={"/user-profile"}>
             <  div className=' flex gap-1' >
                    <img src={profile}  className=' w-16 h-16 min-w[44px] object-cover rounded-full shadow-lg' alt="user-pic" />        
                    <p className='text-4xl font-bold capitalize'> {userInfo?.length >9?userInfo.slice(0,11):userInfo}... <div className='text-lg'>Admin</div></p>
                  </div>
            </Link>         
               
                  <p  className='mx-5 my-2 text-textColor text-4xl'><small><Link to={`/login?redirect=${redirect}`}><FiLogOut values="LogOut" /></Link></small>  </p>
            </div> */}
          </div>


          
        </div>
    </div>
  )
}

export default Sidebar
