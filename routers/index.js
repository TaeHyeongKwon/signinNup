const express = require("express");
const router = express.Router();

const postsRouter = require("./posts.js");
const commentsRouter = require("./comments.js");
const signRouter = require("./sign.js");
const likeRouter = require("./likes.js");

router.use("/", signRouter);
router.use("/posts", [postsRouter, likeRouter]);
router.use("/comments", commentsRouter);

router.get("/", (req, res) => {
  res.send("Hello");
});

module.exports = router;
