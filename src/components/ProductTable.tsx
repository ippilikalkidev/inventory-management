import React from 'react';
import { Product, ProductTableProps } from '../types/types';
import '@fortawesome/fontawesome-free/css/all.min.css';

const ProductTable: React.FC<ProductTableProps> = ({ products, onDelete, onDisable, onEdit, isAdmin }) => {
  const getIconClass = (baseClass: string) => `${baseClass} ${isAdmin ? '' : 'disabled'}`;

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
              <span className={getIconClass('fas fa-eye')} onClick={() => isAdmin && onDisable(product.name)}></span>
              <span className={getIconClass('fas fa-trash')} onClick={() => isAdmin && onDelete(product.name)}></span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;
