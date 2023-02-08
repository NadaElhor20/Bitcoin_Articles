const express = require("express");
require("express-async-errors");
const customError = require("../Helper/ErrorHandeler.js");
const _ = require("lodash");
const client = require("../redis-server.js");
const terminalLogger=require("../middleware/logger")
const { getArticles } = require("../Controllers/Articales&Sources.js");
const { CachedArticales } = require("../middleware/Cached.js");
const router = express.Router();

router.get("/", CachedArticales, async (req, res) => {
  const { data } = await getArticles();
  if (!data) throw new customError("No data founed", 404);
  const articalsData = data.articles;
  await client.set("ArticalesList", JSON.stringify(articalsData));
  // await client.SETEX("ArticalesList",10, JSON.stringify(articalsData)); //to set expired data to redis
  terminalLogger.info("Articales from db");
  res.status(200).send(articalsData);
});

module.exports = router;
