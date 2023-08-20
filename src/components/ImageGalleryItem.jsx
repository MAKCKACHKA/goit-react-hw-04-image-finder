import React, { Component } from 'react';
import css from 'styles.module.css';

class ImageGalleryItem extends Component {
  render() {
    const { images, openModal } = this.props;

    return (
      <>
        {images.map(image => (
          <li key={image.id} className={css.ImageGalleryItem}>
            <img
              className={css.ImageGalleryItemImage}
              src={image.webformatURL}
              alt={image.tags}
              onClick={() => openModal(image)}
            />
          </li>
        ))}
      </>
    );
  }
}

export default ImageGalleryItem;
