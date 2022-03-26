const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//게시판정보
const Board = new Schema({
  title: { type: String, required: true, unique: true },
  slug: { type: String, requird: true, unique: true },
  createdAt: { type: Date, default: Date.now, required: true },
});

module.exports = Board;
