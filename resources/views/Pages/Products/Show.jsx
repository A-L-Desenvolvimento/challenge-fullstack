// filepath: resources/js/Pages/Products/Show.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Show = ({ productId }) => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`/api/products/${productId}`).then(response => {
      setProduct(response.data);
    });
  }, [productId]);

  if (!product) return <div>Carregando...</div>;

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>Preço: R${product.price}</p>
      <p>Quantidade disponível: {product.quantity}</p>
      <p>Status: {product.active ? 'Ativo' : 'Inativo'}</p>
    </div>
  );
};

export default Show;
