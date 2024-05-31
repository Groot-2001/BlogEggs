const mongoose = require("mongoose");

const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.exec = function () {
  console.log("I'm About to Run a Query");
  console.log(this.getFilter());
  console.log(this.mongooseCollection.name);
  const newObj = Object.assign({}, this.getQuery(), {
    collection: this.mongooseCollection.name,
  });

  console.log(newObj);

  return exec.apply(this, arguments);
};
