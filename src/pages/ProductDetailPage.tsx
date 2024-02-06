// src/pages/ProductDetailPage.tsx

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../services/productService";
import { Product } from "../types/Product";

const ProductDetailPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (productId) {
      // Verifica se `productId` não é `undefined`
      const loadProductDetails = async () => {
        try {
          setLoading(true);
          const productDetails = await fetchProductById(productId); // `productId` é garantido ser uma string aqui
          setProduct(productDetails);
        } catch (err) {
          setError("Falha ao buscar detalhes do produto");
          console.error(err); // Para fins de debug
        } finally {
          setLoading(false);
        }
      };

      loadProductDetails();
    }
  }, [productId]);

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error}</div>;
  if (!product) return <div>Produto não encontrado.</div>;

  return (
    <div className="product-detail-page">
      <h2>{product.name}</h2>
      <img src={product.photo} alt={product.name} />
      <p>Preço: ${product.price.toFixed(2)}</p>
      {/* Adicione mais detalhes conforme necessário */}
    </div>
  );
};

export default ProductDetailPage;
