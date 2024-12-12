import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get('http://127.0.0.1:8000/api/products');
      setProducts(response.data);
    };

    fetchProducts();
  }, []);

  return (
    <div className="wrapper-product-list" >
      <table className="product-list" >
        <thead>
          <tr>
            <td className="return-btn" colSpan="3" >
              <span>
                <Link to={'/'}>Voltar</Link>
              </span>
            </td>
          </tr>
          <tr>
            <th>Nome</th>
            <th>Preço</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.price}</td>
              {<td><Link to={'/api/products/'+product.id}>Detalhes</Link></td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductList;