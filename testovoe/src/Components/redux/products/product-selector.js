const getProducts = (state) => state.products.products;

const getFetching = (state) => state.products.isFetching;

const getSortOrder = (state) => state.products.sort;

const productSelectors = {
  getProducts,
  getSortOrder,
  getFetching,
};
export default productSelectors;
