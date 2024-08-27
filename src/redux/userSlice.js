// import { createSlice } from "@reduxjs/toolkit";
// import { jwtDecode } from "jwt-decode"


// const token = localStorage.getItem('user');
// let USER = null;
// if (token) {
//     const decodedToken = jwtDecode(token);
//     const currentTime = Date.now() / 1000;

//     if (decodedToken.exp < currentTime) {
//         localStorage.removeItem('token');
//         // Redirect to login or refresh token logic
//     }
// }
// try {
//   USER = token ? jwtDecode(token) : null;
  
// } catch (error) {
//   console.error("Invalid token:", error);
// }
// const initial_state={
//     user:USER || {}
// };
// const userSlice=createSlice({
//     name:'user',
//     initialState:initial_state,
//     reducers:{
//         setUserData:(state,action)=>{
//             state.user=action.payload;
//         },
//         clearUserData:(state)=>{
//             state.user={}
//         }
//     }
// })
// export const {setUserData,clearUserData}=userSlice.actions
// export default userSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import {jwtDecode} from "jwt-decode";

const token = localStorage.getItem('user');
let USER = null;

try {
    if (token) {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp < currentTime) {
            localStorage.removeItem('user');
            // You can dispatch clearUserData action here if needed.
            USER = null;
        } else {
            USER = decodedToken;
        }
    }
} catch (error) {
    console.error("Invalid token:", error);
    localStorage.removeItem('user'); // Ensure invalid tokens are removed
}

const initial_state = {
    user: USER || {}
};

const userSlice = createSlice({
    name: 'user',
    initialState: initial_state,
    reducers: {
        setUserData: (state, action) => {
            state.user = action.payload;
        },
        clearUserData: (state) => {
            state.user = {};
            localStorage.removeItem('user'); // Clear token on user data clear
        }
    }
});

export const { setUserData, clearUserData } = userSlice.actions;
export default userSlice.reducer;
