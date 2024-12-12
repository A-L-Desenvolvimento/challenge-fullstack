import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/products/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setProduct(data);
        setIsLoading(false);
      })
      .catch(error => {
        setError(error);
        setIsLoading(false);
      });
  }, [id]); // Empty dependency array ensures this runs only once

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="wrapper-product-details" >
      <table className="product-details" >
        <thead>
          <tr>
            <td className="return-btn" colSpan="3" >
              <span>
                <Link to={'/api/products/'}>Voltar</Link>
              </span>
            </td>
          </tr>
          <tr>
            <th>Nome</th>
            <th>Preço</th>
            <th>Quantidade</th>
            <th>Ativo</th>
            <th>Criado</th>
            <th>Atualizado</th>
          </tr>
        </thead>
        <tbody>
            <tr>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.quantity}</td>
              <td>{product.active}</td>
              <td>{product.created_at}</td>
              <td>{product.updated_at}</td>
            </tr>
            <tr>
              <th colSpan="6" >Descrição</th>
            </tr>
            <tr>
              <td colSpan="6" >{product.description}</td>
            </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ProductDetails;