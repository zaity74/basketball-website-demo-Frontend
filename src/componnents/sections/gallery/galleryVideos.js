import './gallery.scss';

// Redux import 
// Hooks
import React, { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { IoIosPlay} from "react-icons/io";
import { RiStarSFill } from 'react-icons/ri';
import { BsChevronRight, BsChevronLeft } from 'react-icons/bs';

function GallerySection(props) {
    const { gallery } = props;
    // State
    const [showVideo, setShowVideo] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [moveForward, setMoveForward] = useState(false);
    // New constantes
    const translateX = (position) => {
        return `translateX(${position})`;
    };
     // New constantes
   

    // Function
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const formattedDate = date.toLocaleDateString("en-GB");
      return formattedDate;
    };

    // Events
    const handlePlayVideo = () => {
        setShowVideo(true);
    };

    const nextSlide = () => {
        if (currentIndex < gallery.length - 1) {
          setCurrentIndex(currentIndex + 1);
          setMoveForward(true);
        } else {
          // Move the element to the end of the list
          const updatedGallery = [
            ...gallery.slice(0, currentIndex),
            ...gallery.slice(currentIndex + 1),
            gallery[currentIndex]
          ];
          setCurrentIndex(0);
          setMoveForward(false);
        }
      };
      const prevSlide = () => {
        if (currentIndex > currentIndex - 1 && currentIndex > 0) {
          setCurrentIndex(currentIndex - 1);
          setMoveForward(true);
        }
      };
      


    const videos = gallery ? gallery.map((article, index) => (
        <div className={index === currentIndex ? 'active' : `block${index} block`} key={index}>
          {!showVideo ? (
            <>
              <img src={article.image} alt='article image' className='video' />
            <button onClick={handlePlayVideo} className='play-button'>
                <IoIosPlay className='icone' />
            </button>
            </>
          ):
          (
            <iframe
                className='iframe'
              src={gallery.file}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          )}
            <div className='text'>
                <h3 className='text-title'>{article.title}</h3>
                <p className='date'>{formatDate(article.createdAt)}
                    <RiStarSFill className='icone' />
                </p>
                <div className='decorator'></div>
            </div>
        </div>
      )) : null

   

    // Page load
  
    // Events
   
    // Variables
  
    return (
      <>
          <section id="gallery">
            <div className='container'>
                <div className='separator'></div>
                <div className='title-container'>
                    <h2 className='title'>#News Tv</h2>
                    <Link className='link' to={'/'}>All News</Link>
                </div>
                <div className='scroll-container'
                    style={{
                        transform: moveForward ? translateX(currentIndex * -240 + 'px') : null
                    }}
                >
                    <div className='gallery-container'>
                        {videos}
                    </div>  
                </div>
                <div className='arrow'>
                    <BsChevronLeft onClick={prevSlide} className='icone' />
                    <BsChevronRight onClick={nextSlide} className='icone' />
                </div>
            </div>
          </section>
      </>
    );
  }
  
  export default GallerySection;