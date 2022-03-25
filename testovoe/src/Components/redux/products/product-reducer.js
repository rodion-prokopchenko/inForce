import { createSlice, createReducer } from "@reduxjs/toolkit";

import productOperations from "./product-actions";

const initialState = {
  products: [],
  isFetching: "done",
};

// export const filter = createReducer("", {
//   [contactOperations.changeFilter]: (_, action) => action.payload,
// });

const productReducer = createSlice({
  name: "products",
  initialState,
  extraReducers: {
    [productOperations.addProduct](state, action) {
      state.products = action.payload;
      state.isFetching = "done";
    },
    [productOperations.deleteProduct](state, action) {
      state.products = action.payload;
      state.isFetching = "done";
    },
  },
});

export default productReducer.reducer;
