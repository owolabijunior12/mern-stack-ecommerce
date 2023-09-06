import React, { useEffect, useState } from 'react';
// import {FaCrown}from 'react-icons/fa';
import profile from '../asset/profile.jpg';
import {GiShoppingCart} from "react-icons/gi"
import {FiLogOut} from "react-icons/fi"
import {HiMenu} from 'react-icons/hi'
import { AiFillCloseCircle,  } from 'react-icons/ai';
import { Link, useLocation} from 'react-router-dom';
// import Sidebar from './Sidebar';
import  useMediaQuery, { filterByNewOld, filters } from '../utils/styles'
// import { toast } from 'react-toastify';
import { productData } from '../pages/DemoDatas';
import { toast } from 'react-toastify';
import {useStateValue} from '../Context/StateProvider'
import { getAllCart } from '../api';
import { actionType } from '../Context/reducer';
const Header = () => {
  const [{carts},dispatch] =useStateValue();
  // const navigate = useNavigate();
  const [isMenu, setIsMenu] = useState()
  const {search} = useLocation;  
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';
  const [isMenuToggled, setIsMenuToggled] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  // const navbarBackground = isTopOfPage ? "" : "bg-red";
  // const userInfo= localStorage.getItem("user")
  // console.log(userInfo);
  // useEffect(() => {
  //   if (!carts) {
  //     getAllCart().then((data) => {
  //       dispatch({
  //         type: actionType.SET_CARTS,
  //         carts: data
  //       }); 
  //     });
  //   }
  // }, []);
  
  const cartProducts =   JSON.parse(localStorage.getItem("cart"));
  const user =   JSON.parse(localStorage.getItem("userInfo"))?.user;
  // user.push(userinfo)
  return (
    <nav className={` bg-black z-40  w-full fixed top-0 py-6 text-textColor shadow-lg shadow-textColor`}>
    <div className="flex  justify-between  w-full">  
   
        <Link to={'/'}>
              <h1 className='   text-xl px-7 text-textColor'>IBOYTECH STORE</h1>
                      
        </Link>
             
      {isDesktop ? (
        <div className="flex justify-between gap-16 font-opensans text-sm font-semibold">
             <div className='relative scale-75 flex '>      
                 <span className='absolute -top-2 left-12 rounded-full bg-red-500 p-0.25 px-2 text-lg text-red-50'>{carts?.length}</span>                                   
                    <p className='mx-5  text-textColor text-6xl' > <small ><Link to={`/shoppingCart?redirect=${redirect}`}>  <GiShoppingCart /></Link></small>  </p>                                                                    
                    <img 
                      onClick={() => setIsMenu(!isMenu)}                                        
                      src={profile} className=' w-12 h-12 min-w[44px] object-cover rounded-full shadow-lg' alt="user-pic" />
              </div> 
              {
                isMenu&&(
                  <div className='absolute z-10 p-4  top-20 right-5 gap-4 w-275 bg-[] shadow-lg rounded-lg backdrop-blur-sm flex-col'>
                    <Link to={"/user-profile"}>
                            <span className='text-base flex m-4   textColor hover:font-extrabold hover: text-xl duration-150 transition-all ease-in-out'>
                                  {/* <AiOutlineProfile className='mr-1'/> */}
                                   Profile
                              </span>
                    </Link>
                    <Link to={"/"}>
                            <span  className='text-baseflex m-4 justify-between textColor hover:font-extrabold hover: text-xl  duration-150 transition-all ease-in-out'>
                                  Track order
                              </span>
                    </Link>
                    <Link to={"/"}>
                            <span className='text-base flex m-4 justify-between  textColor hover:font-extrabold hover: text-xl  duration-150 transition-all ease-in-out'>
                                  Transactions 
                              </span>
                    </Link>
                    <Link to={"/admin-page"}>
                            <p className='text-baseflex m-4 justify-between  textColor hover:font-extrabold hover: text-xl  duration-150 transition-all ease-in-out'>
                                  Admin Page
                              </p>
                    </Link>
                    <Link to={"/"}>
                            <p className='text-base flex m-4 justify-between  textColor hover:font-extrabold hover: text-xl  duration-150 transition-all ease-in-out'>
                                  Help Center
                              </p>
                    </Link>
                      
                    <Link to={`/login?redirect=${redirect}`} className='hover:font-extrabold hover: text-xl '>
                      <p  className='flex m-4 justify-between  hover:font-bold duration-150 transition-all ease-in-out'>
                        LogOut<FiLogOut values="LogOut" />
                      </p>                      
                      </Link>                      
                  </div>

                )
              }
        </div>
      ) : (          
        <div className='relative scale-75 flex '>      
                             <span className='absolute -top-2 left-12 rounded-full bg-red-500 p-0.25 px-2 text-lg text-red-50'>{cartProducts?.length}</span>                                   
                    <p className='mx-5  text-textColor text-5xl'> <small ><Link to={`/shoppingCart?redirect=${redirect}`}>  <GiShoppingCart /></Link></small>  </p> 
          <HiMenu onClick={() => setIsMenuToggled(!isMenuToggled)} className='text-4xl text-white'/>      
        </div>      
      )}

 
      {!isDesktop && isMenuToggled && (
        <div className="fixed left-0 overflow-scroll scroll-m-5 scroll-textColor text-white bottom-0 h-full bg-black w-[300px] ">
            
          
          <div className="flex bg-black justify-between px-4 py-4">            
          <Link to={'/'}>
              <h1 className='py-3 px-2  text-xl text-textColor'>IBOYTECH STORE</h1>              
        </Link>
            <button onClick={() => setIsMenuToggled(!isMenuToggled)}>
              <AiFillCloseCircle className=' text-xl text-red-500'/>
            </button>
          </div>
          <hr />

         
          <div className="flex flex-col gap-10 m-2 pl-6  text-xl scroll-m-1 overflow-scroll overflow-y-scroll bg-scroll text-textColor">
            {/* <div className='flex justify-between'>                   
                  <p  className='mx-5 my-2 text-textColor text-4xl'><small><Link to={`/login?redirect=${redirect}`}><FiLogOut values="LogOut" /></Link></small>  </p>
            </div> */}
                <div className='flex justify-between bottom-0 left-0 mt-4 '   >     
                        <Link to={"/user-profile"}>
                        <  div className=' flex gap-1' >
                                <img src={profile}  className=' w-16 h-16 min-w[44px] object-cover rounded-full shadow-lg' alt="user-pic" />        
                                <p className='text-xl font-bold capitalize'> {user?.name}<div className='text-lg'>Admin</div></p>
                              </div>
                        </Link>         
                          
                       <p  className='mx-5 my-2 text-textColor text-4xl'><small><Link to={`/login?redirect=${redirect}`}><FiLogOut values="LogOut" /></Link></small>  </p>
                 </div>
              
                    <Link to={"/"}>
                            <p  className='text-base flex  justify-between textColor hover:font-extrabold hover: text-xl  duration-150 transition-all ease-in-out'>
                                  Track order
                              </p>
                    </Link>
                    <Link to={"/"}>
                            <p className='text-base flex justify-between  textColor hover:font-extrabold hover: text-xl  duration-150 transition-all ease-in-out'>
                                  Transactions 
                              </p>
                    </Link>
                    <Link to={"/admin-page"}>
                            <p className='text-base flex  justify-between  textColor hover:font-extrabold hover: text-xl  duration-150 transition-all ease-in-out'>
                                  Admin Page
                              </p>
                    </Link>
                    <Link to={"/"}>
                            <p className='text-base flex  justify-between  textColor hover:font-extrabold hover: text-xl  duration-150 transition-all ease-in-out'>
                                  Help Center
                              </p>
                    </Link>
                      
            <div className="flex flex-col">
                  <h1 className=' pb-2 font-extrabold capitalize'>Categorys</h1>
                  {filters.map(({id,name})=>
                      <li key={id} className= ' p-4 capitalize text-base text-textColor' onClick={() => setIsMenuToggled(!isMenuToggled)}>{name}</li>
                  )}
                   <h1 className=' font-extrabold pb-2 capitalize'>Product Type</h1>
                    {filterByNewOld.map(({name, id})=>
                      <li key={id} className= 'p-4 text-base text-textColor' onClick={() => setIsMenuToggled(!isMenuToggled)}>{name}</li>
                    )}
                      <p className= 'p-4 text-textColor' onClick={() => setIsMenuToggled(!isMenuToggled)}>Dark Mood</p> 
              </div>                                              
            <div>              
            </div>          
          </div>          
        </div>
      )}
    </div>
  </nav>
  )
}

export default Header





