import { Component } from 'react';
import { InfinitySpin } from 'react-loader-spinner';
import css from 'styles.module.css';

class Loader extends Component {
  state = {};
  render() {
    return (
      <div className={css.Loader}>
        <InfinitySpin width="200" color="#3f4046d7" />
      </div>
    );
  }
}

export default Loader;
