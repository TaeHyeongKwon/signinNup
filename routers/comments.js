const express = require("express");
const router = express.Router();
const { Posts, Users, Comments } = require("../models");
const auth = require("../middleware/auth");

//댓글생성
router.post("/:postId", auth, async (req, res) => {
  try {
    const { comment } = req.body;
    const { postId } = req.params;
    const { userId, nickname } = res.locals.user;
    const post = await Posts.findByPk(postId);
    if (comment == "") {
      return res
        .status(400)
        .json({ errorMessage: "댓글 내용을 입력해주세요." });
    } else {
      if (postId == post.postId) {
        await Comments.create({ userId, nickname, comment, postId });
        return res.json({ message: "댓글을 작성하였습니다." });
      } else {
        throw err;
      }
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ errorMessage: "댓글 작성에 실패하였습니다." });
  }
});

//댓글조회
router.get("/:postId", async (req, res) => {
  try {
    const data = await Comments.findAll({
      attributes: { exclude: ["postId"] },
      order: [["commentId", "DESC"]],
    });
    res.json({ data });
  } catch (err) {
    console.error(err);
    res.status(400).json({ errorMessage: "댓글 조회에 실패하였습니다." });
  }
});

//댓글수정
router.put("/:commentId", auth, async (req, res) => {
  try {
    const { userId } = res.locals.user;
    const { commentId } = req.params;
    const { comment } = req.body;
    const comments = await Comments.findByPk(commentId);
    if (!comment) {
      return res
        .status(412)
        .json({ errorMessage: "데이터 형식이 올바르지 않습니다." });
    }
    if (!comments) {
      return res
        .status(404)
        .json({ errorMessage: "댓글이 존재하지 않습니다." });
    } else {
      if (userId === comments.userId) {
        await Comments.update({ comment: comment }, { where: { commentId } });
        return res.json({ message: "댓글을 수정하였습니다." });
      } else {
        return res
          .status(400)
          .json({ errorMessage: "내가 작성한 댓글이 아닙니다." });
      }
    }
  } catch (err) {
    console.error(err);
    res.status(400).json({ errorMessage: "댓글 수정에 실패하였습니다." });
  }
});

//댓글삭제
router.delete("/:commentId", auth, async (req, res) => {
  try {
    const { userId } = res.locals.user;
    const { commentId } = req.params;
    const comments = await Comments.findByPk(commentId);
    if (!comments) {
      res.status(400).json({ errorMessage: "댓글이 존재하지 않습니다." });
    } else {
      if (userId === comments.userId) {
        await Comments.destroy({ where: { commentId } });
        return res.json({ message: "댓글을 삭제하였습니다." });
      } else {
        return res.status(400).json({
          errorMessage: "내가 작성한 댓글이 아니라면 삭제할 수 없습니다.",
        });
      }
    }
  } catch (err) {
    console.error(err);
    res.status(400).json({ errorMessage: "댓글 삭제에 실패하였습니다." });
  }
});
module.exports = router;
