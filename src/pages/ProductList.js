import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {  Link } from "react-router-dom";
import { Modal } from "./Modal"
import { useNavigate } from 'react-router-dom';

const ProductList = () => {
    const [catalogue, setCatalogue] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('user') === null) {
            alert('Must login')
            navigate('/')
        }
    },[])

    const logout = () => {
        localStorage.removeItem('user')
        navigate('/')
    }

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
                <h1>GADGET STORE</h1>
            
            <button className="btn " onClick={() => setModalOpen(true)}>Add Product</button>
            <button className="btn " onClick={logout}>Log out</button>
            
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
                        <Link to={"/product/" + catalogue.id}>view</Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;