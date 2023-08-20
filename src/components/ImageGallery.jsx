import React, { Component } from 'react';
import ImageGalleryItem from './ImageGalleryItem';
import css from 'styles.module.css';

class ImageGallery extends Component {
  render() {
    const { images, openModal } = this.props;

    return (
      <>
        <ul className={css.ImageGallery}>
          {images && images.length > 0 && (
            <ImageGalleryItem images={images} openModal={openModal} />
          )}
        </ul>
      </>
    );
  }
}

export default ImageGallery;
