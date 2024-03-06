const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");

const Blog = mongoose.model("Blog");

module.exports = (app) => {
  app.get("/api/blogs/:id", requireLogin, async (req, res) => {
    const blog = await Blog.findOne({
      _user: req.user.id,
      _id: req.params.id,
    });

    res.send(blog);
  });

  app.get("/api/blogs", requireLogin, async (req, res) => {
    try {
      const redis = require("redis");
      const redisUrl = "redis://127.0.0.1:6379";
      const client = redis.createClient(redisUrl);
      const util = require("util");
      client.get = util.promisify(client.get);

      // step1: Do we have any cached data in redis related to this query
      const cachedBlogs = await client.get(req.user.id);

      //step2: if yes then respond to the request right away and return
      if (cachedBlogs) {
        console.log("Serving from cache");
        return res.send(JSON.parse(cachedBlogs));
      }

      //step3: if no then update our cache to store the data
      const blogs = await Blog.find({ _user: req.user.id });

      console.log("Serving from MongoDb");

      res.send(blogs);

      //step4: set the key as query, and value as current blog
      client.set(req.user.id, JSON.stringify(blogs));
    } catch (error) {
      console.error(error);
      return res.status(500).json("Internal Server Error");
    }
  });

  app.post("/api/blogs", requireLogin, async (req, res) => {
    const { title, content } = req.body;

    const blog = new Blog({
      title,
      content,
      _user: req.user.id,
    });

    try {
      await blog.save();
      res.send(blog);
    } catch (err) {
      res.send(400, err);
    }
  });
};
