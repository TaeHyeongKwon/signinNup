const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const jwt = require("jsonwebtoken");

//회원가입 기능
router.post("/signup", async (req, res) => {
  try {
    const { nickname, password, confirm } = req.body;
    const users = await Users.findOne({ where: { nickname } });
    const regex = /^[a-zA-Z0-9]{3,}$/;
    if (users) {
      return res.status(412).json({ errorMessage: "중복된 닉네임 입니다." });
    } else if (!nickname.match(regex)) {
      return res
        .status(412)
        .json({ errorMessage: "닉네임의 형식이 일치하지 않습니다." });
    } else if (password !== confirm) {
      res.status(412).json({ errorMessage: "패스워드가 일치하지 않습니다." });
      return;
    } else if (password.length < 4 || password.includes(nickname)) {
      res.status(412).json({
        errorMessage:
          "패스워드 형식이 일치하지 않거나, 패스워드에 닉네임이 포함되어 있습니다",
      });
      return;
    }
    await Users.create({ nickname, password });
    return res.status(201).json({ message: "회원가입 완료" });
  } catch (err) {
    console.error(err);
    res
      .status(400)
      .json({ errorMessage: "요청한 데이터 형식이 올바르지 않습니다." });
  }
});

//회원가입 데이터 확인 나중에 꼭 지울 것!
router.get("/signup", async (req, res) => {
  data = await Users.findAll({});
  res.json({ data });
});

//로그인 기능
router.post("/login", async (req, res) => {
  try {
    const { nickname, password } = req.body;
    const user = await Users.findOne({ where: { nickname } });
    if (!user || password != user.password) {
      return res
        .status(412)
        .json({ Message: "닉네임 또는 패스워드를 확인 해 주세요" });
    }
    const token = jwt.sign(
      { userId: user.userId, nickname: user.nickname },
      "secret-key"
    );
    res.cookie("token", token);
    return res.json({ Message: "로그인 완료", token });
  } catch (error) {
    res.status(400).json({ errorMessage: "로그인에 실패하였습니다." });
  }
});

module.exports = router;
