const filterProducts = (products, filters) => {
  let filteredProducts = [];
  products.forEach((product) => {
    let colors, sizes, prices, categories;
    colors = sizes = prices = categories = true;
    if (Object.values(filters)[0].length > 0)
      colors = Object.values(filters)[0].some((color) =>
        product.details.some((productDetails) => productDetails.color === color)
      );
    if (Object.values(filters)[1].length > 0)
      sizes = Object.values(filters)[1].some((size) =>
        product.details.some((productDetails) =>
          productDetails.sizes.some(
            (productDetailsObj) => productDetailsObj.size === size
          )
        )
      );
    if (Object.values(filters)[2].length > 0)
      prices = Object.values(filters)[2].some(
        (filteredPrice) => product.price <= filteredPrice
      );
    if (Object.values(filters)[3].length > 0) categories = Object.values(filters)[3].some(
        (filteredCategory) => product.category === filteredCategory
      );    
    if (colors && sizes && prices && categories) filteredProducts.push(product);
  });
  return filteredProducts;
};
export default filterProducts;