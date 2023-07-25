import './games.scss';

// Redux import 
// Hooks
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createBrowserHistory } from 'history';

function Games(props) {
  const { gameInfo } = props;
    // State
    // New constantes

    // Page load
  
    // Events
   
    // Variables
    const gamesDisplay = gameInfo && gameInfo.map((ga, index) => (
      <div className='card' key={index}>
          <div className='info'>
            <h3>{ga.title}</h3>
            <p>{ga.phase}</p>
          </div>
          <hr></hr>
          <div className='team'>
            <div className='teamHome'>
              <img src={ga.imageHome} alt='teamHome logo' />
              <p>{ga.teamHome}</p>
            </div>
            <p>{ga.scoreHome}</p>
            <p>VS</p>
            <p>{ga.scoreAway}</p>
            <div className='teamAway'>
              <img src={ga.imageAway} alt='teamHome logo' />
              <p>{ga.teamAway}</p>
            </div>
          </div>
      
      </div>
    ))
  
    return (
      <>
          <section id="games">
              <div className='container'>
                  <h2>Fixtures</h2>
                  <div className='slide-container'>
                    {gamesDisplay}
                  </div>
              </div>

          </section>
      </>
    );
  }
  
  export default Games;