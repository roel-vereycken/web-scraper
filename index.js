const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");
const PORT = 8000;

const app = express();

const url = "https://www.theguardian.com/uk";

axios(url)
  .then((resp) => {
    const html = resp.data;
    const $ = cheerio.load(html);
    const articles = [];

    $(".fc-item__title", html).each(function () {
      const title = $(this).text();
      const url = $(this).find("a").attr("href");
      articles.push({
        title,
        url,
      });
    });
    console.log(articles);
  })
  .catch((e) => console.log(e));

app.listen(PORT, console.log("surver running on port " + PORT));
