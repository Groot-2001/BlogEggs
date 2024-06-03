const mongoose = require("mongoose");
const redis = require("redis");
const util = require("util");

//setup redis configuration
const redisUrl = "redis://127.0.0.1:6379";
const client = redis.createClient(redisUrl);
client.hget = util.promisify(client.hget);

//taking reference of original exec method
const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.cache = function (options = {}) {
  this.UseCached = true;
  this.hashKey = JSON.stringify(options.key || "");
  return this;
};

//modifying the exec method by adding the function below
mongoose.Query.prototype.exec = async function () {
  if (!this.UseCached) {
    return exec.apply(this, arguments);
  }

  //whenever a single mongoose query executed this function is gonna run also.
  const key = JSON.stringify(
    Object.assign({}, this.getQuery(), {
      collection: this.mongooseCollection.name,
    })
  );

  //see if we have a value for a 'key' in redis
  const cachedValue = await client.hget(this.hashKey, key);

  //If we do , return that.
  if (cachedValue) {
    const doc = JSON.parse(cachedValue);
    return Array.isArray(doc)
      ? doc.map((d) => new this.model(d))
      : new this.model(doc);
  }

  //Otherwise,issue the query and store the result in the redis.
  const result = await exec.apply(this, arguments);
  client.hset(this.hashkey, key, JSON.stringify(result), "EX", 10);
  return result;
};

module.exports = {
  clearCache(hashKey) {
    client.del(JSON.stringify(hashKey));
  },
};
