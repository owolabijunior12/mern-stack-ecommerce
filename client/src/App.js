 // import logo from './logo.svg';
import React, {useEffect,useState} from 'react';
import {Route, Routes, useNavigate } from 'react-router-dom'
import { ToastContainer} from 'react-toastify';
import Signup from './pages/Signup';
import 'react-toastify/dist/ReactToastify.css';
import Login from "./pages/Login"
import CheckOut from './pages/Checkout'
import ShoppingCart from './pages/ShoppingCart'
import ProductDetails  from './pages/ProductDetails'
import HomeScreen from './conponent/HomeScreen'
import UserProfile from './pages/UserProfile';
import AdminPage from './pages/AdminPage';
import AdminPageAddProduct from './pages/AdminPageAddProduct';
import {useStateValue} from './Context/StateProvider'
import { getAuth } from 'firebase/auth'
import { actionType } from './Context/reducer';
import { getAllCart, validateUser } from './api';
import { app } from './configuration/firebase.configuration';

function App() {
  const firebaseAuth = getAuth(app)
  const nagivate = useNavigate();
  const [{user,carts}, dispatch] = useStateValue();
  const [auth,setAuth] = useState(false || window.localStorage.getItem("auth")===true);
  useEffect(()=>{
    firebaseAuth.onAuthStateChanged((userCred)=>{
        // console.log(userCred)
      if(userCred){
            userCred.getIdToken().then((token)=>{
            //   console.log(token)
              validateUser(token).then((data)=>{
                // console.log(data);
                dispatch({
                  type: actionType.SET_USER,
                  user:data,
                })
              })
            })
      }else{
        setAuth(false);
        dispatch({
          type: actionType.SET_USER,
          user:user,
        })
        window.localStorage.setItem("auth", false);
        nagivate("/");
      }
    })
},[])
const cartProducts =   JSON.parse(localStorage.getItem("cart"));
const userInfo=   JSON.parse(localStorage.getItem("userInfo"));

useEffect(() => {
      dispatch({
        type: actionType.SET_CARTS,
        carts:cartProducts  ,
      });   
}, []);
useEffect(() => {
      dispatch({
        type: actionType.SET_USER,
        user:userInfo  ,
      });   
}, []);
  return (
    
    <div className='min-w-[300px] h-auto  '>       
           <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            />
        <div className='min-w-[300px] h-auto  flex justify-center items-center'>       
                  <Routes>          
                  <Route path='/Login' element={<Login setAuth={setAuth}/>} />
                    <Route  path='/*'  element={<HomeScreen/>} />
                    <Route path="/shoppingCart" element={<ShoppingCart />} />
                      <Route path="/checkout"     element={<CheckOut/>} />
                      <Route path="/signup" element={<Signup />} />  
                      <Route path="/admin-page" element={<AdminPage />} />  
                      <Route path="/product-details/:productId" element={<ProductDetails  />} />                      
                      <Route path="/adminpageadder" element={<AdminPageAddProduct  />} />  
                      <Route path="/user-profile" element={<UserProfile  />} />  
                  </Routes>
                  
            </div>                    
    </div>
  );
}

export default App;
