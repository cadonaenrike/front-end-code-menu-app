// src/components/ProductForm.tsx

import React, { useState, useEffect } from "react";
import { createProduct, updateProduct } from "../services/productService";
import { createCategory, fetchCategories } from "../services/categoryService";
import "../styles/_productForm.sass";
import { Product, Category } from "../types/Product";

interface ProductFormProps {
  product: Product | null;
  onSave: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ product, onSave }) => {
  const [formData, setFormData] = useState<Product>({
    name: "",
    qty: 0,
    price: 0.0,
    photo: "",
    category_id: null, // Agora a categoria é representada por category_id
  });

  const [categoryOptions, setCategoryOptions] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  );

  useEffect(() => {
    // Busque as categorias ao carregar o formulário
    fetchCategories()
      .then((categories) => {
        setCategoryOptions(categories);
      })
      .catch((error) => {
        console.error("Erro ao buscar categorias:", error);
      });
  }, [product]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategoryId(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Configure a categoria no formData
    formData.category_id = selectedCategoryId;

    if (product) {
      console.log(formData);
      await createProduct(formData);
    } else {
      console.log(formData);
      await updateProduct("formData.id!", formData);
    }
    onSave();
  };

  return (
    <div className="product-form">
      <h3>{product ? "Editar Produto" : "Adicionar Novo Produto"}</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="category">Categoria</label>
          <select
            id="category"
            name="category"
            value={selectedCategoryId || ""}
            onChange={handleCategoryChange}
          >
            <option value="">Selecione uma Categoria</option>
            {categoryOptions.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="name">Nome</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="qty">Quantidade</label>
          <input
            type="number"
            id="qty"
            name="qty"
            value={formData.qty}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Preço (em R$)</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            step={0.01}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="photo">URL da Imagem</label>
          <input
            type="url"
            id="photo"
            name="photo"
            value={formData.photo}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">
          {product ? "Salvar Alterações" : "Adicionar Produto"}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
