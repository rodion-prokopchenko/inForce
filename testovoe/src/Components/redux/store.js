import productReducer from "./products/product-reducer";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    products: productReducer,
  },
});

export default store;
