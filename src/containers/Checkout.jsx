import React,{useEffect} from "react";
import {Elements } from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from "../components/CheckoutForm";
import {useNavigate} from 'react-router-dom';
import {setErrorMessage} from '../redux/errorMessageSlice';
import { useSelector ,useDispatch} from "react-redux";
const stripePromise =loadStripe("pk_test_51KWVT4CfVFZCKcENjcgn1RvUslbvj1fbQJCIeRlSerPfMn1rjoF79kX4rRRuYy1YoKjnKS3F2RL6WMgepiPEbhM000rjtT8Gm4");
const Checkout = () => {
  const user = useSelector((state)=>state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(()=>{
    if(user.token === ''){
      navigate(-1);
      dispatch(setErrorMessage('Please Login to continue'));
    }
  })
  return (
    <Elements stripe={stripePromise}>
    <CheckoutForm/>
    </Elements>
  );
};

export default Checkout;
