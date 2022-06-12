const checkWishlist = (wishlist,productPageID) => {
  const value = wishlist.some((product) => {
    if (product._id === productPageID) return true;
    else return false;
  });
  return value;
};

export default checkWishlist;