const { port } = require("./config");
const express = require("express");
const terminalLogger=require("./middleware/logger")
const userRouter = require("./Routers/Users");
const ArticalesRouter = require("./Routers/Articles");
const SourcesRouter = require("./Routers/Sources");
const errorController = require("./Helper/errorController");
const cors = require("cors");
require("./Database/db");
const app = express();

app.use(express.json());
app.use(cors());

app.use(function (req, res, next) {
  const allowedOrigins = ["http://localhost:3000/"];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }

  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(["/user", "/users"], userRouter);
app.use(["/articale", "/articales"], ArticalesRouter);
app.use(["/source", "/sources"], SourcesRouter);

app.use(errorController);

app.listen(port, () => {
  terminalLogger.info(`Server Listening on port ${port}`);
});
