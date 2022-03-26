const express = require("express");
const cors = require("cors");
const {
  article,
  board,
  comment,
  company,
  reply,
  user,
} = require("./router/index");
const db = require("./database/model");
const PORT = 8080;
const app = express();

//토큰 비밀 코드 -> 숨겨야하는지 찾아보기
const SECRET = "!@#!@ESDADFSFG#@$1213";

// req 부분에 들어갈 app에 jwt-secret이라는 변수명으로 비밀코드 작성
app.set("jwt-secret", SECRET);

app.use(cors());
//req.body에 있는 json읽기
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//라우터 연결
app.use(article);
app.use(board);
app.use(comment);
app.use(company);
//app.use(reply);
app.use(user);

//기본페이지 연결 테스팅
app.get("/", (req, res) => {
  res.send("Server is Running!");
});
app.post("/", (req, res) => {
  const { name } = req.body;
  res.send(name);
});

//서버연결
app.listen(PORT, "localhost", () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
