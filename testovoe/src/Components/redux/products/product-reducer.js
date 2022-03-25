import { createSlice, createReducer } from "@reduxjs/toolkit";

import productOperations from "./product-actions";
import JsonItems from "../../../db.json";

const initialState = {
  products: JsonItems.products,
  isFetching: "done",
};

const productReducer = createSlice({
  name: "products",
  initialState,
  extraReducers: {
    [productOperations.addProduct](state, action) {
      state.products = action.payload;
      state.isFetching = "done";
    },
    [productOperations.deleteProduct](state, action) {
      state.products = state.products.filter((i) => i.id !== action.payload);
      state.isFetching = "done";
    },
  },
});

export default productReducer.reducer;
