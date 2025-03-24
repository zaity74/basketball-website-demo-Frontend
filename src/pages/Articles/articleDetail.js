// LIBRARY AND COMPONENTS
import './articleDetail.scss';
import Navbar from "../../componnents/header/navbar/login";
import Banner from "../../componnents/header/banner/page_banner";
import Breadcrumbs from '../../componnents/breadcrumb';
import Footer from '../../componnents/footer/footer';


// HOOKS
import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { useState } from "react";

// REDUX IMPORT
import { articleDetail } from "../../redux/action/articlesAction";
import { listeArticles } from '../../redux/action/articlesAction';
import { Height } from '@mui/icons-material';

function ArticleDetail(props) {
  // STATE
  // New constantes
  const dispatch = useDispatch();
  const { id } = useParams();
  const article = useSelector((state) => state.articleDetail.articleDetail.article);
  const articles = useSelector((state) => state.listeArticles.article.article);
  
  
  // PAGE LOAD
  useEffect(() => {
    dispatch(articleDetail(id));
    dispatch(listeArticles({}));
  }, [dispatch, id]);

  // FONCTIONS EVENT
  const currentIndex = articles && articles.findIndex((art) => art._id === id);

  const previousArticles = articles && articles.slice(0, currentIndex);
  const nextArticles = articles && articles.slice(currentIndex + 1);

  const previousArticle = previousArticles && previousArticles.length > 0 ? previousArticles[previousArticles.length - 1] : null;
  const nextArticle = nextArticles && nextArticles.length > 0 ? nextArticles[0] : null;

  // Function
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("en-GB");
    return formattedDate;
  };

  return (
    <>
    <Banner 
    title={''} 
    backgroundImageUrl={'https://www.swisscentralbasketball.ch/wp-content/uploads/2022/09/Swiss_central_basket_2022_23-SBL.png'} 
    />
        <div class="detail_section">
          <div className="container detail-container">
            <Breadcrumbs />
            <div className="title">
                <h1>{article && article.title}</h1>
                <p>{formatDate(article && article.createdAt)}</p>
                {/* AUTHOR */}
                {article && article.user.map((user, index) => (
                  <>
                    <p key={index}>
                      Author : {user.name.firstname} {user.name.lastname}
                    </p>
                  </>
                ))}
                {/* ... */}
                <br></br>
                <div dangerouslySetInnerHTML={{ __html:article && article.description}} />
            </div>
            <div 
              className="bannerStyle" 
              style={{ 
                backgroundImage: 
                `linear-gradient(360deg, rgba(0, 0, 0, 0.57) 0%, rgba(0, 0, 0, 0) 80%), 
                url(${article && article.banner})` 
                }} >
            </div>
            <div className="content">
            <div dangerouslySetInnerHTML={{ __html:article && article.content}} />
            </div>
          </div>
        </div>
        <hr></hr>
        <div className='other-articles'>
          <div className='artLink'>
            <p>
              <BsChevronLeft className='icone' />
              Previous Article:
            </p>
            {previousArticle && (
              <Link to={`/blog/${previousArticle._id}`}>
                {previousArticle.title}
              </Link>
            )}
          </div>
          <div className='artLink'>
            <p>
              Next Article:
              <BsChevronRight className='icone' />
            </p>
            {nextArticle && (
              <Link to={`/blog/${nextArticle._id}`}>
                {nextArticle.title}
              </Link>
            )}
          </div>
        </div>
        <Footer />

    </>
  );
}

export default ArticleDetail;