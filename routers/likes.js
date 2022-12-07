const express = require("express");
const router = express.Router();
const { Posts, Postlikes } = require("../models");
const auth = require("../middleware/auth");

//게시글 좋아요
router.put("/:postId/like", auth, async (req, res) => {
  try {
    const { userId } = res.locals.user;
    const { postId } = req.params;
    const post = await Posts.findByPk(postId);
    if (!post) {
      return res
        .status(404)
        .json({ errorMessage: "게시글이 존재하지 않습니다." });
    }
    const postlike = await Postlikes.findOne({ where: { postId, userId } });
    if (!postlike) {
      await Postlikes.create({ userId, postId });
      return res.json({ userId, postId, result: true });
    } else {
      await Postlikes.destroy({ where: { userId, postId } });
      return res.json({ userId, postId, result: false });
    }
  } catch (err) {
    console.error(err);
    res.status(400).json({ errorMessage: "게시글 좋아요에 실패하였습니다." });
  }
});

module.exports = router;
