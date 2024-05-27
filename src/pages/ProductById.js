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

    return <div>ProductById {product[0] ? product[0].name + ' ' + product[0].price : 'not found'}</div>
}

export default ProductById