import axios from 'axios';
import {getItem} from '@/helpers/presistanceStorage';

axios.defaults.baseURL = 'https://conduit.productionready.io/api';

axios.interceptors.request.use(config => {
  const accessToken = getItem('accessToken');
  const authorizationToken = accessToken ? `Token ${accessToken}` : '';
  config.headers.Authorization = authorizationToken;

  return config;
});

export default axios;
