const mongoose = require("mongoose");
const redis = require("redis");
const util = require("util");

//setup redis configuration
const redisUrl = "redis://127.0.0.1:6379";
const client = redis.createClient(redisUrl);
client.get = util.promisify(client.get);

const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.exec = function () {
  console.log("I'm About to Run a Query");

  const newObj = Object.assign({}, this.getQuery(), {
    collection: this.mongooseCollection.name,
  });

  console.log(newObj);

  return exec.apply(this, arguments);
};
