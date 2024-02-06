import { Category } from "../types/Product";
import api from "./axiosConfig";

export const fetchCategories = async (): Promise<Category[]> => {
  const response = await api.get("/category");
  console.log(response);
  return response.data;
};

// Função para criar uma nova categoria
export const createCategory = async (name: string): Promise<Category> => {
  const response = await api.post("/category", { name });
  return response.data;
};
