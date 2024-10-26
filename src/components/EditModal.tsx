import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { Product, EditModalProps } from '../types/types';

const EditModal: React.FC<EditModalProps> = ({ product, onSave, onClose }) => {
  const [productData, setProductData] = useState<Product>({ ...product });
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    setProductData({...product});
    setIsDirty(false);
  }, [product]);

  const handleChange = (field: string, value: string) => {
    setProductData(prevData => ({ ...prevData, [field]: value }));
    setIsDirty(true);
  };

  const handleSave = () => onSave(productData);

  return (
    <Modal
      isOpen={true}
      onRequestClose={onClose}
      className="modal"
    >
      <h2>Edit Product</h2>
      <span className="close-btn" onClick={onClose}>&times;</span>
      <div>{product.name}</div>
      <div className="container">
        {['category', 'price', 'quantity', 'value'].map(field => (
          <div key={field}>
            <label>{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
            <input
              type='text'
              value={String(productData[field as keyof Product])}
              onChange={e => handleChange(field, e.target.value)}
            />
          </div>
        ))}
      </div>
      <div className="modal-footer">
        <button onClick={onClose} className="cancel-btn">Cancel</button>
        <button
          onClick={handleSave}
          disabled={!isDirty}
          className="save-btn"
          style={{ backgroundColor: isDirty ? '#4CAF50' : undefined }}
        >
          Save
        </button>
      </div>
    </Modal>
  );
};

export default EditModal;