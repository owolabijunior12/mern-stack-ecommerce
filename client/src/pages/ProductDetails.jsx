import React, { useEffect, useState } from 'react'
import Header from '../conponent/Header'
import {motion} from 'framer-motion'
import { useParams,Link } from 'react-router-dom'
import Footer from '../conponent/Footer'
import { image } from './DemoDatas'
import { getAllCart, getOneProduct, saveNewCart } from '../api'
import { AiFillStar, AiOutlineHeart, AiOutlineStar } from 'react-icons/ai'
import {  toast } from 'react-toastify';
import { PaystackButton } from 'react-paystack';
import 'react-toastify/dist/ReactToastify.css';
import { useStateValue } from '../Context/StateProvider'
import { actionType } from '../Context/reducer'


const ProductDetails = () => {
  const [cartValue, setCartValue] = useState(0);
  const { productId } = useParams();
  const [{ product,carts }, dispatch] = useStateValue();
  useEffect(() => {
    getOneProduct(productId).then((res) => {
      dispatch({
        type: actionType.SET_PRODUCT,
        product: res.data,
      });
     
    });
    
  }, []);
  
  // console.log(product) 
  const productLocalstorage = () => {
    try {
      const cartSave = {
        id: productId,
        name: product.name,
        productPrice: product.product_price,
        imageURL: product.imageURL,
        productSize: product.product_size,
        productQty: 1,
      };
      let existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
  
      // Check if the product is already in the cart
      const existingProduct = existingCart.find((item) => item.id === productId);
  
      if (existingProduct) {        
        existingProduct.productQty += 1;
      } else {      
        existingCart.push(cartSave);
      }
  
      localStorage.setItem("cart", JSON.stringify(existingCart));
      dispatch({
        type: actionType.SET_CARTS,
        carts: existingCart,
      });
      toast.success(` ${product.name} is added to cart`);
      console.log("Cart Data in localStorage:", existingCart);
    } catch (error) {
      console.log(error);
      toast.error("Failed to add to cart");
    }
  };
  
  
let Price;
if(product){
  Price=product.product_price
}

const config = {
  reference: new Date().getTime().toString(),
  email: 'owolabijunior12@gmail.com',
  amount: Price,
  publicKey: 'pk_test_e1b8cee0a0acd0d5b481ac2508ca0202215e2432',
};

const handlePaystackSuccessAction = (reference) => {
  console.log('Payment success');
  // handleSubmit();
  console.log(reference);
};

const handlePaystackCloseAction = () => {
  console.log('Payment dialog closed');
};

const componentProps = {
  ...config,
  text: 'Buy Now',
  onSuccess: handlePaystackSuccessAction,
  onClose: handlePaystackCloseAction,
};
  return (
    <div className='w-full'>
      <Header/>
      {product&&(

        <div key={product._id}  className='flex flex-col mt-28 w-full justify-center items-center'>
        <div className=' w-350 pb-2'>              
              <img src={product.imageURL} alt="product_image" className=' w-full rounded-lg ' />              
        </div>
        <div className='flex mb-4'>
            <div className='round rounded-full m-2 p-2 bg-textColor'></div>
            <div className='round rounded-full m-2 p-2 bg-white'></div>
            <div className='round rounded-full m-2 p-2 bg-white'></div>
            <div className='round rounded-full m-2 p-2 bg-white'></div>
        </div>
        
        <div  className='relative flex  min-w-160 p-6   cursor-pointer text-textColor   bg-primary m-4  shadow-md rounded-lg flex-col'>
          <div className='bg-red-500 w-24 rounded-sm text-center text-white   m-1'>Free Delivery</div>
          <h1 className='flex justify-start text-xl mr-52 text-textColor font-extrabold mb-4'>{product.name}</h1>
          <p className=' text-xl mb-2'> ₦{product.product_price}<span className=' text-red-500 text-xs'>save up 20%</span></p>
          <div className='flex text-center' >
            <AiFillStar  className='text-sm'/>
            <AiFillStar  className='text-sm'/>
            <AiFillStar  className='text-sm'/>
            <AiFillStar  className='text-sm'/>
            <AiOutlineStar className='text-sm'/>                
          </div>                    

          <progress max="100"  value="30" className='rounded-lg bg-red-500'>20</progress>
          <p className='flex mr-5'> <div className='bg-green-600 rounded-full mt-1 w-0 h-0 p-2 m-2 '></div> <p>Status: {product.product_status}</p></p>
          <div className=' mb-4'>
          <motion.button
           whileTap={{ scale: 0.8 }}        
           transition={{ duration: 0.3}}
           onClick={productLocalstorage}
          type='button' 
          className=' bg-red-500 text-white m-2 p-2 rounded-xl' 
          >
            Add to Cart       
          </motion.button>                        
          <motion.button
           whileTap={{ scale: 0.8 }}        
           transition={{ duration: 0.3}}
          type='button' 
          className=' bg-red-500 text-white m-2 p-2 rounded-xl' 
          >            
          <PaystackButton {...componentProps} />
          </motion.button>                        
        </div>
        <div className='mb-4'>
        <hr />
          <h1 className='pl-4'>Descriptions</h1>    
          <hr />
          <p>{product.description}</p>
        </div>
        <div className='mb-4'>
            <hr />
          <h1 className='pl-4'>Product Conditon</h1>
          <hr />
          <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa quae consequatur et quo
              magnam asperiores possimus 
              beatae, officiis quisquam velit eos accusantium corporis laborum! Impedit hic iure ea dicta ex.
          </p>
        </div>
        <div className='mb-4'>
            <hr />
          <h1 className='pl-4'>Product Specification</h1>
          <hr  className='mb-3'/>        
        <tbody className=' my-4 '>
          <th className='border p-4' >Name:</th>
          <td className='border p-4'>{product.name}</td>       
          <tr>
              <th className='border p-4' >Serial-Number:</th>
              <td className='border p-4'>{product.product_serial_number}</td> 
            </tr>   
          <tr>
              <th className='border p-4' >Model-Number:</th>
              <td className='border p-4'>{product.product_model_number}</td> 
            </tr>   
          <tr>
              <th className='border p-4' >Size:</th>
              <td className='border p-4'>{product.product_size}</td> 
            </tr>   
          <tr>
              <th className='border p-4' >Weight:</th>
              <td className='border p-4'>{product.product_weight}</td> 
            </tr>   
          <tr>
              <th className='border p-4' >Color:</th>
              <td className='border p-4'>{product.product_color}</td> 
            </tr>   
          <tr>
              <th className='border p-4' >New / Used:</th>
              <td className='border p-4'>{product.product_type}</td> 
            </tr>   
                  
        </tbody>         
          <p>
          </p>
        </div>
        <div className='mb-4'>
            <hr />
          <h1 className='pl-4'>Delivery Details</h1>
          <hr />
          <p>
            <p className=' text-xl font-bold'> Fast Delivery:</p>
              <span className='text font-semibold text-lg'>New product </span> will take 4-5 working days to be delievered Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Nobis quibusdam et, quia, eius atque, dolorum voluptas repellendus quod necessitatibus
                cumque nisi iure provident mollitia rerum impedit magnam maiores. Eveniet, pariatur corrupti,
                  sapiente sequi repellendus quia impedit minus debitis veritatis ad earum deleniti ex quidem dicta in
                  magni fuga cumque tenetur maxime possimus repellat error officiis? Blanditiis atque consequuntur
                    ipsa vel quisquam consectetur laborum possimus. Ipsam cupiditate quam perspiciatis, adipisci vel
                    rem beatae cum enim modi incidunt magnam fugiat porro alias iste quas soluta corrupti ducimus 
                    delectus! Iusto culpa ab blanditiis natus impedit eveniet nesciunt pariatur. Libero odio cumque 
                    assumenda reiciendis iste, cum non aut veniam doloremque exercitationem quo nobis itaque eligendi
                      veritatis iusto consequuntur illum, voluptatum hic dolore natus dignissimos vero repudiandae amet! 
                      Non labore minus at beatae dolore temporibus ratione harum expedita quidem, cum assumenda,
                      molestiae necessitatibus! Sed, velit? <br /><br />
              <span className='text font-semibold text-lg'>Used product </span> will take {Date()} working days to be delievered Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Nobis quibusdam et, quia, eius atque, dolorum voluptas repellendus quod necessitatibus
                cumque nisi iure provident mollitia rerum impedit magnam maiores. Eveniet, pariatur corrupti,
                  sapiente sequi repellendus quia impedit minus debitis veritatis ad earum deleniti ex quidem dicta in
                  magni fuga cumque tenetur maxime possimus repellat error officiis? Blanditiis atque consequuntur
                    ipsa vel quisquam consectetur laborum possimus. Ipsam cupiditate quam perspiciatis, adipisci vel
                    rem beatae cum enim modi incidunt magnam fugiat porro alias iste quas soluta corrupti ducimus 
                    delectus! Iusto culpa ab blanditiis natus impedit eveniet nesciunt pariatur. Libero odio cumque 
                    assumenda reiciendis iste, cum non aut veniam doloremque exercitationem quo nobis itaque eligendi
                      veritatis iusto consequuntur illum, voluptatum hic dolore natus dignissimos vero repudiandae amet! 
                      Non labore minus at beatae dolore temporibus ratione harum expedita quidem, cum assumenda,
                      molestiae necessitatibus! Sed, velit?
          </p>
        </div>
        </div>
        
        
        </div>
      )}
    <div className='relative flex  min-w-160   cursor-pointer    bg-primary m-4  shadow-md rounded-lg flex-col'>
          <div className='flex flex-row   px-4 justify-between'>
              <p className='text-textColor  text-xl font-extrabold '>Saved Items ( 2 )</p>
              <p className=' text-xl text-white underline font-extrabold'>See All</p>
          </div>
          <div className='flex flex-wrap'>
            
            {[
                   
                     {
                        id:5,
                       product_name: "Nike Air Force4",
                       product_price: 300.54,
                       product_image: image,
                       product_status:"Availaible"
                     },
                     {
                        id:6,
                       product_name: "Nike Air Force4",
                       product_price: 300.54,
                       product_image: image,
                       product_status:"Availaible"
                     }
        
                   ].map((product)=>
               
                   <div key={product.id} className="relative flex w-30 min-w-160   cursor-pointer hover:shadow-xl  hover:bg-white bg-primary m-4 shadow-md rounded-lg flex-col items-center">
                     <div className=" min-w-[120px] w-32 h-30 min-h-[120px] rounded-lg drop-shadow-lg relative overflow-hidden items-center">
                       <img
                         
                         src={product.product_image}
                         alt="product_image"
                         className="w-full h-full rounded-lg object-cover"
                       />
                     </div>                   
                     <p className="text-base items-center text-textColor font-semibold my-2">
                           
                           <span className=" text-sm text-textColor my-1"> {product.product_name}</span>
                       </p>
                       <p className="text-base text-textColor items-center font-semibold ">
                         
                         <span className=" text-sm text-textColor my-1">  ₦{product.product_price} </span>
                       </p>                                           
                 </div>
             
                   )}      
                 </div>
        </div>
        <div className='relative flex  min-w-160   cursor-pointer    bg-primary m-4   rounded-lg flex-col'>
          <div className='flex flex-row   px-1 justify-between'>
              <p className='text-textColor  text-xl font-extrabold '>Top Sales</p>              
          </div>
          <div className='flex flex-wrap'>
            
            {[
                   
                     {
                        id:5,
                       product_name: "Nike Air Force4",
                       product_price: 300.54,
                       product_image: image,
                       product_status:"Availaible"
                     },
                     {
                        id:6,
                       product_name: "Nike Air Force4",
                       product_price: 300.54,
                       product_image: image,
                       product_status:"Availaible"
                     }
        
                   ].map((product)=>
               
                   <div key={product.id} className="relative flex w-30 min-w-160   cursor-pointer   hover:bg-white bg-primary m-4 shadow-md rounded-lg flex-col items-center">
                     <div className=" min-w-[120px] w-32 h-30 min-h-[120px] rounded-lg drop-shadow-lg relative overflow-hidden items-center">
                       <img
                         
                         src={product.product_image}
                         alt="product_image"
                         className="w-full h-full rounded-lg object-cover"
                       />
                     </div>                   
                     <p className="text-base items-center text-textColor font-semibold my-2">
                           
                           <span className=" text-sm text-textColor my-1"> {product.product_name}</span>
                       </p>
                       <p className="text-base text-textColor items-center font-semibold ">
                         
                         <span className=" text-sm text-textColor my-1">  ₦{product.product_price} </span>
                       </p>                                           
                 </div>
             
                   )}      
                 </div>
             </div>
      <Footer/>        
    </div>
  )
}


export default ProductDetails
 

// export const ProductDetailsPin = ({data})=>{
//   return (
//     <div className='flex overflow-auto'>
//        {data.map((data, index) => (
             
         
//        ))}
//      </div> 
//    );
//   }
  
