import React, { useState, useEffect } from "react";
import { fetchProducts } from "../services/productService";
import { fetchCategories } from "../services/categoryService"; // Importe sua função fetchCategories
import ProductCard from "./ProductCard";
import "../styles/index.sass";
import { Product, Category } from "../types/Product";

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const fetchedProducts: Product[] = await fetchProducts();
        const fetchedCategories: Category[] = await fetchCategories();
        setProducts(fetchedProducts);
        setCategories(fetchedCategories);
      } catch (err) {
        setError("Falha ao buscar dados");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const filterProducts = selectedCategory
    ? products.filter((product) => product.category_id === selectedCategory)
    : products;

  if (loading) return <div>Carregando...</div>;
  if (error)
    return (
      <div>
        Erro: {error}
        <button onClick={() => window.location.reload()}>
          Tentar novamente
        </button>
      </div>
    );

  return (
    <div className="product-list-page">
      <div className="category-buttons">
        <button onClick={() => setSelectedCategory(null)}>Todos</button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.name)}
          >
            {category.name}
          </button>
        ))}
      </div>
      <div className="product-list">
        {filterProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
