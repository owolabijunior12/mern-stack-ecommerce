import React, { useEffect } from 'react';
import profile from '../asset/profile.jpg'
import{BiLock}from 'react-icons/bi';
import {CgProfile} from 'react-icons/cg';
import './login.css';
// import axios from "axios";
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import { useLocation, useNavigate,Link } from 'react-router-dom';
import { Signin, validateUser } from '../api';
import { actionType } from '../Context/reducer';
import {getAuth, GoogleAuthProvider, signInWithPopup}from 'firebase/auth'
import { useStateValue } from '../Context/StateProvider';
import { app } from '../configuration/firebase.configuration';
import { FcGoogle } from 'react-icons/fc';
const Login = ({useAuth, history,setAuth}) => {
      const navigate = useNavigate();
      const [email,setEmail] =useState("");
      const [password,setPassword] = useState("")
      const [{user},  dispatch] = useStateValue();                      
      const {search} = useLocation();
      const redirectInUrl = new URLSearchParams(search).get('redirect');
      const redirect = redirectInUrl ? redirectInUrl : '/'   
      
      const notify = () => toast.success(`Logged in successfully`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
            const  handleSubmit = async (e)=>{
             e.preventDefault();
                  if ( !email  || !password ) {
                        toast.error(`You need to fill up all your details`);
                    }
                          try {
                      const response = await Signin(email,password); 
                      console.log(response);
                      toast.success("Logged in successfully");
                      window.localStorage.setItem("auth", "true"); 
                      localStorage.setItem('userInfo', JSON.stringify(response));
                      setTimeout(() => {
                        navigate("/");
                      }, 5000);
                    } catch (error) {                      
                      console.error(error);
                      toast.error(`An error occurred during log in.`);
                    }                                                      
            }  
         
            
            
  return (
      <div className='body'>
            <div className='login'>            
                  <div className="avatar">
                  <img src={profile} alt='profile' />
                  </div>
           
                  <h2>Login</h2>
                  <h2>Welcome back </h2>
                  <form className='login-form' action="">
                        <div className='textbox'>
                              <input type="email" onChange={e=>setEmail(e.target.value)}
                              name="" placeholder='Email' id="" />
                              <span className='material-symbols-outline'>
                                    <CgProfile/>
                              </span>
                        </div>
                        <div className='textbox'>
                              <input type="password"onChange={e=>setPassword(e.target.value)} name="" placeholder='Password' id="" />
                              <span className='material-symbols-outline'>
                                    <BiLock/>
                              </span>
                        </div>
                       
                              <button onClick={handleSubmit}> Login</button>
                        
                              
                        <Link href="#" target="_blank" rel="noopener noreferrer">
                        Forgot Password
                        </Link >
                          <div className='flex gap-1'>
                                    <Link href="http://" target="_blank" rel="noopener noreferrer" name="newUser">Don't have an account yet</Link>
                                    <label htmlFor="newUser" className='underline font-bold text-2xl   text-white'><Link to={`/signup?redirect=${redirect}`}>SignUp</Link></label>
                        </div>    
                  </form>
                  
                  <div className=' flex m-5 items-center justify-center gap-2 p-2 rounded-md bg-red-500 cursor-pointer hover:bg-red-600 duration-100 ease-in-out transition-all' >
                      <FcGoogle className='text-xl '/> Sigin with Google
                  </div> 
            </div>
  </div>
  )
}

export default Login
