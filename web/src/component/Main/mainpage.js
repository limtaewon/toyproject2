import BestBoard from "./BestBoard";
import "./mainpage.scss";
import Searchbar from "./serachbar";
//serchbar
//베스트게시판
//게시판들
//옆 사이드 바
const MainPage = () => {
  return (
    <>
      <div id="wrapper">
        <section className="serchboard">
          <Searchbar />
          <BestBoard />
        </section>
      </div>
    </>
  );
};

export default MainPage;
