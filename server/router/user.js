const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const { User } = require("../database/model");

// 회원가입
// password를 회원가입시 인풋값으로 받아와서 user에게 전달해 준다면 미리 해놓은 설정대로
// salt,hashedPassword 생성이 진행됨.
router.post("/user/create", async (req, res) => {
  const { email, password, nickname, company } = req.body;
  //여기서 company는 company객체가 생성될때 자동으로 만들어진 ObjectId값이 입력되어야함
  const regist_user = await User({
    email,
    password,
    nickname,
    company,
  }).save();

  //회원가입이 제대로 됐는지 확인하는 코드
  //회원가입이 제대로 됐으면 true 아니면 false가 반환된다.
  res.send(regist_user._id ? true : false);
});

//로그인
//로그인 시 jwt가 발행되고 관리되어야한다.
router.post("/user/login", async (req, res) => {
  const { email, password } = req.body;

  // 이메일이 회원정보에 있는지 확인하는 코드
  const login_user = await User.findOne({ email: email });
  // 없다면 오류를 보냄
  if (!login_user._id) {
    return res.send({
      error: "401.1",
      msg: "존재하지 않는 이메일 입니다.",
    });
  }
  // 해당 아이디의 저장된 hashedPassword와 password가 같은지 확인하는 코드
  if (!login_user.authenticate(password)) {
    return res.send({
      error: "401.1",
      msg: "비밀번호가 맞지 않습니다.",
    });
  }

  // jwt을 발행하는 과정
  const secret = req.app.get("jwt-secret");

  const token = jwt.sign(
    {
      id: login_user._id,
      email: login_user.email,
      nickname: login_user.nickname,
    }, // payload
    secret, // secret
    {
      expiresIn: "7d", //만료일
      issuer: "toyproject", //설명
      subject: "auth",
    } //header
  );

  // 둘다 맞다면 로그인 됐다는걸 보내주는 코드
  res.send({
    email: login_user.email,
    nickname: login_user.nickname,
    token: token,
    msg: "로그인 되었습니다",
  });
});

//정보변경

//회원탈퇴

//프로필 변경

//토큰확인
router.get("/user/token", (req, res) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.send("token is broken");
  }
  const secret = req.app.get("jwt-secret");
  const token = authorization.split(" ")[1];
  jwt.verify(token, secret, (err, data) => {
    //data에는 로그인할 때 사용했던 유저의 정보(user schema)가 들어있다.
    if (err) {
      return res.send(err);
    }
    res.send({
      email: data.email,
      nickname: data.nickname,
      token: token,
    });
  });
});

module.exports = router;
