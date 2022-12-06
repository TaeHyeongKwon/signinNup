const express = require("express");
const router = express.Router();
const { Posts, Users, Comments } = require("../models");
const auth = require("../middleware/auth");

//댓글생성
router.post("/:postId", auth, async (req, res) => {
  try {
    const { comment } = req.body;
    const { postId } = req.params;
    const { userId } = res.locals.user;
    const post = await Posts.findByPk(postId);
    if (postId == post.postId) {
      const data = await Comments.create({ userId, comment, postId });
      return res.json({ data, message: "댓글을 작성하였습니다." });
    }
  } catch (err) {
    console.error(err);
    res.status(400).json({ errorMessage: "댓글 작성에 실패하였습니다." });
  }
});

module.exports = router;
