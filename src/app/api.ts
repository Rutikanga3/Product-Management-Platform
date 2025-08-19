import axios from 'axios';
import type { Product, ProductsResponse } from '../types/product';
import type { CartsResponse, Cart, AddCartRequest, UpdateCartRequest } from '../types/cart';

const api = axios.create({
    baseURL: 'https://dummyjson.com',
    timeout: 10000, 
    headers: {
        'Content-Type': 'application/json',
    }
})



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
