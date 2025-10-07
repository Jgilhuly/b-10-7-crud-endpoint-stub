import { useState, useEffect } from 'react';
import { productsApi } from '../services/api';
import './ProductForm.css';

function ProductForm({ productToEdit, onSuccess, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    tags: '',
    in_stock: true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (productToEdit) {
      setFormData({
        name: productToEdit.name,
        description: productToEdit.description,
        price: productToEdit.price,
        category: productToEdit.category,
        tags: productToEdit.tags ? productToEdit.tags.join(', ') : '',
        in_stock: productToEdit.in_stock,
      });
    }
  }, [productToEdit]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const productData = {
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      category: formData.category,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      in_stock: formData.in_stock,
    };

    try {
      if (productToEdit) {
        await productsApi.update(productToEdit.id, productData);
      } else {
        await productsApi.create(productData);
      }
      
      setFormData({
        name: '',
        description: '',
        price: '',
        category: '',
        tags: '',
        in_stock: true,
      });
      
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(`Failed to ${productToEdit ? 'update' : 'create'} product`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      category: '',
      tags: '',
      in_stock: true,
    });
    if (onCancel) onCancel();
  };

  return (
    <div className="product-form-container">
      <h2>{productToEdit ? 'Edit Product' : 'Create New Product'}</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-group">
          <label htmlFor="name">Product Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description *</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="price">Price *</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              step="0.01"
              min="0"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category *</label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="tags">Tags (comma-separated)</label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="e.g., wireless, premium, audio"
          />
        </div>

        <div className="form-group checkbox-group">
          <label>
            <input
              type="checkbox"
              name="in_stock"
              checked={formData.in_stock}
              onChange={handleChange}
            />
            <span>In Stock</span>
          </label>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? 'Saving...' : (productToEdit ? 'Update Product' : 'Create Product')}
          </button>
          {productToEdit && (
            <button type="button" onClick={handleCancelEdit} className="btn-cancel">
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default ProductForm;
