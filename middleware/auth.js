const { Users } = require("../models");
const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  const authorization = req.cookies.token;

  if (!authorization) {
    res.status(401).send({
      errorMessage: "로그인 후 이용 가능한 기능입니다1.",
    });
    return;
  }

  // 해당하는 jwt 가 유효한가에 대한 검증과 복호화
  try {
    const { userId } = jwt.verify(authorization, "secret-key");
    Users.findByPk(userId).then((user) => {
      res.locals.user = user;
      next();
    });
  } catch (err) {
    console.log(err);
    res.status(401).send({
      errorMessage: "로그인 후 이용 가능한 기능입니다2.",
    });
  }
};
