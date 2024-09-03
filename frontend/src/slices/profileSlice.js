import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user : null,
    loading: false,
};

const userSlice = createSlice({
    name: "profile",
    initialState,
    reducers:{
        setUser(state, value)
        {
            state.user = value.payload;
        },
        setLoading(state, value){
            state.loading = value.payload;
        },

    }
});

export const {setUser, setLoading} = userSlice.actions;
export default userSlice.reducer;   