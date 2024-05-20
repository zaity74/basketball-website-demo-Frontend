import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const TestPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      // Parsing query parameters from the URL
      const queryParams = new URLSearchParams(location.search);
      const page = queryParams.get('page') || 1;
      const category = queryParams.get('category') || '';
      const title = queryParams.get('title') || '';
      const sortField = queryParams.get('sortField') || 'title';
      const sortOrder = queryParams.get('order') || 'asc';
      const price = queryParams.get('price') || '';
      const size = queryParams.get('size') || '';
      const limit = queryParams.get('limit') || 10;

      try {
        const response = await axios.get('https://basket-demo2-website-api.onrender.com/api/v1/articles/', {
          params: {
            page,
            category,
            title,
            sortField,
            sortOrder,
            limit
          }
        });

        setProductData(response.data.products);
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [location.search]);

  const updateCategory = (newCategory) => {
    const queryParams = new URLSearchParams(location.search);
    queryParams.set('category', newCategory);
    navigate({ search: queryParams.toString() });
  };

  return (
    <div>
      <button onClick={() => updateCategory('shorts')}>Set Category to Shorts</button>
      <button onClick={() => updateCategory('accessoires')}>Set Category to Access</button>
      <button onClick={() => updateCategory('sweetshirts')}>Set Category to Sweet</button>
      {loading ? (
        <p>Loading...</p>
      ) : (
        productData.map(product => (
          <div key={product.id}>
            <h1>{product.title}</h1>
            <img src={product.image} alt={product.title} />
            <p>{product.price}</p>
            <p>{product.category}</p>
            <p>{product.size}</p>
            {/* Render other product details */}
          </div>
        ))
      )}
    </div>
  );
};

export default TestPage;
