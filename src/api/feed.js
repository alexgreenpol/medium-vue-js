import axios from '@/api/axios';

const feed = apiUrl => {
  return axios.get(apiUrl);
};

export default {
  feed
};
