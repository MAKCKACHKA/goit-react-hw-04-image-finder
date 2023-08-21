import css from '../styles.module.css';

const Modal = ({ selectedImage, closeModal }) => {
  return (
    <div className={css.Overlay} onClick={closeModal}>
      <div className={css.Modal} onClick={e => e.stopPropagation()}>
        <img src={selectedImage.webformatURL} alt={selectedImage.tags} />
      </div>
    </div>
  );
};

export default Modal;
