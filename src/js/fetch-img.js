import axios from 'axios';

export default async function fetchImages(inputValue, page) {
  const baseUrl = 'https://pixabay.com/api/';
  const options = {
    params: {
      key: '32705196-edcafbc81cd9914a7a863be11',
      q: inputValue,
      image_type: 'photo',
      orientation: 'horizonta',
      safesearch: 'true',
      per_page: '40',
      page: page,
    },
  };
  const response = await axios.get(baseUrl, options);
  return response.data;
}
