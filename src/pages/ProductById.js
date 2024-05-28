import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ProductById = () => {
    let { id } = useParams();

    const [product, setProduct] = useState([]);


    useEffect(() => {
        axios.get('http://localhost:8080/product/'+id)
            .then(response => {
                setProduct(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the catalogue!', error);
            });
    }, []);

    return  (
    <div className="product-list" >
        <div className="product-card">
            <h1>{product[0] ? product[0].name : 'not found'}</h1>
            <img src={product[0] ? product[0].image : 'not found'} />
            <h3>DETAILS</h3>
            <p>{product[0] ? product[0].description : 'not found'}</p>
            <h3>SIZE</h3>
            <p>{product[0] ? product[0].size : 'not found'}</p>
            <h3>MATERIAL</h3>
            <p>{product[0] ? product[0].material : 'not found'}</p>
        </div>
    </div>
    );
    };

export default ProductById