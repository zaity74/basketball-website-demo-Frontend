// HOOKS
import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

// REDUX IMPORTS
import { createProduct } from '../../../redux/action/productAction';
import { listeCategory } from '../../../redux/action/categoryAction';
import { listeSizes } from '../../../redux/action/sizeAction';

const CreateProductForm = () => {
  // STATE
  const { register, handleSubmit, control, watch, reset } = useForm({
    defaultValues: {
      title: '',
      description: '',
      slug: '',
      gender: 'men',
      productCollection: '',
      colors: { productColor: '', otherColors: [{ name: '' }] },
      photos: [''],
      category: '',
      countInStock: 0,
      qty: 0,
      price: 0,
      sizes: [''],
      image: '',
    },
  });

  // DATA API AND CONSTANT USE
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.listCategory.category?.data);
  const sizes = useSelector((state) => state.listSizes.size?.data);

  // EFFECTS 
  useEffect(() => {
    // Load listeCategory
    const fetchListeCategory = async () => {
      try {
        await dispatch(listeCategory());
      } catch (error) {
        console.log("Nous n'avons pas pu récupérer les données", error);
      }
    };
    fetchListeCategory();

    // Load listeSizes
    const fetchListeSizes = async () => {
      try {
        await dispatch(listeSizes());
      } catch (error) {
        console.log("Nous n'avons pas pu récupérer les données", error);
      }
    };
    fetchListeSizes();

  }, [dispatch]);

  // CONSTANTE
  const { fields: otherColorsFields, append: appendOtherColor } = useFieldArray({
    control,
    name: 'colors.otherColors',
  });

  const { fields: photosFields, append: appendPhoto } = useFieldArray({
    control,
    name: 'photos',
  });

  const { fields: sizesFields, append: appendSize } = useFieldArray({
    control,
    name: 'sizes',
  });


  const onSubmit = async (data) => {
    try {
      await dispatch(createProduct(data));
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  return (
    <>
      <div className='container'>
        <h2>Create products:</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="title">Title:</label>
            <input id="title" {...register('title', { required: true })} />
          </div>
          <div>
            <label htmlFor="description">Description:</label>
            <textarea id="description" {...register('description', { required: true })}></textarea>
          </div>
          <div>
            <label htmlFor="slug">Slug:</label>
            <input id="slug" {...register('slug', { required: true })} />
          </div>
          <div>
            <label htmlFor="gender">Gender:</label>
            <select id="gender" {...register('gender', { required: true })}>
              <option value="men">Men</option>
              <option value="women">Women</option>
              <option value="mixte">Mixte</option>
            </select>
          </div>
          <div>
            <label htmlFor="productCollection">Product Collection:</label>
            <input id="productCollection" {...register('productCollection', { required: true })} />
          </div>
          <div>
            <label htmlFor="productColor">Product Color:</label>
            <input id="productColor" {...register('colors.productColor', { required: true })} />
          </div>
          {otherColorsFields.map((field, index) => (
            <div key={field.id}>
              <label htmlFor={`colors.otherColors[${index}].name`}>Other Color {index + 1}:</label>
              <input
                id={`colors.otherColors[${index}].name`}
                {...register(`colors.otherColors[${index}].name`)}
              />
            </div>
          ))}
          <button type="button" onClick={() => appendOtherColor({ name: '' })}>
            Add Another Color
          </button>
          {photosFields.map((field, index) => (
            <div key={field.id}>
              <label htmlFor={`photos[${index}]`}>Photo {index + 1}:</label>
              <input
                id={`photos[${index}]`}
                {...register(`photos[${index}]`, { required: true })}
              />
            </div>
          ))}
          <button type="button" onClick={() => appendPhoto('')}>
            Add Another Photo
          </button>
          <div>
            <label htmlFor="category">Category:</label>
            <select id="category" {...register('category', { required: true })}>
              <option value="">Select a category</option>
              {categories && categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="countInStock">Count in Stock:</label>
            <input
              type="number"
              id="countInStock"
              {...register('countInStock', { required: true })}
            />
          </div>
          <div>
            <label htmlFor="qty">Quantity:</label>
            <input type="number" id="qty" {...register('qty', { required: true })} />
          </div>
          <div>
            <label htmlFor="price">Price:</label>
            <input type="number" id="price" {...register('price', { required: true })} />
          </div>
          <div>
            <label htmlFor="image">Image:</label>
            <input id="image" {...register('image', { required: true })} />
          </div>
          <button type="submit">Create Product</button>
        </form>
      </div>
    </>
  );
};

export default CreateProductForm;
