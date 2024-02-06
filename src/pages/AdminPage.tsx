// src/pages/AdminPage.tsx
import React, { useState } from "react";
import "../styles/_adminPage.sass";
import { Product } from "../types/Product";
import ProductForm from "../components/ProductForm";
import ProductListAdmin from "../components/ProductListAdmin";

const AdminPage: React.FC = () => {
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  return (
    <div className="admin-page">
      <h2>Gerenciamento do Cardápio da Hamburgueria</h2>
      <div className="admin-content">
        {editingProduct ? (
          <ProductForm
            product={editingProduct}
            onSave={() => setEditingProduct(null)}
          />
        ) : (
          <>
            <button
              className="add-product-btn"
              onClick={() => setEditingProduct({} as Product)}
            >
              Adicionar Novo Hambúrguer
            </button>
            <ProductListAdmin onEdit={setEditingProduct} />
          </>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
