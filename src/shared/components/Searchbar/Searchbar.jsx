import PropTypes from 'prop-types';
import { useState } from 'react';

import initialState from './initialState';

import styles from './searchbar.module.scss';

const Searchbar = ({ onSubmit }) => {
  const [searchValue, setSearchValue] = useState(initialState);

  const handleChange = ({ target }) => {
    const { name, value } = target;

    setSearchValue({ [name]: value.toLowerCase() });
  };

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit({ ...searchValue });
    setSearchValue(initialState);
  };

  const { search } = searchValue;

  return (
    <header className={styles.searchbar}>
      <form className="form" onSubmit={handleSubmit}>
        <button type="submit" className="button">
          <span className="button-label">Search</span>
        </button>
        <input
          name="search"
          value={search}
          onChange={handleChange}
          className="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

// class Searchbar extends Component {

//   state = {
//     ...initialState
//   };

//   handleChange = ({ target }) => {
//     const { name, value } = target;
//     this.setState({ [name]: value.toLowerCase() });
//   };

//   handleSubmit = event => {
//     event.preventDefault();
//     const { onSubmit } = this.props;
//     onSubmit({ ...this.state });
//     this.reset();
//   };

//   reset() {
//     this.setState({ search: '' });
//   }

//   render() {
//     const { search } = this.state;
//     const { handleSubmit, handleChange } = this;
//     return (
//       <header className={styles.searchbar}>
//         <form className="form" onSubmit={handleSubmit}>
//           <button type="submit" className="button">
//             <span className="button-label">Search</span>
//           </button>
//           <input
//             name="search"
//             value={search}
//             onChange={handleChange}
//             className="input"
//             type="text"
//             autoComplete="off"
//             autoFocus
//             placeholder="Search images and photos"
//           />
//         </form>
//       </header>
//     );
//   }
// }
