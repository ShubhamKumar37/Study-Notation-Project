import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";


const initialState = {
    totalItems: localStorage.getItem("totalItems") ? JSON.parse(localStorage.getItem("totalItems")) : 0,
    cart: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [],
    total: localStorage.getItem("total") ? JSON.parse(localStorage.getItem("total")) : 0,
};

const cartSlice = createSlice(
    {
        name: "cart",
        initialState,
        reducers:
        {
            addToCart: (state, value) => {
                const course = value.payload;
                const index = state.cart.findIndex((item) => item._id === course._id);

                if (index >= 0) {
                    toast.success("Item already exist in cart");
                    return;
                }

                state.cart.push(course);
                state.totalItems++;
                state.total += course.price;

                localStorage.setItem("cart", JSON.stringify(state.cart));
                localStorage.setItem("total", JSON.stringify(state.total));
                localStorage.setItem("totalItems", JSON.stringify(state.totalItems));

                toast.success("Item added successfully");
            },

            removeFromCart: (state, value) => {
                const courseId = value.payload;
                const index = state.cart.findIndex((item) => item._id === courseId);

                if (index >= 0) {
                    state.totalItems--;
                    state.cart.splice(index, 1);
                    state.total -= state.cart[index].price;

                    localStorage.setItem("cart", JSON.stringify(state.cart));
                    localStorage.setItem("total", JSON.stringify(state.total));
                    localStorage.setItem("totalItems", JSON.stringify(state.totalItems));

                    toast.success("Item remove successfully");

                }
            },

            resetCart: (state) => {
                state.cart = [];
                state.total = 0;
                state.totalItems = 0;

                localStorage.removeItem("cart");
                localStorage.removeItem("totalItems");
                localStorage.removeItem("total");

                toast.success("Cart is empty now!!!!!");
            }
        }
    }
);

export const { setTotalItems, removeFromCart, resetCart } = cartSlice.actions;
export default cartSlice.reducer;