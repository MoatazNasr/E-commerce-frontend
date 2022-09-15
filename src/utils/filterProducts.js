const filterProducts = (products, filters) => {
  let filteredProducts = [];
  products.forEach((product) => {
    let c, s, p;
    c = s = p = true;
    if (Object.values(filters)[0].length > 0)
      c = Object.values(filters)[0].some((color) =>
        product.details.some((productDetails) => productDetails.color === color)
      );
    if (Object.values(filters)[1].length > 0)
      s = Object.values(filters)[1].some((size) =>
        product.details.some((productDetails) =>
          productDetails.sizes.some(
            (productDetailsObj) => productDetailsObj.size === size
          )
        )
      );
    if (Object.values(filters)[2].length > 0)
      p = Object.values(filters)[2].some(
        (filteredPrice) => product.price <= filteredPrice
      );
    if (c && s && p) filteredProducts.push(product);
  });
  return filteredProducts;
};
export default filterProducts;