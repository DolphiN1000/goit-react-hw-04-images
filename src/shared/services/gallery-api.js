import axios from 'axios';

const instance = axios.create({
  baseURL: `https://pixabay.com/api`,
  params: {
    key: '32256476-11f87d3a9f8518386821fa1a7',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: false,
    per_page: 12,
  },
});

export const searchImages = async (q, page = 1) => {
  const { data } = await instance.get('/', {
    params: {
      q,
      page,
    },
  });
  return data;
};
