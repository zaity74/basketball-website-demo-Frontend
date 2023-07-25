import './actualite.scss';
import CartActualite from '../../cart/cart_actualite';

// Redux import 
// Hooks
import React, { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { BsArrowRight } from 'react-icons/bs'

function Actualite(props) {
    const { articles, ranking } = props;
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
    console.log(rankingDisplay,'RANKING')
  
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
                        <CartActualite cart={articles} />
                    </div> 
                    <div className='rank'>
                        <table>
                            <thead>
                                <tr>
                                <th>Position</th>
                                <th>Équipe</th>
                                <th>Points</th>
                                <th>Journées jouées</th>
                                </tr>
                            </thead>
                            {rankingDisplay}
                        </table>
                    </div> 
                </div>
            </div>
          </section>
      </>
    );
  }
  
  export default Actualite;