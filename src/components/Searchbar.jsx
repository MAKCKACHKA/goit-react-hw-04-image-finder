import { Component } from 'react';
import css from 'styles.module.css';

class Searchbar extends Component {
  state = {
    value: '',
  };

  handleChange = e => {
    const { target } = e;
    const { value } = target;
    this.setState({ value });
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state);
    this.props.handleSearch(this.state.value);
    this.setState({ value: '' });
    this.props.resetPage();
  };

  render() {
    return (
      <header className={css.Searchbar}>
        <form
          className={css.SearchForm}
          role="search"
          onSubmit={this.handleSubmit}
        >
          <button type="submit" className={css.SearchFormButton}>
            <span className={css.SearchFormButtonLabel}>&#9740;</span>
          </button>

          <input
            className={css.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleChange}
            value={this.state.value}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
