import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {  Link } from "react-router-dom";

const ProductList = () => {
    const [catalogue, setCatalogue] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/catalogue')
            .then(response => {
                setCatalogue(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the catalogue!', error);
            });
    }, []);

    return (
        <div >
            <h1>Product List xx</h1>
            <div className="product-list">
                {catalogue.map(catalogue => (
                    <div key={catalogue.id} className="product-card">
                        <img src={catalogue.image} alt={catalogue.name} />
                        <h2>{catalogue.name}</h2>
                        <p>Price: ${catalogue.price}</p>
                        <Link to={"/product/" + catalogue.id}>Blogs</Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;