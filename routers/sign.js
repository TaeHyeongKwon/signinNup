const express = require("express");
const router = express.Router();

const { Users } = require("../models");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize"); // ?이건 조건줄때 사용하는 건데 어떻게 쓰는건가??

//회원가입 기능
router.post("/signup", async (req, res) => {
  const { nickname, password, confirm } = req.body;
  // if (password !== confirm) {
  //     res.status(412).json({ errorMessage: "패스워드가 일치하지 않습니다." })
  //     return
  // }
  // if (password.length < 4 ) {
  //     res.status(412).json({ errorMessage: "패스워드에 닉네임이 포함되어 있습니다." })
  //     return
  // }
  // 모델에서 validate로 커스터마이징을 만들어서 password랑 nickname를 관리하는게 나은가??
  await Users.create({ nickname, password });
  res.status(201).json({ message: "회원가입 완료" });
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
    if (!user || password !== user.password) {
      return res
        .status(412)
        .json({ Message: "닉네임 또는 패스워드를 확인 해 주세요" });
    }
    const token = jwt.sign({ userId: user.userId }, "secret-key");
    //여기 암호키는 그냥 암꺼나 써도 되나???? .env 쓰는법
    res.cookie("token", token);
    return res.json({ Message: "로그인 완료", token });
  } catch (error) {
    res.status(400).json({ errorMessage: "로그인에 실패하였습니다." });
  }
});

module.exports = router;
