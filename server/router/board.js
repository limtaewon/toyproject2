const express = require("express");
const router = express.Router();
const { Board, Article } = require("../database/model");

//메인페이지에 게시판 목록 띄우기
router.get("/main", async (req, res) => {
  //find() 한다면 배열형식으로 모든 데이터를 불러온다.
  const mainboard = await Board.find().sort({ title: 1 });
  //데이터를 다 불러왔는데 배열이 아니라고 뜨면 데이터가 하나도 없는거
  if (!Array.isArray(mainboard)) {
    return res.send({
      msg: "Board 데이터가 없습니다",
    });
  }
  // 게시판별 게시글(배열)을 배열형태로 묶어서 전달해줄 객체
  let contentList = [];

  // map함수로 return되는 객체들을 한번에 묶어서 보내주기위하여 하는 작업
  Promise.all(
    mainboard.map(async (b) => {
      //게시판의 고유 아이디를 통하여 그 게시판의 아이디를 가지고있는 게시글을 배열형태로 불러오기
      const recentArticle = await Article.find({ board: b._id })
        .sort({ board: 1 })
        .limit(5);
      //해당 게시판에 게시글이 없다면 오류 출력
      if (!Array.isArray(recentArticle)) {
        return res.send({
          msg: "Article 데이터가 없습니다",
        });
      }
      contentList.push({
        ...b._doc,
        content: recentArticle,
      });
    })
  )
    .then(() => {
      res.send({
        content: contentList,
        msg: "불러오기 성공",
      });
    })
    .catch((err) => {
      console.error(err);
      res.send({
        content: null,
        msg: "에러발생",
      });
    });
});

// 관리자기능 : 게시판 추가하기
router.post("/board/create", async (req, res) => {
  const { title, slug } = req.body;
  const regist_board = await Board({
    title,
    slug,
  }).save();

  res.send(regist_board._id ? true : false);
  //게시판 추가 제대로 됐는지 확인하는 코드
  //게시판 추가 제대로 됐으면 true 아니면 false가 반환된다.
});

//게시판 게시글 불러오기
router.get("/board/:slug", async (req, res) => {
  const { slug } = req.params;

  const board = await Board.findOne({ slug: slug });
  if (!board._id) {
    return res.send({
      article: [],
      msg: "존재하지 않는 게시판",
      error: "404",
    });
  }
  const article = await Article.find({ board: board._id }).populate({
    path: "author",
    populate: { path: "company" },
  });

  res.send({ article: article, msg: "게시글 정보 불러오기" });
});

//게시판 목록 불러오기
router.get("/board/get/list", async (req, res) => {
  const board = await Board.find();
  res.send(board);
});

module.exports = router;
