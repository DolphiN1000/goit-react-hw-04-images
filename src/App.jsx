import Searchbar from 'shared/components/Searchbar/Searchbar';
import ImageGallery from 'modules/ImageGallery/ImageGallery';
import Button from 'shared/components/Button/Button';
import { useState, useEffect } from 'react';
import { searchImages } from './shared/services/gallery-api';
import { FidgetSpinner } from 'react-loader-spinner';
import Modal from 'shared/Modal/Modal';
import ImageDetails from 'modules/ImageGallery/ImageDetails/ImageDetails';

import './shared/styles/styles.css';

const App = () => {
  const [search, setSearch] = useState('');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [imageDetails, setImageDetails] = useState(null);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [tags, setTags] = useState('');

  useEffect(() => {
    if (!search) {
      return;
    }

    const fetchImages = async () => {
      try {
        setLoading(true);
        const data = await searchImages(search, page);
        setItems(prevItems => [...prevItems, ...data.hits]);
        setTotalPage(data.totalHits / 12);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, [
    search,
    setItems,
    setLoading,
    page,
    setTotalPage,
    setLoading,
    setError,
  ]);

  const onSearchImages = ({ search }) => {
    setSearch(search);
    setItems([]);
    setPage(1);
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const showImage = ({ largeImageURL, tags }) => {
    setImageDetails(largeImageURL, tags);
    // setLargeImageURL(largeImageURL);
    // setTags(tags);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setImageDetails(null);
  };

  return (
    <>
      <Searchbar onSubmit={onSearchImages} />
      {items.length !== 0 && (
        <ImageGallery items={items} showImage={showImage} />
      )}
      {error && <p className={StyleSheet.errorMessage}>{error}</p>}

      {Boolean(page <= totalPage && items.length && !loading) && (
        <Button loadMore={loadMore}></Button>
      )}
      {(showModal || loading) && (
        <Modal close={closeModal} showModal={showModal}>
          {loading && (
            <FidgetSpinner
              visible={true}
              height="200"
              width="200"
              ariaLabel="dna-loading"
              wrapperStyle={{}}
              wrapperClass="dna-wrapper"
              ballColors={['#ff0000', '#00ff00', '#0000ff']}
              backgroundColor="#F4442E"
            />
          )}
          <ImageDetails
          imageDetails={imageDetails}
            // largeImageURL={largeImageURL}
            // tags={tags}
          ></ImageDetails>
        </Modal>
      )}
    </>
  );
};

export default App;

// export class App extends Component {
//   state = {
//     search: '',
//     items: [],
//     loading: false,
//     page: 1,
//     totalPage: 1,
//     error: null,
//     showModal: false,
//     imageDetails: null,
//     largeImageURL: '',
//     tags: '',
//   };

//   // componentDidMount() {

//   // }

//   componentDidUpdate(prevProps, prevState) {
//     const { search, page } = this.state;
//     if (prevState.search !== search || prevState.page !== page) {
//       this.fetchImages();
//     }
//   }

//   async fetchImages() {
//     try {
//       this.setState({ loading: true });
//       const { search, page } = this.state;
//       const data = await searchImages(search, page);
//       this.setState(({ items }) => ({
//         items: [...items, ...data.hits],
//         totalPage: data.totalHits / 12,
//       }));
//     } catch (error) {
//       this.setState({ error: error.message });
//     } finally {
//       this.setState({ loading: false });
//     }
//   }

//   onSearchImages = ({ search }) => {
//     this.setState({ search, items: [], page: 1 });
//   };

//   loadMore = () => {
//     this.setState(({ page }) => ({ page: page + 1 }));
//   };

//   showImage = ({ largeImageURL, tags }) => {
//     this.setState({
//       imageDetails: {
//         largeImageURL,
//         tags,
//       },
//       showModal: true,
//     });
//   };

//   closeModal = () => {
//     this.setState({
//       showModal: false,
//       imageDetails: null,
//     });
//   };

//   render() {
//     const { items, loading, error, showModal, imageDetails, page, totalPage } =
//       this.state;
//     const { onSearchImages, loadMore, showImage, closeModal } = this;
//     return (
//       <>
//         <Searchbar onSubmit={onSearchImages} />
//         {(items.length !== 0) && <ImageGallery items={items} showImage={showImage} />}
//         {error && <p className={StyleSheet.errorMessage}>{error}</p>}

//         {Boolean(page <= totalPage && items.length && !loading) && (<Button loadMore={loadMore}></Button>)}
//         {(showModal || loading) && (
//           <Modal close={closeModal} showModal={showModal}>
//             {loading && (
//               <FidgetSpinner
//                 visible={true}
//                 height="200"
//                 width="200"
//                 ariaLabel="dna-loading"
//                 wrapperStyle={{}}
//                 wrapperClass="dna-wrapper"
//                 ballColors={['#ff0000', '#00ff00', '#0000ff']}
//                 backgroundColor="#F4442E"
//               />
//             )}
//             <ImageDetails {...imageDetails}></ImageDetails>
//           </Modal>
//         )}
//       </>
//     );
//   }
// }
