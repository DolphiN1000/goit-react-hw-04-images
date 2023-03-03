import PropTypes from 'prop-types';

import styles from './imageDetails.module.scss';

const ImageDetails = ({ largeImageURL, tags }) => {
  return (
    <div className={styles.div}>
      <img className={styles.image} src={largeImageURL} alt={tags} />
    </div>
  );
};
export default ImageDetails;

ImageDetails.propTypes = {
  largeImageURL: PropTypes.string,
  tags: PropTypes.string,
};
