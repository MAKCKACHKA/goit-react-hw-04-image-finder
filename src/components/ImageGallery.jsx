import ImageGalleryItem from './ImageGalleryItem';
import css from 'styles.module.css';

const ImageGallery = ({ images, openModal }) => {
  return (
    <>
      <ul className={css.ImageGallery}>
        {images && images.length > 0 && (
          <ImageGalleryItem images={images} openModal={openModal} />
        )}
      </ul>
    </>
  );
};

export default ImageGallery;
