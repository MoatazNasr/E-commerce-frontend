import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { publicRequest, userRequest } from "../utils/apiCallMethods.js";
import { setSuccessfulMessage } from "./successfulMessageSlice.js";
import { setErrorMessage } from "./errorMessageSlice.js";
export const createUserWishlist = createAsyncThunk(
  "user/wishlist",
  (userID, thunkApi) => {
    publicRequest.post("/wishlist", {
      userID,
    });
  }
);

export const getUserWishlist = createAsyncThunk(
  "getuser/wishlist",
  (user, thunkApi) => {
    const { token, id } = user;
    const api = userRequest(token);
    api.get(`/wishlist/${id}`).then((res) => {
      thunkApi.dispatch(
        addToWishlist({
          userID: id,
          wishlistID: res.data._id,
          products: res.data.products,
        })
      );
    });
  }
);

export const addProductToWishlist = createAsyncThunk(
  "addto/wishlist",
  (product, thunkApi) => {
    const state = thunkApi.getState();
    const { token, id } = state.user;
    const { products, wishlistID } = state.wishlist;
    const api = userRequest(token);
    let tempProducts = [];
    tempProducts.push({ ...product, productID: product._id });
    tempProducts = products.concat(tempProducts);
    api
      .put(`/wishlist/${wishlistID}/${id}`, {
        userID: id,
        products: tempProducts,
      })
      .then((res) => {
        thunkApi.dispatch(
          addToWishlist({
            userID: res.data.userID,
            wishlistID: res.data._id,
            products: res.data.products,
          })
        );
        thunkApi.dispatch(setSuccessfulMessage("Product added to wishlist !!"));
      })
      .catch(() => {
        thunkApi.dispatch(setErrorMessage("Try again !!"));
      });
  }
);

export const removeProductFromWishlist = createAsyncThunk(
  "removefrom/wishlist",
  (productID, thunkApi) => {
    const state = thunkApi.getState();
    const { token, id } = state.user;
    const { wishlistID } = state.wishlist;
    const api = userRequest(token);
    api
      .delete(`/wishlist/${wishlistID}/${productID}/${id}`)
      .then((res) => {
        thunkApi.dispatch(
          removeFromWishlist({
            userID: res.data.userID,
            wishlistID: res.data._id,
            products: res.data.products,
          })
        );
        thunkApi.dispatch(
          setSuccessfulMessage("Product removed from wishlist !!")
        );
      })
      .catch(() => {
        thunkApi.dispatch(setErrorMessage("Try again !!"));
      });
  }
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    userID: "",
    wishlistID: "",
    products: [],
  },
  reducers: {
    addToWishlist: (state, action) => {
      state.userID = action.payload.userID;
      state.wishlistID = action.payload.wishlistID;
      state.products = action.payload.products;
    },
    removeFromWishlist: (state, action) => {
      state.userID = action.payload.userID;
      state.wishlistID = action.payload.wishlistID;
      state.products = action.payload.products;
    },
    removeWishlist: (state, action) => {
      state.wishlistID = "";
      state.userID = "";
      state.products = [];
    },
  },
});

export const { addToWishlist, removeFromWishlist, removeWishlist } =
  wishlistSlice.actions;
export default wishlistSlice.reducer;
