const axios = require("axios");

const getArticles = async () => {
  let options = {
    method: "GET",
    url: "https://newsapi.org/v2/everything?q=bitcoin&apiKey=e180b122e8d34908ad1de918abbb36dc",
  };

  return axios(options);
};
const getSources = async () => {
  let options = {
    method: "GET",
    url: "https://newsapi.org/v2/top-headlines/sources?apiKey=e180b122e8d34908ad1de918abbb36dc",
  };

  return axios(options);
};

module.exports = {
  getArticles,
  getSources,
};
