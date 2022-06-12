import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { publicRequest } from "../utils/apiCallMethods.js";
import jwtDecode from "jwt-decode";
import { removeCart } from "./cartSlice.js";
import { removeWishlist } from "./wishlistSlice.js";
import { setSuccessfulMessage } from "./successfulMessageSlice.js";
import { setErrorMessage } from "./errorMessageSlice.js";
export const signinUser = createAsyncThunk(
  "user/signIn",
  (formData, thunkApi) => {
    publicRequest
      .post("/user/login", {
        ...formData,
      })
      .then((res) => {
        const token = res.data;
        thunkApi.dispatch(signIn({ token, ...jwtDecode(res.data) }));
        thunkApi.dispatch(setSuccessfulMessage("Welcome !!"));
      })
      .catch(()=>{
        thunkApi.dispatch(setErrorMessage("Invalid Credentials !!"));
      })
  }
);

export const signoutUser = createAsyncThunk(
  "user/signout",
  (dummy, thunkApi) => {
    thunkApi.dispatch(signOut());
    thunkApi.dispatch(removeCart());
    thunkApi.dispatch(removeWishlist());
  }
);


const userSlice = createSlice({
  name: "user",
  initialState: {
    username: "",
    email: "",
    id: "",
    token: "",
  },
  reducers: {
    signIn: (state, action) => {
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.id = action.payload.id;
      state.token = action.payload.token;
    },
    signOut: (state, action) => {
      state.username = "";
      state.email = "";
      state.id = "";
      state.token = "";
    },
  },
});

export const { signIn, signOut } = userSlice.actions;
export default userSlice.reducer;
