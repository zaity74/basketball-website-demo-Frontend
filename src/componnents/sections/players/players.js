import './players.scss';
import { Link } from 'react-router-dom';

// Redux import 
// Hooks
import { useState, useEffect } from "react";

function PlayersSection(props) {
    // State
    const [currentIndex, setCurrentIndex] = useState(0);
    // New constantes
    const player = [
        {
            "name" : 'Brown',
            "firstname" : 'Dave',
            "age" : 23,
            "nationality": 'steave bernanrd',
            "image": "20/12/2030",
        },
        {
            "name" : 'Howard',
            "firstname" : 'Steve',
            "age" : 27,
            "nationality": 'steave bernanrd',
            "image": "20/12/2030",
        },
        {
            "name" : 'Denzel',
            "firstname" : 'Masson',
            "age" : 22,
            "nationality": 'steave bernanrd',
            "image": "20/12/2030",
        },
        {
            "name" : 'Cherif',
            "firstname" : 'Jason',
            "age" :32,
            "nationality": 'steave bernanrd',
            "image": "20/12/2030",
        },
    ]

    useEffect(() => {
      });
    // Events
    // Variables
    return (
        <>
        <section id='player_section'>
            <div className='container'>
                <div className='content'>
                    <h2>Discover our player from our team</h2>
                </div>
                <div className='player_slider_container'>
                    <div className='player_slider'>
                        {
                            player && player.map((index, player) => (
                                <div key={index} className='player_card'></div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </section>
        </>
    );
}

export default PlayersSection;