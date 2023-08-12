import React, { useState } from 'react';
import { BiLock } from 'react-icons/bi';
import { Signup, baseURL } from '../api';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { CgProfile } from 'react-icons/cg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdOutlineAlternateEmail, MdOutlineDriveFileRenameOutline } from 'react-icons/md';
import './login.css';

const SignUp = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';
const [username, setUsername] = useState("");
const [fullname, setFullname] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const handleSubmit = async (e) => {
  e.preventDefault();
  if (!fullname || !username || !email || !password) {
    toast.error(`You need to fill up all your details`);
  }

    try {
      const response = await Signup(fullname,username,email,password);     
      // let lstore =[response.user
      localStorage.setItem("userInfo", JSON.stringify(response));
        //  console.log(lstore);
      toast.success(`Sign up successful!`);
      setTimeout(() => {
        navigate("/home");
      }, 5000);
    } catch (error) {
      // Handle error
      console.error(error);
      toast.error(`An error occurred during sign up.`);
    }
  
};


  return (
    <div className='login text-white'>   
      <h2>Welcome to Iboytech store</h2>
      <div className='signup'>
        <FcGoogle /> Sign-up with Google
      </div>
      <p>or</p>
      <form className='login-form'>
        <h2>Sign-up</h2>
        <div className='textbox'>
          <input type="text" onChange={e => setUsername(e.target.value)} placeholder='Username' />
          <span className='material-symbols-outline'>
            <CgProfile />
          </span>
        </div>
        <div className='textbox'>
          <input type="text" onChange={e => setFullname(e.target.value)} placeholder='Full-name' />
          <span className='material-symbols-outline'>
            <MdOutlineDriveFileRenameOutline />
          </span>
        </div>
        <div className='textbox'>
          <input type="email" onChange={e => setEmail(e.target.value)} placeholder='E-mail' />
          <span className='material-symbols-outline'>
            <MdOutlineAlternateEmail />
          </span>
        </div>
        <div className='textbox'>
          <input type="password" onChange={e => setPassword(e.target.value)} placeholder='Password' />
          <span className='material-symbols-outline'>
            <BiLock />
          </span>
        </div>
        <button type="submit" onClick={handleSubmit}>Create account</button>                          
        <a href="http://" target="_blank" rel="noopener noreferrer">Don't have an account yet</a>
        <Link to={`/login?redirect=${redirect}`}>Sign-In</Link>
   </form>
</div>
  )
}

export default SignUp
