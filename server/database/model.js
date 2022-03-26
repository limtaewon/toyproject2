const mongoose = require("mongoose");
const schema = require("./schema");

const db = mongoose.connection;
const URL =
  "mongodb+srv://limtaewon:toyproject@toyproject.0g7yr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const model = (() => {
  db.on("error", console.error);
  db.on("open", () => {
    console.log("Connecting mongodb!");
  });

  // 몽고디비 앱 엑세스 주소
  mongoose.connect(URL);

  // 스키마 연결
  const model = {};
  for (let key in schema) {
    model[key] = mongoose.model(key, schema[key]);
  }
  return model;
})();

module.exports = model;
