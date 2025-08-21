import axios from 'axios';
import type { Product, ProductsResponse } from '../types/product';
import type { CartsResponse, Cart, AddCartRequest, UpdateCartRequest } from '../types/cart';
import type { User } from '../types/user';

const api = axios.create({
    baseURL: 'https://dummyjson.com',
    timeout: 10000, 
    headers: {
        'Content-Type': 'application/json',
    }
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Handle unauthorized errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("Unauthorized: Token is missing or invalid.");
      // Optionally, redirect to the login page or refresh the token
    }
    return Promise.reject(error);
  }
);

export const fetchProducts = (q?: string) => q ? api.get<ProductsResponse>(`/products/search?q=${q}`) : api.get<ProductsResponse>("/products");

export const fetchProductById = (id: number) => api.get<Product>(`/products/${id}`);

export const updateProduct = (id: number, data: Partial<Product>) => api.put<Product>(`/products/${id}`, data);

export const deleteProduct = (id: number) => api.delete(`/products/${id}`);

export const fetchCategories = () => api.get<string[]>("/products/category-list");

export const fetchProductsByCategory = (category: string) => api.get<ProductsResponse>(`/products/category/${category}`);

export const createProduct = (data: Partial<Product>) => api.post<Product>("/products/add", data);

// Carts
export const fetchCarts = () => api.get<CartsResponse>("/carts");
export const fetchCartById = (id: number) => api.get<Cart>(`/carts/${id}`);
export const addCart = (payload: AddCartRequest) => api.post<Cart>("/carts/add", payload);
export const updateCart = (id: number, payload: UpdateCartRequest) => api.put<Cart>(`/carts/${id}`, payload);
export const deleteCart = (id: number) => api.delete<{ isDeleted: boolean; id: number }>(`/carts/${id}`);

//Authentication

export const fetchLoginUser = async (credentials: { username: string; password: string }) => {
  const response = await api.post<{ token: string; user: User }>('/auth/login', credentials);
  localStorage.setItem('authToken', response.data.token);

  return response.data.user; 
};
export const fetchCurrentUser =()=>api.get<User>('/auth/me');

export const fetchRefreshAuth =()=>api.get<User>('/auth/refresh');