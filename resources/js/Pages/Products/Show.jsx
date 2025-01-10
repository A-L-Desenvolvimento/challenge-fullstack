import React from 'react';

const Show = ({ product }) => {
    return (
        <div>
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <p>Price: {product.price}</p>
            <p>Quantity: {product.quantity}</p>
            <p>Active: {product.active ? 'Yes' : 'No'}</p>
        </div>
    );
};

export default Show;
