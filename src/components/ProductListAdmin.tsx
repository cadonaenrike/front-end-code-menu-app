import React, { useEffect, useState } from "react";
import { fetchProducts, deleteProduct } from "../services/productService";
import "../styles/_productListAdmin.sass"; // Importe estilos específicos da lista de produtos

import { Product } from "../types/Product"; // Importe os tipos

interface ProductListAdminProps {
  onEdit: (product: Product) => void;
}

const ProductListAdmin: React.FC<ProductListAdminProps> = ({ onEdit }) => {
  const [products, setProducts] = useState<Product[]>([]); // Defina o tipo do estado como Product[]

  useEffect(() => {
    async function fetchProductData() {
      const data: Product[] = await fetchProducts(); // Defina o tipo de 'data' como Product[]
      setProducts(data);
    }
    fetchProductData();
  }, []);
  const handleEdit = (product: Product) => {
    onEdit(product);
  };

  const handleDelete = async (id: string) => {
    await deleteProduct(id);
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
  };

  return (
    <div className="product-list-admin">
      <h3>Lista de Produtos</h3>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <img src={product.photo} alt={product.name} />
            <div>
              <h4>{product.name}</h4>
              <p>Preço: ${product.price}</p>
              <button onClick={() => handleEdit(product)}>Editar</button>
              <button onClick={() => handleDelete(product.id!)}>Excluir</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductListAdmin;
