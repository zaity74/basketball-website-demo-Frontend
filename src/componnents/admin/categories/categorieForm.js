
// HOOKS
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import axios from 'axios';

// REDUX IMPORT
import { createCategory } from '../../../redux/action/categoryAction';


const CreateCategoryForm = () => {

  // STATE 
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: '',
      type: '',
      image: '',
      slug: '',
    },
  });

  // DATA API AND CONSTANTES HOOK
  const dispatch = useDispatch();

  // FUNCTIONS
  const onSubmit = async (data) => {
    try {
      await dispatch(createCategory(data));
      // reset(); // Reset form after submission
    } catch (error) {
      console.error('Error creating category:', error);
    }
  };

  return (
    <div className='container'>
      <h2>Create Category:</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name">Name:</label>
          <input id="name" {...register('name', { required: true })} />
        </div>
        <div>
          <label htmlFor="type">Type:</label>
          <input id="type" {...register('type', { required: true })} />
        </div>
        <div>
          <label htmlFor="image">Image URL:</label>
          <input id="image" {...register('image', { required: true })} />
        </div>
        <div>
          <label htmlFor="slug">Slug:</label>
          <input id="slug" {...register('slug', { required: true })} />
        </div>
        <button type="submit">Create Category</button>
      </form>
    </div>
  );
};

export default CreateCategoryForm;
