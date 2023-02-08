const client = require("../redis-server");
const Popular=require("../Models/popular")
const terminalLogger=require("./logger")
const _ = require("lodash");

const CachedArticales = async (req, res, next) => {
  const cacheResults = await client.get("ArticalesList");
  if (cacheResults) {
    const articales = JSON.parse(cacheResults);
    terminalLogger.info("Articales from cache");
    res.send(articales);
  } else {
    next();
  }
};
const CachedSources = async (req, res, next) => {
  const cacheResults = await client.get("SourcesDataList");
  if (cacheResults) {
    const sources = JSON.parse(cacheResults);
    terminalLogger.info("Sources from cache");
    res.send(sources);
  } else {
    next();
  }
};

const CachedTopSubscribe = async (req, res, next) => {
  const popular=await Popular.find({}).sort({count:-1}).limit(10)
  const mostPopular=popular.map(ele=>ele.key)
  const cachedSources = JSON.parse(await client.get("SourcesDataList"));
  const popularSources = mostPopular.map((ele) => {
    const popularList = cachedSources.find((source) => source.id === ele);
    return popularList;
  });
  if (popularSources.length!==0) {
    res.send(popularSources);
  } else {
    next();
  }
};

module.exports = {
  CachedArticales,
  CachedSources,
  CachedTopSubscribe,
};
