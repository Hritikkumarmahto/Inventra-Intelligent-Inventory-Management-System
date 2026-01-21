// import axios from 'axios';
// import authService from './AuthService';

// const API_URL = 'http://localhost:8080/api/products/';

// class ProductService {
//   async getAllProducts() {
//     return axios.get(API_URL, { 
//       headers: authService.getAuthHeader() 
//     });
//   }

//   async getProductById(id) {
//     return axios.get(API_URL + id, { 
//       headers: authService.getAuthHeader() 
//     });
//   }

//   async createProduct(product) {
//     return axios.post(API_URL, product, { 
//       headers: authService.getAuthHeader() 
//     });
//   }

//   async updateProduct(id, product) {
//     return axios.put(API_URL + id, product, { 
//       headers: authService.getAuthHeader() 
//     });
//   }

//   async deleteProduct(id) {
//     return axios.delete(API_URL + id, { 
//       headers: authService.getAuthHeader() 
//     });
//   }

//   async searchProducts(name) {
//     return axios.get(API_URL + 'search?name=' + name, { 
//       headers: authService.getAuthHeader() 
//     });
//   }
// }

// export default new ProductService();

import axios from "axios";
import authService from "./AuthService";

const API_URL = "http://localhost:8080/api/products";

const authHeader = () => ({
  headers: {
    Authorization: "Bearer " + authService.getToken(),
  },
});

const getAllProducts = () =>
  axios.get(`${API_URL}`, authHeader());

const createProduct = (data) =>
  axios.post(`${API_URL}`, data, authHeader());

const updateProduct = (id, data) =>
  axios.put(`${API_URL}/${id}`, data, authHeader());

const deleteProduct = (id) =>
  axios.delete(`${API_URL}/${id}`, authHeader());

const stockIn = (id, qty) =>
  axios.post(`${API_URL}/stock-in`, { productId: id, quantity: qty }, authHeader());

const stockOut = (id, qty) =>
  axios.post(`${API_URL}/stock-out`, { productId: id, quantity: qty }, authHeader());

const searchProducts = (term) =>
  axios.get(`${API_URL}/search?name=${term}`, authHeader());

export default {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  stockIn,
  stockOut,
  searchProducts,
};

