import PropTypes from 'prop-types';

import styles from './imageGalleryItem.module.scss';

const ImageGalleryItem = ({ webformatURL, largeImageURL, tags, showImage }) => {
  return (
    <li
      onClick={() => {
        showImage({ largeImageURL, tags });
      }}
      className={styles.galleryItem}
    >
      <img className={styles.image} src={webformatURL} alt={tags} />
    </li>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.defaultProps = {
  items: [],
};

ImageGalleryItem.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string,
    })
  ),
  showImage: PropTypes.func.isRequired,
};
