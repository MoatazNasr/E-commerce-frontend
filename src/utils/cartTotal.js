const cartTotal = () => {
  let products = JSON.parse(window.localStorage.getItem("cartProducts"));
  let total = 0;
  products.forEach((product) => {
    total = total + (product.quantity * product.price);
  });
  return total;
};

export default cartTotal;
