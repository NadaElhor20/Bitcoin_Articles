const pino = require("pino");

const terminalLogger = pino({


  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
      levelFirst: true,
      translateTime: "yyyy-dd-mm, h:MM:ss",
    },
  },


});

module.exports = terminalLogger;
