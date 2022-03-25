import { createSlice } from "@reduxjs/toolkit";

import productAction from "./product-actions";

const initialState = {
  products: [],
  isFetching: "done",
  sort: "asc",
};

const productReducer = createSlice({
  name: "products",
  initialState,
  extraReducers: {
    // CHANGE SORT
    [productAction.changeSortOrder]: (state, action) =>
      void (state.sort = action.payload),
    // GET
    [productAction.getProducts.fulfilled](state, action) {
      state.products = action.payload;
      state.isFetching = "done";
    },
    [productAction.getProducts.pending](state, action) {
      state.isFetching = "pending";
    },
    [productAction.getProducts.rejected](state, _) {
      console.log("что-то не так с фетчингом");
      state.isFetching = "done";
    },

    // ADD
    [productAction.addProduct.fulfilled](state, action) {
      {
        action.payload
          ? state.products.unshift(action.payload)
          : state.products.unshift(action.meta.arg);
      }
      state.isFetching = "done";
    },
    [productAction.addProduct.pending](state, action) {
      state.isFetching = "pending";
    },
    [productAction.addProduct.rejected](state, action) {
      console.log("что-то не так с добавлением");
      state.isFetching = "done";
    },

    // DELETE
    [productAction.deleteProduct.fulfilled](state, action) {
      state.products = state.products.filter(
        (products) => products.id !== action.meta.arg
      );
      state.isFetching = "done";
    },
    [productAction.deleteProduct.pending](state, action) {
      state.isFetching = "pending";
    },
    [productAction.deleteProduct.rejected](state, _) {
      console.log("что-то не так");
      state.isFetching = "done";
    },

    // UPDATE
    [productAction.updateProduct.fulfilled](state, action) {
      state.contacts = action.payload;

      state.isFetching = "done";
    },
    [productAction.updateProduct.pending](state, action) {
      state.isFetching = "pending";
    },
    [productAction.updateProduct.rejected](state, _) {
      console.log("что-то пошло не так");
      state.isFetching = "done";
    },
  },
});

export default productReducer.reducer;
