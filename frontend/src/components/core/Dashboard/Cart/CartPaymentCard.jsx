import React from 'react'
import { useSelector } from 'react-redux';


const CartPaymentCard = () => {

    const {total, cart} = useSelector((state) => state.cart);

    function handleSubmit()
    {
        console.log("Course are now purchased");
    }

    return (
    <div>
        <p>Total: </p>
        <p>Rs TOTAL_PRICE</p>

        <button onClick={handleSubmit}>Buy Now</button>

    </div>
  )
}

export default CartPaymentCard