import React from 'react';
import { ProductTableProps } from '../types/types';
import '@fortawesome/fontawesome-free/css/all.min.css';

const ProductTable: React.FC<ProductTableProps> = ({ products, setProducts, onEdit, isAdmin }) => {
  const getIconClass = (baseClass: string) => `${baseClass} ${isAdmin ? '' : 'disabled'}`;

  const handleDelete = (name: string) => {
    setProducts(products.filter(product => product.name !== name));
  };

  const handleDisable = (name: string) => {
    setProducts(products.map(product => product.name === name ? { ...product, disabled: !product.disabled } : product));
  };

  return (
    <table className="product-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Category</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Value</th>
          <th>Action</th>
        </tr> 
      </thead>
      <tbody>
        {products.map((product, index) => (
          <tr key={index} style={{ color: product.disabled ? '#808080' : undefined }}>
            <td>{product.name}</td>
            <td>{product.category}</td>
            <td>{product.price}</td>
            <td>{product.quantity}</td>
            <td>{product.value}</td>
            <td style={{ color: !isAdmin ? '#808080' : undefined }}>
              <span className={getIconClass('fas fa-edit')} onClick={() => isAdmin && onEdit(product.name)}></span>
              <span className={getIconClass('fas fa-eye')} onClick={() => isAdmin && handleDisable(product.name)}></span>
              <span className={getIconClass('fas fa-trash')} onClick={() => isAdmin && handleDelete(product.name)}></span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;
