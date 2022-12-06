const express = require("express");
const router = express.Router();
const { Posts, Users } = require("../models");
const auth = require("../middleware/auth");

//게시글 생성
router.post("/", auth, async (req, res) => {
  try {
    const { title, content } = req.body;
    const { userId } = res.locals.user;
    if (!title || !content) {
      return res
        .status(412)
        .json({ errorMessage: "데이터 형식이 올바르지 않습니다." });
    }
    console.log(title, content, userId);
    await Posts.create({ title, content, userId }); // nickname 외래키는 어디서 가지고 오는가?
    res.json({ message: "게시글 작성에 성공하였습니다." });
  } catch (err) {
    console.log(err, "게시글생성 에러");
    res.status(400).json({ errorMessage: "게시글 작성에 실패하였습니다." });
  }
});
//include 쓰는법?

//게시글 조회
//User.nickname 위치변경 및 모델nickname삭제, 좋아요 갯수 추가 (현재null) 필요
router.get("/", auth, async (req, res) => {
  try {
    const data = await Posts.findAll({
      attributes: { exclude: ["content"] },
      order: [["postId", "DESC"]],
      include: { model: Users, attributes: ["nickname"] },
      raw: true,
    });
    res.json({ data });
  } catch (err) {
    console.error(err);
    res.status(400).json({ errorMessage: "게시글 조회에 실패하였습니다.1" });
  }
});
// router.get("/", auth, async (req, res) => {
//   try {
//     const data = await Posts.findAll({
//       attributes: {
//         exclude: ["content"],
//       },
//       // order: [["postId", "DESC"]],
//     });
//     res.json({ data });
//   } catch (err) {
//     console.error(err);
//     res.status(400).json({ errorMessage: "게시글 조회에 실패하였습니다." });
//   }
// });

//게시글 상세조회
// Users 테이블에서 nickname 값을 긁어와야함
router.get("/:postId", auth, async (req, res) => {
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
router.put("/:postId", auth, async (req, res) => {});

module.exports = router;
