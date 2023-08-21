import { useState } from 'react';
import css from 'styles.module.css';

const Searchbar = ({ handleSearch, resetPage }) => {
  const [value, setValue] = useState('');
  const handleChange = e => {
    const newValue = e.target.value;
    setValue(newValue);
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log(value);
    handleSearch(value);
    setValue('');
    resetPage();
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} role="search" onSubmit={handleSubmit}>
        <button type="submit" className={css.SearchFormButton}>
          <span className={css.SearchFormButtonLabel}>&#9740;</span>
        </button>

        <input
          className={css.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
          value={value}
        />
      </form>
    </header>
  );
};

export default Searchbar;
