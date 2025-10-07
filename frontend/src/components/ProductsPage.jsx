import { useState } from 'react';
import ProductList from './ProductList';
import ProductForm from './ProductForm';

function ProductsPage() {
  const [productToEdit, setProductToEdit] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleEdit = (product) => {
    setProductToEdit(product);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSuccess = () => {
    setProductToEdit(null);
    setRefreshKey(prev => prev + 1);
  };

  const handleCancel = () => {
    setProductToEdit(null);
  };

  return (
    <div>
      <ProductForm 
        productToEdit={productToEdit}
        onSuccess={handleSuccess}
        onCancel={handleCancel}
      />
      <ProductList 
        key={refreshKey}
        onEdit={handleEdit}
      />
    </div>
  );
}

export default ProductsPage;
