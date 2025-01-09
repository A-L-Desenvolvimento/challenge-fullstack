import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost/api', 
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const loginService = async (email, password) => {
  try {
    const response = await api.post('/login', { email, password });
    return response;
  } catch (error) {
    throw new Error('Invalid credentials');
  }
};

export const registerService = async (name, email, password, password_confirmation) => {
  try {
    const response = await api.post('/register', { name, email, password, password_confirmation });
    console.log(response);
    return response;

  } catch (error) {
    throw new Error('Falhou', error);
  }
};

export const getProducts = async () => {
  try {
    const response = await api.get('/products');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch products');
  }
};

export const postProduct = async (data) => {
  try {
    console.log('Posting product data:', data);  
    const response = await api.post('/products',data );
    return response.data;
  } catch (error) {
    throw new Error('Failed to add products');
  }
};

export const updateProduct = async (productId, data) => {
  try {
    const response = await api.put(`/products/${productId}`, data);
    return response.data;
  } catch (error) {
    throw new Error('Failed to update products');
  }
};

export const getProductById = async (productId) => {
  try {
    const response = await api.get(`/products/${productId}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch product details');
  }
};
