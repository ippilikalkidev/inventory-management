import React, { useState, useEffect } from 'react';
import ProductTable from './components/ProductTable';
import StatCards from './components/StatCards'
import EditModal from './components/EditModal';
import { Product } from './types/types';
import {StatCardsData} from './types/types';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isAdmin, setIsAdmin] = useState<boolean>(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [currentProduct, setCurrentProduct] = useState<Product[] | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('https://dev-0tf0hinghgjl39z.api.raw-labs.com/inventory');
      if (!response.ok) {
        console.error('Failed to fetch products');
        return;
      }
      const data: Product[] = await response.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);


  function toggleRole() {
    setIsAdmin(!isAdmin);
  }
  
  const handleEdit = (name: string) => {
    setCurrentProduct(products.filter(product => product.name === name));
    setIsEditModalOpen(true);
  };

  const handleDelete = (name: string) => {
    setProducts(products.filter(product => product.name !== name));
  };

  const handleDisable = (name: string) => {
    setProducts(products.map(product => product.name === name ? { ...product, disabled: !product.disabled } : product));
  };

  const handleModalSave = (updatedProduct: Product) => {
    setProducts(products.map(product => product.name === updatedProduct.name ? updatedProduct : product));
    setIsEditModalOpen(false);
  };

  const closeModal = () => setIsEditModalOpen(false);

  const statCardsData: StatCardsData = {
    totalProducts: products.length,
    totalStoreValue: products.reduce((acc, product) => acc + (parseInt(product.price.replace("$","")) * product.quantity), 0),
    outOfStock: products.filter(product => product.quantity === 0).length,
    categories: [...new Set(products.map(product => product.category))].length,
  };
  
  <StatCards statCardsData={statCardsData} />
  

  return (
    <div className="inventory-stats-container">
      <div className="header">
        <h2>Inventory stats</h2>
        <div className="role-toggle">
          <span className="role-label">Admin</span>
          <i className={`fas ${isAdmin ? "fa-toggle-on" : "fa-toggle-off"}`} onClick={toggleRole}></i>
          <span className="role-label">User</span>
        </div>
      </div>
      <StatCards statCardsData={statCardsData} />
      <ProductTable products={products} onDelete={handleDelete} onDisable={handleDisable} onEdit={handleEdit} isAdmin={isAdmin}/>

      {isEditModalOpen && currentProduct && (
        <EditModal
          product={currentProduct[0]}
          onSave={handleModalSave}
          onClose={closeModal}
        />
      )}
    </div>
  );
}

export default App;
