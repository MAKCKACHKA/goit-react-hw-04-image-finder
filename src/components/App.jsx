import { Component } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Loader from './Loader';
import Modal from './Modal';
import css from '../styles.module.css';

const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '37857814-b0d9639b296a6cf0b457a26a6';

const getImage = async (searchText, page) => {
  return fetch(`${BASE_URL}/?q=${searchText}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12
`);
};

export class App extends Component {
  state = {
    searchText: '',
    images: null,
    isLoading: false,
    error: '',
    page: 1,
    selectedImage: null,
    showModal: false,
  };

  handleSearch = searchText => {
    this.setState({ searchText });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchText !== this.state.searchText) {
      this.setState({ isLoading: true, images: [], page: 1 });

      getImage(this.state.searchText, this.state.page)
        .then(response => response.json())
        .then(data => {
          this.setState({ images: data.hits, isLoading: false });
        })
        .catch(error => {
          console.error('error', error);
          this.setState({ error: error.message });
        })
        .finally(() => {
          this.setState({ isLoading: false });
        });
    }
  }
  increasePage = () => {
    const nextPage = this.state.page + 1;

    getImage(this.state.searchText, nextPage)
      .then(response => response.json())
      .then(data => {
        this.setState(prevState => ({
          page: nextPage,
          images: [...prevState.images, ...data.hits],
        }));
      })
      .catch(error => {
        console.error('error', error);
      });
  };
  openModal = image => {
    this.setState({ showModal: true, selectedImage: image });
    document.addEventListener('keydown', this.handleEscKey);
  };

  closeModal = () => {
    this.setState({ showModal: false, selectedImage: null });
    document.removeEventListener('keydown', this.handleEscKey);
  };

  handleEscKey = event => {
    if (event.key === 'Escape') {
      this.closeModal();
    }
  };
  resetPage = () => {
    this.setState({ page: 1 });
  };

  render() {
    const { images, isLoading, page, selectedImage, showModal } = this.state;

    return (
      <div className={css.App}>
        <Searchbar
          handleSearch={this.handleSearch}
          resetPage={this.resetPage}
        />
        <ImageGallery images={images} openModal={this.openModal} />
        {isLoading && <Loader />}
        {images && images.length > 0 && (
          <Button increasePage={this.increasePage} page={page} />
        )}

        {showModal && selectedImage && (
          <Modal closeModal={this.closeModal} selectedImage={selectedImage} />
        )}
      </div>
    );
  }
}
