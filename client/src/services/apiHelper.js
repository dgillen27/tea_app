const axios = require("axios");

const api = axios.create({
  baseURL: "http://localhost:4000"
});

const updateToken = (token) => {
  localStorage.setItem("authToken", token);
  console.log("this is token", token);
  api.defaults.headers.common.authorization = `Bearer ${token}`;
};

module.exports = {
  api,
  updateToken
};
