import React from 'react';
import { Link } from 'react-router-dom';

function Home() {

  return (
    <div className="wrapper-home" >
        <div className="msg-home" >Bem vindo</div>
        <div className="btn-home" ><Link to={'/api/products'}>Ver lista de produtos</Link></div>
    </div>
  );
}

export default Home;