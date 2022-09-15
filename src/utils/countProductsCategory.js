const countProductsCategories = (products, newProduct) => {
  let categoryObject = {
    Jackets: 0,
    Hoodies: 0,
    Coats: 0,
    Dresses: 0,
    Footwear: 0,
    Trousers: 0,
  };
  products.forEach((product) => {
    if (newProduct) {
      if (product.feature === "new") {
        categoryObject[product.category] += 1;
      }
    } else {
      if (product.feature !== "new") {
        categoryObject[product.category] += 1;
      }
    }
  });
  return categoryObject;
};

export default countProductsCategories;
