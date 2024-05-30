const mongoose = require("mongoose");

const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.exec = function () {
  console.log("I'm About to Run a Query");
  return exec.apply(this, arguments);
};
