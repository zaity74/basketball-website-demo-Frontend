// HOOKS
import React, { useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

// REDUX IMPORT
import { createSize } from '../../../redux/action/sizeAction';
import { listeCategory } from '../../../redux/action/categoryAction';

const CreateSizeForm = () => {
  // STATE 
  const { register, handleSubmit, control, reset } = useForm({
    defaultValues: {
      category: '',
      availableSizes: [''],
    },
  });

  // DATA API AND CONSTANTES HOOK
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.listCategory.category.data);

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
  }, [dispatch]);

  // FUNCTIONS
  const { fields: sizesFields, append: appendSize } = useFieldArray({
    control,
    name: 'availableSizes',
  });

  const onSubmit = async (data) => {
    try {
      await dispatch(createSize(data));
    //   reset(); // Reset form after submission
    } catch (error) {
      console.error('Error creating size:', error);
    }
  };

  return (
    <div className='container'>
      <h2>Create Size:</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
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
        {sizesFields.map((field, index) => (
          <div key={field.id}>
            <label htmlFor={`availableSizes[${index}]`}>Size {index + 1}:</label>
            <input
              id={`availableSizes[${index}]`}
              {...register(`availableSizes[${index}]`, { required: true })}
            />
          </div>
        ))}
        <button type="button" onClick={() => appendSize('')}>
          Add Another Size
        </button>
        <button type="submit">Create Size</button>
      </form>
    </div>
  );
};

export default CreateSizeForm;
