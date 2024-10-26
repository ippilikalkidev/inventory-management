import React, { useState, useEffect } from 'react';
import ProductTable from './components/ProductTable';
import StatCards from './components/StatCards'
import EditModal from './components/EditModal';
import { Product } from './types/types';
import {StatCardsData} from './types/types';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Loader from './components/Loader';
import ErrorBanner from './components/ErrorBanner';
import './App.css';

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [currentProduct, setCurrentProduct] = useState<Product[] | null>(null);

  useEffect(() => {
    setIsLoading(true);
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://dev-0tf0hinghgjl39z.api.raw-labs.com/inventory');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data: Product[] = await response.json();
        setIsLoading(false);
        setProducts(data);
        setError(null);
      } catch (error) {
        setIsLoading(false);
        setError('There was an error fetching the product data.');
      }
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

  // const handleDelete = (name: string) => {
  //   setProducts(products.filter(product => product.name !== name));
  // };

  // const handleDisable = (name: string) => {
  //   setProducts(products.map(product => product.name === name ? { ...product, disabled: !product.disabled } : product));
  // };

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
      {isLoading ? <Loader /> : error ? <ErrorBanner message={error} /> : (
      <>
        <StatCards statCardsData={statCardsData} />
        <ProductTable products={products} setProducts={setProducts} onEdit={handleEdit} isAdmin={isAdmin}/>

        {isEditModalOpen && currentProduct && (
          <EditModal
            product={currentProduct[0]}
            onSave={handleModalSave}
            onClose={closeModal}
          />
        )}
      </> )}
    </div>
  );
}

export default App;
