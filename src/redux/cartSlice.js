import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { publicRequest, userRequest } from "../utils/apiCallMethods.js";
import checkProductInCart from "../utils/checkProductInCart.js";
import { setSuccessfulMessage } from "./successfulMessageSlice.js";
import { setErrorMessage } from "./errorMessageSlice.js";
export const createUserCart = createAsyncThunk(
  "user/cart",
  (userID, thunkApi) => {
    publicRequest
      .post("/cart", {
        userID,
      })
      .then(() => {
        window.localStorage.setItem("cartProducts", []);
      });
  }
);

export const getUserCart = createAsyncThunk(
  "getuser/cart",
  (user, thunkApi) => {
    const { token, id } = user;
    const api = userRequest(token);
    api.get(`/cart/${id}`).then((res) => {
      if (!window.localStorage.getItem("cartProducts")) {
        window.localStorage.setItem(
          "cartProducts",
          JSON.stringify(
            res.data.products.map((product) => {
              return {
                productID: product.productID,
                quantity: product.quantity,
                selectedSize: product.selectedSize,
                selectedColor: product.selectedColor,
                price: product.price,
              };
            })
          )
        );
      }
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
    const truthyValue = checkProductInCart(products, product);
    let tempProducts = [];
    let localProducts = JSON.parse(window.localStorage.getItem("cartProducts"));
    if (truthyValue) {
      localProducts = localProducts.map((filteredProduct) => {
        if (
          filteredProduct.productID === product._id &&
          filteredProduct.selectedSize === product.selectedSize &&
          filteredProduct.selectedColor === product.selectedColor
        ) {
          filteredProduct.quantity += 1;
        }
        return filteredProduct;
      });
      window.localStorage.setItem(
        "cartProducts",
        JSON.stringify(localProducts)
      );
      thunkApi.dispatch(setSuccessfulMessage("Product added to cart !!"));
    } else {
      tempProducts.push({ ...product, productID: product._id });
      tempProducts = products.concat(tempProducts);
      api
        .put(`/cart/${cartID}/${id}`, {
          userID: id,
          products: tempProducts,
        })
        .then((res) => {
          localProducts.push({
            productID: product._id,
            quantity: 1,
            selectedSize: product.selectedSize,
            selectedColor: product.selectedColor,
            price: product.price,
          });
          window.localStorage.setItem(
            "cartProducts",
            JSON.stringify(localProducts)
          );
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
  }
);

export const removeProductFromCart = createAsyncThunk(
  "removefrom/cart",
  (product, thunkApi) => {
    const state = thunkApi.getState();
    const { token, id } = state.user;
    const { cartID } = state.cart;
    const { productID, selectedSize, selectedColor } = product;
    const api = userRequest(token);
    let localProducts = JSON.parse(window.localStorage.getItem("cartProducts"));
    api
      .delete(
        `/cart/${cartID}/${productID}/${selectedSize}/${selectedColor}/${id}`
      )
      .then((res) => {
        let newFilteredStorage = localProducts.filter((filteredProduct) => {
          let filterIt = false;
          if (
            filteredProduct.selectedColor === selectedColor &&
            filteredProduct.selectedSize === selectedSize &&
            filteredProduct.productID === productID
          ) {
            filterIt = true;
          }
          if (!filterIt) {
            return filteredProduct;
          }
        });
        window.localStorage.setItem(
          "cartProducts",
          JSON.stringify(newFilteredStorage)
        );
        thunkApi.dispatch(
          removeFromCart({
            userID: res.data.userID,
            cartID: res.data._id,
            products: res.data.products,
          })
        );
        thunkApi.dispatch(setSuccessfulMessage("Product removed from cart !!"));
      })
      .catch(() => {
        thunkApi.dispatch(setErrorMessage("Try again !!"));
      });
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
