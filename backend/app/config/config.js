const ROUTES = {
  FETCH_ROUTE: process.env.FETCH_TODO,
  ADD_ROUTE: process.env.ADD_TODO,
  UPDATE_ROUTE: process.env.UPDATE_TODO,
  DELETE_ROUTE: process.env.DELETE_TODO,
};

const API_KEY = {
  FETCH_API_KEY: process.env.FETCH_API_KEY,
  ADD_API_KEY: process.env.ADD_API_KEY,
  UPDATE_API_KEY: process.env.UPDATE_API_KEY,
  DELETE_API_KEY: process.env.DELETE_API_KEY,
};

const DB_DETAILS = {
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
};

// Exporting sensitive data from .env file
module.exports = {
  ROUTES,
  API_KEY,
  DB_DETAILS,
};
