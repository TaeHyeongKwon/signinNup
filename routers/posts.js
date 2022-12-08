const express = require("express");
const router = express.Router();
const { Posts, Postlikes, sequelize } = require("../models");
const auth = require("../middleware/auth");

//게시글 생성
router.post("/", auth, async (req, res) => {
  try {
    const { title, content } = req.body;
    const { userId, nickname } = res.locals.user;
    console.log(userId);
    if (!title || !content) {
      return res
        .status(412)
        .json({ errorMessage: "데이터 형식이 올바르지 않습니다." });
    }
    await Posts.create({ title, content, userId, nickname });
    res.json({ message: "게시글 작성에 성공하였습니다." });
  } catch (err) {
    console.error(err);
    res.status(400).json({ errorMessage: "게시글 작성에 실패하였습니다." });
  }
});

//게시글 목록 조회
router.get("/", async (req, res) => {
  try {
    const data = await Posts.findAll({
      order: [["postId", "DESC"]],
      include: [{ model: Postlikes, attributes: [] }],
      attributes: [
        "postId",
        "userId",
        "nickname",
        "title",
        "createdAt",
        "updatedAt",
        [sequelize.fn("COUNT", sequelize.col("Postlikes.userId")), "likes"],
      ],
      group: "postId",
    });
    res.json({ data });
  } catch (err) {
    console.error(err);
    res.status(400).json({ errorMessage: "게시글 조회에 실패하였습니다.1" });
  }
});

//좋아요 게시글 조회
router.get("/like", auth, async (req, res) => {
  try {
    const { userId } = res.locals.user;
    const userLikes = await Postlikes.findAll({
      where: { userId },
      include: [
        {
          model: Posts,
          attributes: [
            "postId",
            "userId",
            "nickname",
            "title",
            "createdAt",
            "updatedAt",
            [sequelize.fn("COUNT", sequelize.col("Postlikes.userId")), "likes"],
          ],
          group: "postId",
        },
      ],
      attributes: [],
    });
    res.json({ userLikes });
  } catch {
    console.log(error);
    res
      .status(400)
      .json({ errorMessage: "좋아요 게시글 조회에 실패하였습니다." });
  }
});

//게시글 조회
router.get("/:postId", async (req, res) => {
  try {
    const { postId } = req.params;
    const data = await Posts.findByPk(postId);
    res.json({ data });
  } catch (err) {
    console.error(err);
    res.status(400).json({ errorMessage: "게시글 조회에 실패하였습니다.2" });
  }
});

//게시글 수정
router.put("/:postId", auth, async (req, res) => {
  try {
    const { userId } = res.locals.user;
    const { postId } = req.params;
    const { title, content } = req.body;
    const posts = await Posts.findByPk(postId);
    if (!title || !content)
      return res
        .status(400)
        .json({ message: "데이터 형식이 올바르지 않습니다.3" });
    if (posts) {
      console.log(posts.userId, userId);
      if (posts.userId === userId) {
        await Posts.update(
          { title: title, content: content },
          { where: { postId } }
        );
        return res.status(201).json({ message: "게시글을 수정하였습니다." });
      } else {
        return res
          .status(400)
          .json({ message: "내가 작성한 게시글이 아닙니다." });
      }
    }
  } catch (err) {
    return res.status(404).json({ message: "게시글 조회에 실패하였습니다." });
  }
});

//게시글 삭제
router.delete("/:postId", auth, async (req, res) => {
  try {
    const { userId } = res.locals.user;
    const { postId } = req.params;
    const posts = await Posts.findByPk(postId);
    if (!posts) {
      return res.status(400).json({ message: "게시글 존재하지 않습니다." });
    } else {
      if (userId === posts.userId) {
        await Posts.destroy({ where: { postId } });
        return res.json({ message: "게시글을 삭제하였습니다." });
      } else {
        return res
          .status(400)
          .json({ message: "내가 작성한 게시글이 아니면 삭제할 수 없습니다." });
      }
    }
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: "게시글 삭제에 실패하였습니다." });
  }
});

module.exports = router;
