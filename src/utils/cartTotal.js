let products = JSON.parse(window.localStorage.getItem("cartProducts"));
window.addEventListener('click', () => {
  products = JSON.parse(window.localStorage.getItem("cartProducts"));
})
const cartTotal = () => {
  let total = 0;
  products.forEach((product) => {
    total = total + (product.quantity * product.price);
    console.log(product.price)
  });
  return total;
};

export default cartTotal;
