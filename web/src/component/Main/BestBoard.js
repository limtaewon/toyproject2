import "./BestBoard.scss";
import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FiThumbsUp, FiMessageSquare } from "react-icons/fi";
const BestBoard = () => {
  const [article, setArticle] = useState([]);

  useEffect(async () => {
    await axios
      .get(`http://localhost:8080/article/best/li st`)
      .then((res) => {
        setArticle(res);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div id="BestBoard">
      <section id="best-header">
        <h2>토픽 베스트</h2>
        <Link to="/board/best">더보기 > </Link>
      </section>
      <section id="best-contents">
        <ul>
          {article.data &&
            article.data.map((a) => {
              return (
                <li key={a._id}>
                  <span className="board-title">
                    <Link to={`/board/${a.board.slug}`}>{a.board.title}</Link>
                  </span>
                  <span className="article-title">
                    <Link to={`/article/${a._id}`}>{a.title}</Link>
                  </span>
                  <div className="wrap-info">
                    <div className="thumbup">
                      <FiThumbsUp size="1em" />
                      <p>{a.thumbupCount}</p>
                    </div>
                    <div className="comment">
                      <FiMessageSquare size="1em" />
                      <p>{a.commentCount}</p>
                    </div>
                  </div>
                </li>
              );
            })}
        </ul>
      </section>
    </div>
  );
};

export default BestBoard;
