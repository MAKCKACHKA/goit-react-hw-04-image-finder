import { useEffect, useState } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Loader from './Loader';
import Modal from './Modal';
import css from '../styles.module.css';

const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '37857814-b0d9639b296a6cf0b457a26a6';

const getImage = async (searchText, page) => {
  const response = await fetch(
    `${BASE_URL}/?q=${searchText}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return response.json();
};

export const App = () => {
  const [state, setState] = useState({
    searchText: '',
    images: null,
    isLoading: false,
    error: '',
    page: 1,
    selectedImage: null,
    showModal: false,
  });

  const handleSearch = searchText => {
    setState(prevState => ({
      ...prevState,
      searchText,
    }));
  };

  useEffect(() => {
    if (state.searchText) {
      setState(prevState => ({
        ...prevState,
        isLoading: true,
        images: [],
        page: 1,
      }));

      getImage(state.searchText, state.page)
        .then(data => {
          setState(prevState => ({
            ...prevState,
            images: data.hits,
            isLoading: false,
          }));
        })
        .catch(error => {
          console.error('error', error);
          setState(prevState => ({
            ...prevState,
            error: error.message,
            isLoading: false,
          }));
        });
    }
  }, [state.searchText, state.page]);

  const increasePage = () => {
    const nextPage = state.page + 1;

    getImage(state.searchText, nextPage)
      .then(data => {
        setState(prevState => ({
          ...prevState,
          page: nextPage,
          images: [...prevState.images, ...data.hits],
        }));
      })
      .catch(error => {
        console.error('error', error);
      });
  };

  const openModal = image => {
    setState(prevState => ({
      ...prevState,
      showModal: true,
      selectedImage: image,
    }));

    document.addEventListener('keydown', handleEscKey);
  };

  const closeModal = () => {
    setState(prevState => ({
      ...prevState,
      showModal: false,
      selectedImage: null,
    }));
    document.removeEventListener('keydown', handleEscKey);
  };

  const handleEscKey = event => {
    if (event.key === 'Escape') {
      closeModal();
    }
  };
  const resetPage = () => {
    setState(prevState => ({
      ...prevState,
      page: 1,
    }));
  };

  const { images, isLoading, page, selectedImage, showModal } = state;

  return (
    <div className={css.App}>
      <Searchbar handleSearch={handleSearch} resetPage={resetPage} />
      <ImageGallery images={images} openModal={openModal} />
      {isLoading && <Loader />}
      {images && images.length > 0 && (
        <Button increasePage={increasePage} page={page} />
      )}

      {showModal && selectedImage && (
        <Modal closeModal={closeModal} selectedImage={selectedImage} />
      )}
    </div>
  );
};
