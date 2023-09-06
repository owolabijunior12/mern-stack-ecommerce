import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { getAllProduct } from '../api';
import { actionType } from '../Context/reducer';
import { useStateValue } from '../Context/StateProvider';

const Product = () => {
  // const navigate = useNavigate();
  const [{ allProduct }, dispatch] = useStateValue();
  useEffect(() => {
    if (!allProduct) {
      getAllProduct().then((data) => {
        dispatch({
          type: actionType.SET_ALL_PRODUCT,
          allProduct: data.product,
        });        
      });
    }
  }, []);

  return (
    <div className='mb-3  w-full py-10'>
      <div className='flex pl-6 bg-black text-textColor text-4xl mb-7'>FootWears</div>
      <div className=' mb-3 '>
        <ProductContainer data={allProduct}/> 
      </div>
    </div>
  );
};

export default Product;


export const ProductContainer = ({ data }) => {
  const navigate = useNavigate();
  return (
   <div className='flex overflow-auto'>
      {data?.map((data, index) => (
            
        <motion.div
        onClick={() => navigate(`/product-details/${data._id}`)}
        key={data._id}
          whileTap={{ scale: 0.8 }}
          initial={{ opacity: 0, translateX: -50 }}
          animate={{ opacity: 1, translateX: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="relative m-2 w-30 min-w-100  p-2  cursor-pointer hover:border-4 h-[190px] hover:border-textColor  bg-black shadow-md rounded-lg flex flex-col items-center" 
        >
          <div className="w-30 min-w-[120px] h-30 min-h-[90px] rounded-lg drop-shadow-lg relative overflow-hidden ">
            <motion.img
              whileHover={{ scale: 1.05 }}
              src={data.imageURL}
              alt="product-Image"
              className="w-full h-full bg-white rounded-lg object-cover"
            />
          </div>
  
          <p className="text-base px-2 text-textColor font-semibold my-2">            
            <span className="block text-sm  my-1">{data.name}</span>
            <span className="block text-lg  my-1">₦ {data.product_price}</span>         
          </p>
          
        </motion.div>
        
      ))}
    </div> 
  );
};


