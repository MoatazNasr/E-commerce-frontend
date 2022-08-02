const checkProductInCart = (cartProducts, product) => {
  let truthyValue = false;
  cartProducts.forEach((productX) => {
    if (
      productX.productID === product._id &&
      productX.selectedSize === product.selectedSize &&
      productX.selectedColor === product.selectedColor
    )
      truthyValue = true;
  });
  return truthyValue;
};

export default checkProductInCart;
