import axios from 'axios';
import type { Product, ProductsResponse } from '../types/product';

const api = axios.create({
    baseURL: 'https://dummyjson.com',
    timeout: 10000, // 10 second timeout
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
