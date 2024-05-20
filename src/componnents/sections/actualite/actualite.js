import './actualite.scss';
import CartActualite from '../../cart/cart_actualite';

// Redux import 
// Hooks
import React, { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom';
import { BsArrowRight } from 'react-icons/bs'
import Skeleton from '@mui/material/Skeleton';
import { Grid, Stack } from '@mui/material';

function Actualite(props) {
    const { articles, ranking, loading } = props;
    // State
    // New constantes
     // New constantes

    // Page load
  
    // Events
   
    // Variables
    const rankingDisplay = ranking && ranking.map((ra, index) => (
            <tbody key={index}>
                <tr className='row'>
                <td className='position'>{ra.rank}</td>
                <td>{ra.name}</td>
                <td>{ra.firstChildPoints}</td>
                <td>{ra.secondChildPoints}</td>
                </tr>
            </tbody>
      ))
  
    return (
      <>
          <section id="news">
            <div className='container'>
                <div className='title-container'>
                    <h2 className='title'>Latest News
                    </h2>
                    <Link className='link' to={'/blog'}>
                        All News
                        <BsArrowRight  className='icone' />
                    </Link>
                </div>
                <div className='news-rank-container'>
                <div className='news-container'>
                    {
                        loading ? <p>Loading...</p> :
                        <CartActualite cart={articles} />
                    }
                    </div>
                    {
                        loading ? (<p>Loading...</p>) : 
                        (
                            <div className='rank'>
                                <table>
                                    {
                                        loading ? 
                                        (
                                        <p>Loading...</p>
                                        ) :
                                        (
                                            <>
                                                <thead>
                                                    <tr>
                                                    <th>Position</th>
                                                    <th>Équipe</th>
                                                    <th>Points</th>
                                                    <th>Journées jouées</th>
                                                    </tr>
                                                </thead>
                                                {rankingDisplay}
                                            </>
                                        )
                                    }
                                </table>
                            </div> 
                        )
                    }
                    
                </div>
            </div>
          </section>
      </>
    );
  }
  
  export default Actualite;