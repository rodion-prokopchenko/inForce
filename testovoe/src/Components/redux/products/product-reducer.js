import { createSlice, createReducer } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";

import productAction from "./product-actions";
// import JsonItems from "../../../db.json";

const initialState = {
  products: [],
  isFetching: "done",
};

const productReducer = createSlice({
  name: "products",
  initialState,
  extraReducers: {
    [productAction.getProduct.fulfilled](state, action) {
      state.products = action.payload;
      state.isFetching = "done";
    },
    [productAction.getProduct.pending](state, action) {
      state.isFetching = "pending";
    },
    [productAction.getProduct.rejected](state, _) {
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
      console.log(action);
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
      console.log("Успешно удалили");
    },
    [productAction.deleteProduct.pending](state, action) {
      console.log(action);

      state.isFetching = "pending";
    },
    [productAction.deleteProduct.rejected](state, _) {
      console.log("что-то не так");
      state.isFetching = "done";
    },

    // UPDATE
    [productAction.updateProduct.fulfilled](state, action) {
      console.log(state);
      state.contacts = action.payload;
      console.log(action);

      state.isFetching = "done";
    },
    [productAction.updateProduct.pending](state, action) {
      console.log(action.state);
      state.isFetching = "pending";
    },
    [productAction.updateProduct.rejected](state, _) {
      console.log("что-то пошло не так");
      state.isFetching = "done";
    },
  },
});

export default productReducer.reducer;
