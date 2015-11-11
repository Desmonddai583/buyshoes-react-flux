const dispatcher = require("../AppDispatcher");

module.exports = function enableLogging() {
  dispatcher.register((action) => {
    console.log(JSON.stringify({
      timestamp: new Date(),
      action
    },undefined,2));
  })
}