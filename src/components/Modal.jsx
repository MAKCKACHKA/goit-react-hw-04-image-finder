import { Component } from 'react';
import css from '../styles.module.css';

class Modal extends Component {
  state = {};
  render() {
    const { selectedImage, closeModal } = this.props;
    return (
      <div className={css.Overlay} onClick={closeModal}>
        <div className={css.Modal} onClick={e => e.stopPropagation()}>
          <img src={selectedImage.webformatURL} alt={selectedImage.tags} />
        </div>
      </div>
    );
  }
}

export default Modal;
