import React from 'react'
import { useSelector } from 'react-redux'
import ReactStars from 'react-stars';
import { MdStar } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";

const CartCard = () => {

    const { cart } = useSelector((state) => state.cart);


    return (
        <div>
            {
                cart.map((course, index) => {
                    return(
                    <div>
                        <div>
                            <img src={course?.thumbnail} width={100} height={100} />
                        </div>
                        <div>
                            <h1>{course?.courseName}</h1>
                            <h1>{course?.courseDescription.substr(0, 30)}...</h1>

                            <div>
                                <p>RATING 4.5</p>
                                <ReactStars 
                                    count={5}
                                    size={20}
                                    edit={false}
                                    activeColor="#ffd7800"
                                    emptyIcon={<MdStar />}
                                    fullIcon={<MdStar />}
                                />
                            </div>
                            <p>REVIEW COUNT</p>
                            <p>TAGS MAY BE NOT REQUIRED MUCH</p>
                        </div>

                        <div>
                            <div>
                                <button>
                                    <RiDeleteBinLine />
                                    Remove
                                </button>
                            </div>
                            <div>
                                Rs. PRICE
                            </div>
                        </div>
                    </div>)
                })
            }
        </div>
    )
}

export default CartCard