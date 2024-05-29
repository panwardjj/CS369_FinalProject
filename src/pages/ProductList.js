import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {  Link, NavLink } from "react-router-dom";
import { Modal } from "./Modal"

import { useNavigate } from 'react-router-dom';

const ProductList = () => {
    const [catalogue, setCatalogue] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [addProductExist, setAddProductExist] = useState(false);
    
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('user') !== null) {
            setAddProductExist(true)
        }
    },[])

  
    const fetchItemList = () => {
        axios.get('http://localhost:8080/catalogue')
        .then(response => {
            setCatalogue(response.data);
        })
        .catch(error => {
            console.error('There was an error fetching the catalogue!', error);
        });
    }

    useEffect(() => {
        fetchItemList()
    }, []);

  

    return (
        <div >
            <div className="header">
                <h1>OUR PRODUCTS</h1>
            
                {addProductExist &&
                    <button className="btn " onClick={() => setModalOpen(true)}>Add Product</button>
                }
            
            {modalOpen && 
            <Modal 
                closeModal={() => {
                    setModalOpen(false);
                }}
                onSuccess={() => {
                    fetchItemList()
                }}
            />
            }

           

            
            </div>
            
            <div className="product-list">
                {catalogue.map(catalogue => (
                    <div key={catalogue.id} className="product-card">
                        <img src={catalogue.image} alt={catalogue.name} />
                        <h2>{catalogue.name}</h2>
                        <p>Price: ${catalogue.price}</p>
                        <NavLink to={"/product/" + catalogue.id}>view</NavLink> 
                       
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;