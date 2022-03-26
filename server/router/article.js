const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { Article } = require("../database/model");

// 글 생성
router.post("/article/create", async (req, res) => {
  const { authorization } = req.headers;
  const { title, content, board, image } = req.body;

  if (!authorization) {
    return res.send("token is broken");
  }
  const secret = req.app.get("jwt-secret");
  const token = authorization.split(" ")[1];
  jwt.verify(token, secret, async (err, data) => {
    //data에는 로그인할 때 사용했던 유저의 정보가 들어있다.
    if (err) {
      return res.send(err);
    }
    const payload = {
      author: data.id,
      title,
      content,
      board,
      articleImgAddress: image,
    };

    const regist_article = await Article(payload).save();
    res.send(regist_article._id);
  });
});

// 글 불러오기
router.get("/article/:key", async (req, res) => {
  const { key } = req.params;
  const article = await Article.findOne({ key: key })
    .populate("board")
    .populate({
      path: "author",
      populate: { path: "company" },
    });
  res.send(article);
});

//베스트토픽 글 불러오기 ,sort(viewcount), limit(10)
router.get("/article/best/list", async (req, res) => {
  const article = await Article.find()
    .populate("board")
    .sort({ viewCount: 1 })
    .limit(10);
  if (!Array.isArray(article)) {
    return res.send({
      msg: "Article 데이터가 없습니다",
    });
  }
  res.send(article);
});

// 글 수정하기

// 동적으로 변할 수 있는 데이터값 변경시켜주기

module.exports = router;
