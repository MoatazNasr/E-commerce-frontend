const productQuantity = (cartProducts, product) => {
  let quantityChanged= false;  
  let newProducts = cartProducts.map((cartProduct) => {
    if (
      cartProduct.selectedSize === product.selectedSize &&
      cartProduct.productID === product._id &&
      cartProduct.price === product.price &&
      cartProduct.selectedColor === product.selectedColor
    ) {
      const newObj = Object.assign({}, cartProduct);  
       newObj.quantity += 1 ;
       quantityChanged= true;
       return newObj;
    }
    else return cartProduct;
  });
    return {newProducts,quantityChanged};
};

export default productQuantity;
