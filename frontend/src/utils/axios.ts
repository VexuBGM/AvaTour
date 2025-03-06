import axios from "axios";

axios.defaults.withCredentials = true;

// Add request interceptor to set CSRF token
axios.interceptors.request.use((config) => {
  const csrfToken = getCookie('csrftoken');  // Function to get csrf token from cookies

  if (csrfToken) {
    config.headers['X-CSRFToken'] = csrfToken;  // Set CSRF token in the header
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()!.split(';').shift();
}
