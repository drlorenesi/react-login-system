import jwt_decode from 'jwt-decode';

const tokenKey = 'x-auth-token';

export const setAuthToken = (token) => {
  try {
    localStorage.setItem(tokenKey, token);
  } catch (err) {
    return null;
  }
};

export const removeAuthToken = () => {
  try {
    localStorage.removeItem(tokenKey);
  } catch (err) {
    return null;
  }
};

export const getAuthToken = () => {
  try {
    const jwt = localStorage.getItem(tokenKey);
    const decoded = jwt_decode(jwt);
    if (decoded.exp > Math.floor(Date.now() / 1000)) {
      return localStorage.getItem(tokenKey);
    } else {
      localStorage.removeItem(tokenKey);
      return null;
      // window.location = '/login';
    }
  } catch (err) {
    return null;
  }
};

export const decodedAuthToken = () => {
  try {
    const jwt = localStorage.getItem(tokenKey);
    const decoded = jwt_decode(jwt);
    decoded.loggedIn = true;
    return decoded;
  } catch (err) {
    return null;
  }
};
