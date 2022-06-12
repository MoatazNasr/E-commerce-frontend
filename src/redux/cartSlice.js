import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { publicRequest, userRequest } from "../utils/apiCallMethods.js";
import productQuantity from "../utils/productQuantity.js";
import { setSuccessfulMessage } from "./successfulMessageSlice.js";
import { setErrorMessage } from "./errorMessageSlice.js";
export const createUserCart = createAsyncThunk(
  "user/cart",
  (userID, thunkApi) => {
    publicRequest.post("/cart", {
      userID,
    });
  }
);

export const getUserCart = createAsyncThunk(
  "getuser/cart",
  (user, thunkApi) => {
    const { token, id } = user;
    const api = userRequest(token);
    api.get(`/cart/${id}`).then((res) => {
      thunkApi.dispatch(
        addToCart({
          userID: id,
          cartID: res.data._id,
          products: res.data.products,
        })
      );
    });
  }
);

export const addProductToCart = createAsyncThunk(
  "addto/cart",
  (product, thunkApi) => {
    const state = thunkApi.getState();
    const { token, id } = state.user;
    const { products, cartID } = state.cart;
    const api = userRequest(token);
    const incProductQuantity = productQuantity(products, product);
    let tempProducts = [];
    if (incProductQuantity.quantityChanged) {
      tempProducts = incProductQuantity.newProducts;
    } else {
      tempProducts.push({ ...product, productID: product._id });
      tempProducts = products.concat(tempProducts);
    }
    api
      .put(`/cart/${cartID}/${id}`, {
        userID: id,
        products: tempProducts,
      })
      .then((res) => {
        thunkApi.dispatch(
          addToCart({
            userID: id,
            cartID: res.data._id,
            products: res.data.products,
          })
        );
        thunkApi.dispatch(setSuccessfulMessage("Product added to cart !!"));
      })
      .catch(() => {
        thunkApi.dispatch(setErrorMessage("Try again !!"));
      });
  }
);

export const productQuantityInCart = createAsyncThunk(
  "quantityofaproduct/cart",
  (product, thunkApi) => {
    const state = thunkApi.getState();
    const { id ,token} = state.user;
    const { products, cartID } = state.cart;
    const api = userRequest(token);
    const tempProducts = products.map((productX) => {
      let immutableProduct = Object.assign({}, productX);
      if (
        productX.productID === product.id &&
        productX.selectedSize === product.size &&
        productX.selectedColor === product.color
      ) {
        immutableProduct.quantity = product.productQuantity;
      }
      return immutableProduct;
    });
    thunkApi.dispatch(
      addToCart({
        userID: id,
        cartID: cartID,
        products: tempProducts,
      })
    );
  }
);

export const removeProductFromCart = createAsyncThunk(
  "removefrom/cart",
  (product, thunkApi) => {
    const state = thunkApi.getState();
    const { token, id } = state.user;
    const { cartID } = state.cart;
    const { productID, size, color } = product;
    const api = userRequest(token);
    api
      .delete(`/cart/${cartID}/${productID}/${size}/${color}/${id}`)
      .then((res) => {
        thunkApi.dispatch(
          removeFromCart({
            userID: res.data.userID,
            cartID: res.data._id,
            products: res.data.products,
          })
        );
        thunkApi.dispatch(setSuccessfulMessage("Product removed from cart !!"));
      }).catch(()=>{
        thunkApi.dispatch(setErrorMessage("Try again !!"));
      })
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    userID: "",
    cartID: "",
    products: [],
  },
  reducers: {
    addToCart: (state, action) => {
      state.userID = action.payload.userID;
      state.cartID = action.payload.cartID;
      state.products = action.payload.products;
    },
    removeFromCart: (state, action) => {
      state.userID = action.payload.userID;
      state.cartID = action.payload.cartID;
      state.products = action.payload.products;
    },
    removeCart: (state, action) => {
      state.cartID = "";
      state.userID = "";
      state.products = [];
    },
  },
});

export const { addToCart, removeFromCart, removeCart } = cartSlice.actions;
export default cartSlice.reducer;
