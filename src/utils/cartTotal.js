 const cartTotal = (cart) => {
    let total = 0;
    cart.products.forEach((product) => {
      total += (product.price*product.quantity);
    });
    return total;
  };

  export default cartTotal