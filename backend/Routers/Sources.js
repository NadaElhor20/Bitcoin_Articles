const express = require("express");
require("express-async-errors");
const customError = require("../Helper/ErrorHandeler.js");
const _ = require("lodash");
const client = require("../redis-server.js");
const terminalLogger=require("../middleware/logger.js")
const { getSources } = require("../Controllers/Articales&Sources.js");
const {
  CachedSources,
  CachedTopSubscribe,
} = require("../middleware/Cached.js");
const router = express.Router();

router.get("/", CachedSources, async (req, res) => {
  const { data } = await getSources();
  if (!data) throw new customError("No data founed", 404);
  const sourcesData = data.sources;
  await client.set("SourcesDataList", JSON.stringify(sourcesData));
  terminalLogger.info("Sources from db");
  res.status(200).send(sourcesData);
});

router.get("/top", CachedTopSubscribe, async (req, res) => {
  const {data} = await getSources();
  if (!data) throw new customError("No data founed", 404);
  const articalsData = data.sources;
  res.status(200).send(articalsData.slice(0, 10));
});

module.exports = router;
