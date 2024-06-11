import ReactQuill, { Quill} from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Importation des styles pour ReactQuill
import ImageResize from 'quill-image-resize-module-react';

// HOOKS 
import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

// REDUX IMPORTS
import { createArticle } from '../../../redux/action/articlesAction';
import { listeCategory } from '../../../redux/action/categoryAction';

// --------- CONFIGURATION HTML FORMS 

// Ajouter le module de redimensionnement d'image à Quill
Quill.register('modules/imageResize', ImageResize);

// Toolbar options
const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  ['blockquote', 'code-block'],
  ['link', 'image', 'video', 'formula'],

  [{ 'header': 1 }, { 'header': 2 }],               // custom button values
  [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
  [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
  [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
  [{ 'direction': 'rtl' }],                         // text direction

  [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

  [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
  [{ 'font': [] }],
  [{ 'align': [] }],

  ['clean']                                         // remove formatting button
];
// Ajouter le bouton image à la barre d'outils
const modules = {
  toolbar: {
    syntax: true,
    container: toolbarOptions,
    theme: 'snow'
  },
  imageResize: {
    // options for the image resize module
    displaySize: true,
  }
};

// Fonction pour enlever les balises HTML
const stripHtmlTags = (html) => {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || "";
};

const ArticleForm = () => {
  // STATE
  const [submittedData, setSubmittedData] = useState(null);

  // DATA API AND CONSTANT USE
  const dispatch = useDispatch();
  const { register, handleSubmit, control, reset } = useForm();
  const { error, loading } = useSelector((state) => state.createArticle);
  const { userFound } = useSelector((state) => state.userLogin.user); // error, isLogin, loading, user
  const categories = useSelector((state) => state.listCategory.category.data);
  const userFoundId = useSelector((state) => state.userLogin.user);
  console.log('user info :', userFoundId);

  // EFFECTS
  useEffect(() => {
    // Load listeCategory
    const fetchListeCategory = async () => {
      try {
        await dispatch(listeCategory());
      } catch (error) {
        console.log("nous n'avons pas pu récupérer les données", error);
      }
    };
    fetchListeCategory();

    // Load user info
    // const fetchUserInfo = async () => {
    //   try {
    //     await dispatch(userLogin());
    //   } catch (error) {
    //     console.log("nous n'avons pas pu récupérer les données", error);
    //   }
    // };
    // fetchUserInfo();

  }, [dispatch]);

  // FUNCTIONS
  const onSubmit = async (data) => {

    const articleData = {
      ...data,
      user: userFound && userFound._id,
    };

    try {
      await dispatch(createArticle(articleData));
    } catch (error) {
      console.log("nous avons pas pu créer l'article", error);
    }
  };

  return (
  <>
    <div className='container'>
    <h2>Create articles : </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="title">Titre</label>
            <input id="title" {...register('title', { required: true })} />
          </div>

          <div>
            <label htmlFor="slug">Slug</label>
            <input id="slug" {...register('slug', { required: true })} />
          </div>

          <div>
            <label htmlFor="description">Description</label>
            <input id="description" {...register('description', { required: true })} />
          </div>

          <div>
            <label htmlFor="category">Catégorie</label>
            <select id="category" {...register('category', { required: true })}>
              {categories && categories.map((cat) => (
                <option key={cat._id} value={cat._id}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="banner">Bannière (URL de l'image)</label>
            <input id="banner" {...register('banner', { required: true })} />
          </div>

          <div>
            <label htmlFor="content">Contenu</label>
            <Controller
              name="content"
              control={control}
              defaultValue=""
              render={({ field }) => <ReactQuill {...field} modules={modules}  />}
              rules={{ required: true }}
            />
          </div>

          <button type="submit">Créer l'article</button>
      </form>
    </div>
  </>
  );
};

export default ArticleForm;
