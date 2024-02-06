// src/services/productService.ts

import { Product } from "../types/Product";
import api from "./axiosConfig";

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await api.get("/product");
  return response.data;
};

export const fetchProductById = async (id: string): Promise<Product> => {
  const response = await api.get(`/product/${id}`);
  return response.data;
};

export const createProduct = async (product: Product): Promise<Product> => {
  const response = await api.post("/product/", product);
  return response.data;
};

export const updateProduct = async (
  id: string,
  product: Partial<Product>
): Promise<Product> => {
  const response = await api.patch(`/product/${id}`, product);
  return response.data;
};

export const deleteProduct = async (id: string): Promise<void> => {
  await api.delete(`/product/${id}`);
};
