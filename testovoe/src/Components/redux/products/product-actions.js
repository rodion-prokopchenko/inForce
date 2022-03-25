import axios from "axios";
import { createAction, createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://http://localhost:3001/products/";

// GET CONTACT
const getProducts = createAsyncThunk(
  "product/getProduct",
  async (credentials) => {
    try {
      const { data } = await axios.get("/products", credentials);

      return data;
    } catch (error) {
      return console.log(error.message);
    }
  }
);

// // ADD CONTACT
// const addContact = createAsyncThunk(
//   "contact/addContact",
//   async (credentials) => {
//     try {
//       const { data } = await axios.post("/contacts", credentials);
//       console.log(credentials);
//       console.log(data);

//       return data;
//     } catch (error) {
//       return console.log(error.message);
//     }
//   }
// );

// // DELETE CONTACT
// const deleteContact = createAsyncThunk(
//   "contact/deleteContact",
//   async (contactId) => {
//     try {
//       await axios.delete(`/contacts/${contactId}`);
//     } catch (error) {
//       return console.log(error.message);
//     }
//   }
// );

// // RETURN DELETED CONTACT
// const returnDeletedContact = createAsyncThunk(
//   "returnedContact/returnDeletedContact",
//   async ({ reternedContact, index }) => {
//     try {
//       const { data } = await axios.post("/contacts", reternedContact, index);

//       return data;
//     } catch (error) {
//       return console.error(error);
//     }
//   }
// );

// // UPDATE CONTACT
// const updateContact = createAsyncThunk(
//   "updateContact/sendUpdatedContact",
//   async ({ id, updatedContact, index }) => {
//     try {
//       const { data } = await axios.patch(
//         `contacts/${id}`,
//         updatedContact,
//         index
//       );

//       return data;
//     } catch (error) {
//       return console.error(error);
//     }
//   }
// );

// // CHANGEFILTER
// const changeFilter = createAction("filter/change");

const contactOperations = {
  getProducts,
};
export default contactOperations;
