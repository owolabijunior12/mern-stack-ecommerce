import React from 'react'
import { FiKey } from 'react-icons/fi'
import { Brands } from '../utils/styles'

const Catagory = () => {
  return (
    <div className='w-full  h-auto'>
      <div className='text-4xl px-3 w-full bg-primary text-textColor'>Brands</div>
      <div className=' flex flex-wrap '>
           {
      Brands.map(({id,name})=>                           
            <p key={id} className='m-2 w-auto font-bold rounded-xl h-auto text-center bg-textColor  p-4'>{name} </p>            
        )
      }
      </div>   
    </div>
  )
}

export default Catagory
