import React from 'react'
import { useStateValue } from '../Context/StateProvider'
import Footer from './Footer'
import Header from './Header'
import Catagory from './Catagory'
import Banner from "./Banner"



import Product from "./Product"
const HomeScreen = () => {
  const [{allProduct},dispatch] =useStateValue()
  let product;
  if(allProduct){
    product=allProduct[3];    
  } 
  return (
    <div className='flex flex-col w-full transition-all duration-500 h-full'>        
       <Header/>
       <marquee behavior="move" direction="left"  className="text-xl mt-24 font-extrabold text-yellow-500"><i>Welcome to Iboytech Store... Where you can get all fairly used product that 100% secure </i></marquee>
       <Banner data={product}/>   
       <Catagory />      
        <Product   />      
        <Footer/>     
     </div>
  )
}

export default HomeScreen
