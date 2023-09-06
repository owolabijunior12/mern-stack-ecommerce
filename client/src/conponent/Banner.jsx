import React from 'react'
import profile from "../asset/profile.jpg"
import { useStateValue } from '../Context/StateProvider'
import { getOneProduct, saveNewCart } from '../api'
import { toast } from 'react-toastify'

const Banner = ({data}) => {
 
  return (
    <div>
    {data &&
        <div className=' h-auto   md:p-0  rounded-3xl flex justify-evenly bg-primary m-4 py-2 text-textColor mb-6 bg-'>    
       <div className='flex  flex-col justify-center text-center h-full items-center'>
            <p className=' text-xl pt-10'>BEST SALES OF THE WEEK</p> 
            <p className='text-lg py-4'> Nike Air Force 1 has the highest sales for this week</p>
            <p className='text-sm py-4'>You can get it for a low price of  ${data?.product_price}</p>
       </div>
       <div className='flex  justify-center items-center'>
            <img src={data?.imageURL} className="w-225 h-175 pr-1" alt="" />  
       </div>
       <div className='flex flex-col justify-center px-1 items-center max-w-xs '>
          <div className=' bottom-0 left-0'>
                <p className=' text-xl py-2'>{data?.name}</p>
                
                <p> Price: ₦ {data?.product_price}</p>
          </div>           
       </div>
      </div>

    }
      </div>
  )
}

export default Banner
