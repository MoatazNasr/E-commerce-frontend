import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { publicRequest, userRequest } from "../utils/apiCallMethods.js";
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
      .catch(() => {
        thunkApi.dispatch(setErrorMessage("Invalid Credentials !!"));
      });
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

export const updateUser = createAsyncThunk(
  "user/updateUser",
  (formData, thunkApi) => {
    const state = thunkApi.getState((state) => state);
    const { token, id } = state.user;
    const api = userRequest(token);
    api
      .put(`/user/${id}`, formData)
      .then((res) => {
        const userData = res.data;
        thunkApi.dispatch(signIn({ token, ...userData }));
        thunkApi.dispatch(setSuccessfulMessage("Updated Successfully !!"));
      })
      .catch((err) => {
        thunkApi.dispatch(setErrorMessage(`${err.response.data} !!`));
      });
  }
);
export const refundUserMoney = createAsyncThunk(
  "user/refundUserMoney",
  (refundedMoney, thunkApi) => {
    const state = thunkApi.getState((state) => state);
    const { token, id ,wallet} = state.user;
    let tempWallet = wallet + refundedMoney;
    const api = userRequest(token);
    api
      .put(`/user/${id}`, {...state.user,wallet:tempWallet})
      .then((res) => {
        const userData = res.data;
        thunkApi.dispatch(signIn({ token, ...userData }));
        thunkApi.dispatch(setSuccessfulMessage("Order is canceled & money is refunded !!"));
      })
      .catch((err) => {
        thunkApi.dispatch(setErrorMessage(`${err.response.data} !!`));
      });
  }
)
const userSlice = createSlice({
  name: "user",
  initialState: {
    username: "",
    email: "",
    id: "",
    token: "",
    phoneNumber: "",
    wallet: 0,
  },
  reducers: {
    signIn: (state, action) => {
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.id = action.payload.id || action.payload._id;
      state.token = action.payload.token;
      state.phoneNumber = action.payload.phoneNumber;
      state.wallet = action.payload.wallet;
    },
    signOut: (state, action) => {
      state.username = "";
      state.email = "";
      state.id = "";
      state.token = "";
      state.phoneNumber = "";
      state.wallet = 0;
    },
  },
});

export const { signIn, signOut } = userSlice.actions;
export default userSlice.reducer;
