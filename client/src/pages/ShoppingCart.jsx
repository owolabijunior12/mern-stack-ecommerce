import React, { useEffect } from 'react';
import Header from '../conponent/Header';
import Footer from '../conponent/Footer';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineShopping } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { PaystackButton } from 'react-paystack';
import { MdDelete } from 'react-icons/md';
import { motion } from 'framer-motion';

import { actionType } from '../Context/reducer';
import { useStateValue } from '../Context/StateProvider';

const ShoppingCart = () => {
  const [{ carts }, dispatch] = useStateValue();
  const navigate = useNavigate();
const cartProducts =   JSON.parse(localStorage.getItem("cart"));

  const GoShopping = () => {
    navigate("/home");
  };  
  useEffect(() => {
    if (!carts) {      
        dispatch({
          type: actionType.SET_CARTS,
          carts:cartProducts  ,
        });       
    }
  }, []);
  return (
    <div className='w-full'>
      <Header />
      <div className='flex mt-28 justify-between  flex-col my-5'>
        {!carts?.length ? (
            <div className='flex mt-28 flex-col justify-center items-center my-5'>
               <AiOutlineShopping className='text-8xl border rounded-full p-4 bg-white text-textColor' />
                <p className='font-bold text-4xl text-textColor py-2'>Your cart is empty</p>
                <h1 className='text-textColor font-semibold py-2'>Browse our categories and discover our best deals!</h1>
                <button type='button' className='bg-primary px-12 rounded-xl  my-10 py-2  text-xl text-textColor' onClick={GoShopping}>Start Shopping</button>
            </div>
          ) : (
             <CartCardProduct key={carts} data={carts} />
        )}
      </div>
      <Footer />
    </div>
  );
};

const CartCardProduct = ({ data }) => {
  const [{ carts }, dispatch] = useStateValue();

  useEffect(() => {
    if (!carts) {
      dispatch({
        type: actionType.SET_CART_PRODUCT,
        carts: data,
      });
    }
  }, [data, carts, dispatch]);
  const addCartQty = () =>{
    const cartitemsId = carts.id
   let cartitemsQty = carts.productQty
   if(cartitemsId === data.id){
    return cartitemsQty++
   }
}
  const minusCartQty = () =>{
    const cartitemsId = carts.id
   let cartitemsQty = carts.productQty
   if(cartitemsId === data.id){
    return cartitemsQty--
   }else if(cartitemsQty===0){

   }
}
  const updateCartItemQuantity = (cartId, quantity) => {
    const updatedCart = carts.map((cart) => (cart.id === cartId ? { ...cart, productQty: quantity } : cart));
    dispatch({
      type: actionType.SET_CART_PRODUCT,
      carts: updatedCart,
    });
  };

  const deleteCartItem = (cartId) => {
    const updatedCart = carts.filter((cart) => cart.id !== cartId);
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Update localStorage
    dispatch({
      type: actionType.SET_CART_PRODUCT,
      carts: updatedCart,
    });
  };

  let price =carts.reduce((total, cart) => total + cart.productPrice * cart.productQty, 0).toFixed(2)
  const config = {
    reference: new Date().getTime().toString(),
    email:'owolabijunior12@gmail.com',
    amount: price*100,//product price should be replaced
    publicKey: 'sk_test_e501c092502cd87640561fdaee143f4a0cfb77e1'
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
  const navigate = useNavigate();

  return (
    <div className='flex h-auto justify-between rounded-2xl border p-2 m-2 border-textColor flex-col'>
      <div className='flex flex-col'>
        {data.map((cart) => (
          <div  className='flex w-full border-textColor border p-4 my-2' key={cart._id}>
            <div className='flex justify-between w-full gap-3 items-center'>
              <div className='flex gap-3' onClick={() => navigate(`/product-details/${cart._id}`)}>
                <img src={cart.imageURL} className='h-20 w-36 rounded-lg' alt='' />
                <div>
                  <p className='font-bold  text-xl text-textColor '>{cart.name}</p>
                  <p className='font-bold  text-xl text-textColor'>  ₦ {cart.productPrice}</p>
                </div>
              </div>
              <div className='flex justify-between text-3xl w-28 items-center gap-2'>
                <motion.button
                  className='text-4xl text-textColor'
                  whileTap={{ scale: 0.8 }}
                  onClick={() => updateCartItemQuantity(cart.id, cart.productQty--)}
                >
                  <AiOutlineMinus />
                </motion.button>
                <span className='w-8'>{cart.productQty}</span>
                <motion.button
                  className='text-4xl text-textColor'
                  whileTap={{ scale: 0.8 }}
                  onClick={() => updateCartItemQuantity(cart.id, cart.productQty + 1)}
                >
                  <AiOutlinePlus />
                </motion.button>
              </div>
              <div>
                <motion.button
                  whileTap={{ scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => deleteCartItem(cart.id)}
                >
                  <MdDelete className='text-red-500  text-xl' />
                </motion.button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className='flex items-center h-20 justify-between'>
        <h1 className='text-4xl text-white'>
          Total: <span> ₦ {price}</span>
        </h1>
        <motion.button
          whileTap={{ scale: 0.8 }}
          transition={{ duration: 0.3 }}
          type='button'
          onClick={() => navigate(`/checkout `)}
          className=' bg-red-500 text-white m-2 p-2 rounded-xl'
        >
          Process        
        </motion.button>
      </div>
    </div>
  );
};

export default ShoppingCart;
