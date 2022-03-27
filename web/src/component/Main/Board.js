import "./Board.scss";
import { Link } from "react-router-dom";
import { FiThumbsUp, FiMessageSquare } from "react-icons/fi";

const Board = ({ boardList }) => {
  return (
    <div className="Board">
      <section className="board-header">
        <div>
          <h2>{boardList.title}</h2>
        </div>
        <Link to={`/board/${boardList.slug}`}>더보기</Link>
      </section>
      <section className="board-contents">
        <ul>
          {boardList.content &&
            boardList.content.map((a) => {
              return (
                <li key={a._id}>
                  <span className="board-title">
                    <Link to={`/board/${boardList.slug}`}>
                      {boardList.title}
                    </Link>
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

export default Board;
