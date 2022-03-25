import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// BASE URL
axios.defaults.baseURL = "http://localhost:3001/";

// GET PRODUCTS
const getProduct = createAsyncThunk(
  "product/getProduct",
  async (credentials) => {
    try {
      const { data } = await axios.get("/products", credentials);

      console.log(data);
      return data;
    } catch (error) {
      return console.log(error.message);
    }
  }
);

// ADD CONTACT
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
// DELETE CONTACT
const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (credentials) => {
    try {
      const { data } = await axios.delete(
        `/products/${credentials}`,
        credentials
      );

      return data;
    } catch (error) {
      return console.log(error.message);
    }
  }
);
// UPDATE CONTACT
const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async ({ id, updatedContact }) => {
    try {
      const { data } = await axios.patch(`products/${id}`, updatedContact);

      return data;
    } catch (error) {
      return console.error(error);
    }
  }
);
const productAction = {
  addProduct,
  getProduct,
  deleteProduct,
  updateProduct,
};
export default productAction;
