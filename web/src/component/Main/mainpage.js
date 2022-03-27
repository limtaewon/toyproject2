import BestBoard from "./BestBoard";
import Board from "./Board";
import "./mainpage.scss";
import Searchbar from "./serachbar";
import axios from "axios";
import { useEffect, useState } from "react";
//serchbar
//베스트게시판
//게시판들
//옆 사이드 바
const MainPage = () => {
  const [boardList, setBoardList] = useState([]);

  useEffect(async () => {
    await axios
      .get("http://localhost:8080/main")
      .then((res) => {
        setBoardList(res);
      })
      .catch((err) => console.error(err));
  }, []);
  return (
    <>
      <div id="wrapper">
        <section id="serchboard">
          <Searchbar />
        </section>
        <section id="board">
          <BestBoard />

          <div className="board-wrapper">
            {boardList.data &&
              boardList.data.content.map((b) => {
                return <Board key={b._id} boardList={b} />;
              })}
          </div>
        </section>
      </div>
    </>
  );
};

export default MainPage;
