const cookieParser = require("cookie-parser");
const express = require("express");
const indexRouter = require("./routers");
const app = express();
const port = 3000;
const { sequelize } = require("./models");
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("시퀄라이즈 연결성공");
  })
  .catch((err) => {
    console.error(err);
  });

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);

app.listen(port, () => {
  console.log(port, "포트로 서버가 열렸어요!");
});
