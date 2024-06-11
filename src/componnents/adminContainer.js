import ReactQuill, { Quill} from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Importation des styles pour ReactQuill
import Navbar from './header/navbar/login';
import ArticleForm from './admin/articles/articleForm';
import CreateProductForm from './admin/products/productForm';
import CreateCategoryForm from './admin/categories/categorieForm';
import CreateSizeForm from './admin/sizes/sizesForm';
import './adminContainer.scss';

// HOOKS 
import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Celebration } from '@mui/icons-material';

// REDUX IMPORTS


const AdminContainer = () => {
  // STATE

  // DATA API AND CONSTANT USE
  const dispatch = useDispatch();

  // EFFECTS
  useEffect(() => {

  }, []);

  return (
  <>
  <Navbar />
  <div className='section-container'>
  <div className='custom-container '>
    <div className='aside col-2'>
      <h3>Hello world</h3>
    </div>
    <div className='formContainer col-10'>
      <ArticleForm />
      <hr></hr>
      <CreateProductForm />
      <hr></hr>
      <CreateCategoryForm />
      <hr></hr>
      <CreateSizeForm />
    </div>

  </div>
  </div>
  </>
  );
};

export default AdminContainer;
