import css from 'styles.module.css';

const ImageGalleryItem = ({ images, openModal }) => {
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
};

export default ImageGalleryItem;
