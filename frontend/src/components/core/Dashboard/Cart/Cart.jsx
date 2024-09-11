import React from 'react'
import { useSelector } from 'react-redux'
import CartCard from './CartCard';
import CartPaymentCard from './CartPaymentCard';

const Cart = () => {
    const {totalItems, total} = useSelector((state) => state.profile);
  return (
    <div>
        <h1>Your Cart</h1>
        <p>{totalItems} items in cart</p>


        <div>
            {
                total > 0 
                ? (<div>
                    {/* cart courses */}
                    <CartCard />
                    
                    {/* payment card */}
                    <CartPaymentCard />
                </div>)
                : (<div>
                    Your cart is empty
                </div>) 

            }
        </div>
    </div>
  )
}

export default Cart