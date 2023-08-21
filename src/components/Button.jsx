import css from 'styles.module.css';

const Button = ({ increasePage }) => {
  return (
    <button type="button" className={css.Button} onClick={increasePage}>
      Load more
    </button>
  );
};

export default Button;
