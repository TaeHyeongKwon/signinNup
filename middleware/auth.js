// 모델, jwt 가 필요
const { Users } = require("../models"); // 객체로 가져올 때 뭐가 다른가?
const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  // const { authorization } = req.headers;
  const authorization = req.cookies.token;
  // 배열구조분해 할당           bearer을 때고 jwt값을 분리
  // const [authType, authToken] = (authorization || "").split(" ");
  // authType : Bearer // authToken : jwt값
  // 1. Bearer 타입이 아닐때
  // 2. 값이 없을 때
  // if (!authToken || authType !== "Bearer") {
  if (!authorization) {
    res.status(401).send({
      errorMessage: "로그인 후 이용 가능한 기능입니다1.",
    });
    return;
  }

  // 해당하는 jwt 가 유효한가에 대한 검증과 복호화
  try {
    const { userId } = jwt.verify(authorization, "secret-key");
    // const user = await User.findByPk(userId);
    // res.locals.user = user;
    // next();

    // await을 사용하지않을 때 api의 async를 제거하고 아래와 같이 사용
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
