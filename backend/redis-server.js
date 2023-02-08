const redis = require("redis");

let client;

(async () => {
  client = redis.createClient({
    url: " redis://cached:6379"
  });
  client.on("error", (error) => console.error(`Redis-Error : ${error}`));
  await client.connect();
})();

module.exports = client;
