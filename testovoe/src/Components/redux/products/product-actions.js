import axios from "axios";
import { createAction, createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://http://localhost:3001/products/";

// ADD PRODUCT
const addProduct = createAsyncThunk(
  "product/addProduct",
  async (credentials) => {
    try {
      const { data } = await axios.post("/products", credentials);

      return data;
    } catch (error) {
      return console.log(error.message);
    }
  }
);

const contactOperations = {
  addProduct,
};
export default contactOperations;
