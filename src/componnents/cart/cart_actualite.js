
// Redux import 
// Hooks
import React, { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom';

function CartActualite(props) {
    const { cart } = props;
    // State
    // New constantes
    // New constantes

    // EVENTS

    // Function
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const formattedDate = date.toLocaleDateString("en-GB");
        return formattedDate;
      };
    
    const stripHtmlTags = (html) => {
      const doc = new DOMParser().parseFromString(html, 'text/html');
      return doc.body.textContent || "";
    };


    // Variables  
    const blogArticles = cart ? 
    cart.map(
        (
        article, 
        index
        ) => (
            <div className={`block${index} block`}
                key={index}
                >
                    <img className='image' src={article.banner} alt='article image' />
                    <div className='text'>
                        <Link to={`/blog/${article._id}`}><h3>{article.title}</h3></Link>
                        <p className="content">{stripHtmlTags(article.content).slice(0, 200)}{stripHtmlTags(article.content).length > 100 ? '...' : ''}</p>
                        <p>{formatDate(article.createdAt)}</p>
                    </div>
            </div>
        )) : 
        null

   

    // Page load
  
    // Events
   
    // Variables
  
    return (
      <>

            {blogArticles}
      </>
    );
  }
  
  export default CartActualite;