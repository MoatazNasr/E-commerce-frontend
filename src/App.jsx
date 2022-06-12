import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./containers/Home";
import Shop from "./containers/Shop";
import Wishlist from "./containers/Wishlist";
import Cart from "./containers/Cart";
import Checkout from "./containers/Checkout";
import { GlobalStyles } from "./styles/GlobalStyles";
import Product from "./containers/Product";
import Profile from "./containers/Profile";
import { useSelector, useDispatch } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import { setErrorMessage } from "./redux/errorMessageSlice";
import { setSuccessfulMessage } from "./redux/successfulMessageSlice";
function App() {
  const { successfulMessage, errorMessage, user } = useSelector(
    (state) => state
  );
  const [closeStatusMessage, setCloseStatusMessage] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (closeStatusMessage) {
      setTimeout(() => {
        dispatch(setErrorMessage(null));
        dispatch(setSuccessfulMessage(null));
      }, 750);
    }
  }, [closeStatusMessage]);
  useEffect(() => {
    if (errorMessage.errorMessage || successfulMessage.successfulMessage) {
      setCloseStatusMessage(false);
    }
  }, [errorMessage, successfulMessage]);
  return (
    <div className="App">
      <GlobalStyles />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
      {errorMessage.errorMessage && (
        <div
          className={`status-message error ${
            !closeStatusMessage ? "status-message-show" : "status-message-hide "
          }`}
        >
          <span>{errorMessage.errorMessage}</span>
          <button onClick={() => setCloseStatusMessage(true)}>
            <CloseIcon />
          </button>
        </div>
      )}
      {successfulMessage.successfulMessage && (
        <div
          className={`status-message successful ${
            !closeStatusMessage ? "status-message-show" : "status-message-hide "
          }`}
        >
          <span>{successfulMessage.successfulMessage}</span>
          <button onClick={() => setCloseStatusMessage(true)}>
            <CloseIcon />
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
