import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Product from '../components/Product';
import { getCartItems, removeFromCart } from "../api/cart";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  
  useEffect(() => {
    getCartItems().then(result => {
      setCartItems(result);
      setCartTotal(result.reduce(getSum,0));
    });
    // return () => {
    //   // Clean up the subscription
    //   // subscription.unsubscribe();
    // };
  },[]);

  const removeFromCartFunc = (itemId) => {      
    removeFromCart(itemId).then(()=> {
      getCartItems().then(result => {
        setCartItems(result);
        setCartTotal(result.reduce(getSum,0));
      });
    });
  }
  
  function getSum(total, item) {
    return total + (item.price * item.stock);
  }
  
  return (
  <div>
      <Header title="Cart" /> 
      <div className='table'>
            <div className='tableHeader'>                
                <div>Product Name</div>
                <div>Price</div>
                <div>Item</div>
                <div>Total Price</div>                
                <div>Actions</div>
            </div>
            <div className='tableBody'>
                {cartItems.map(item => (
                    <div key={item.id}>
                       <div>{item.product_name}</div>
                       <div>{item.price}</div>
                       <div>{item.stock}</div>
                       <div>{item.stock * item.price}</div>
                       <div><button onClick={()=> removeFromCartFunc(item.id)}>Remove from Cart</button></div>
                    </div> 
                ))}
            </div>
            <div className='tableFooter'>
                <div></div>
                <div></div>
                <div>Total Cart Amount</div>
                <div>{cartTotal}</div>
                <div></div>
            </div>            
        </div>             
  </div>
  )
};

export default Cart;
