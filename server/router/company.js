const express = require("express");
const router = express.Router();
const { Company } = require("../database/model");

// 관리자기능1 : 회사 추가하기
router.post("/company/create", async (req, res) => {
  const { name } = req.body;
  const regist_company = await Company({
    name,
  }).save();

  res.send(regist_company._id ? true : false);
  //회사 추가 제대로 됐는지 확인하는 코드
  //회사 추가 제대로 됐으면 true 아니면 false가 반환된다.
});

//회사의 평점 작성
router.patch("/company/review", async (req, res) => {
  const { name, Score } = req.body;
  const update_reviewScore = await Company.findOneAndUpdate(
    { name: name },
    { reviewScore: Score } // 스코어값 받아서 평균 구해서 넣는 코드 작성
  );
  res.send("updated_complete");
});

//관리자기능 2 : 회사 이미지 추가,변경

module.exports = router;
