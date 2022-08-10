import axios from 'axios'

export const apiDbc = axios.create({
  baseURL: 'https://dbc-pessoa-api.herokuapp.com'
});

