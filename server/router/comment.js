const express = require("express");
const router = express.Router();
const { Comment } = require("../database/model");

//댓글 추가하기
router.post("/comment/create", async (req, res) => {
  const { content, article, image } = req.body;
  const { authorization } = req.headers;
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
      author: data._id,
      content,
      article,
      commentImgAddress: image,
    };
    const regist_comment = await Comment(payload).save();
    res.send({
      content: regist_comment,
      msg: "댓글이 생성되었습니다",
    });
  });
});

//댓글 수정하기
router.patch("/comment/update", async (req, res) => {
  const { id, author, content } = req.body;
  const updatedComment = await Comment.findOneAndUpdate(
    {
      _id: id,
      author,
    },
    {
      content: content,
    },
    // 업데이트를 실행 한 후의 바뀐 데이터 정보를 받기위한 옵션
    {
      new: true,
    }
  );
  res.send(updatedComment);
});

//댓글 완전(hard) 삭제
router.delete("/comment/delete/hard", async (req, res) => {
  const { id, author } = req.body;
  const deletecomment = await Comment.deleteOne({
    _id: id,
    author,
  });
  res.send(deletecomment);
});

//댓글 소프트 삭제
router.delete("/comment/delete/soft", async (req, res) => {
  const { id, author } = req.body;
  const softDeleteCommnet = await Comment.findOneAndUpdate(
    {
      _id: id,
      author,
    },
    {
      // 30일 이후의 시간을 계산하여 deleteTime에 저장
      deleteTime: new Date().getTime() + 30 * 24 * 60 * 60 * 1000,
    }
  );
  res.send(softDeleteCommnet);
  // 이후 deleteTime이 된다면 서버에서 삭제하는 방식
});

module.exports = router;
