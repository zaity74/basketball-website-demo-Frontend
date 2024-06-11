import React from 'react';

const StarRating = ({ rating, outOf = 5 }) => {
    const stars = [];
    for (let i = 1; i <= outOf; i++) {
        if (i <= rating) {
            stars.push(<span key={i}>&#9733;</span>); // Star filled
        } else {
            stars.push(<span key={i}>&#9734;</span>); // Star outline
        }
    }
    return <div className="star-rating">{stars}</div>;
};

export default StarRating;
