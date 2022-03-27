import "./TopicPage.scss";
import time from "../../method/time";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { FiEye, FiThumbsUp, FiMessageSquare } from "react-icons/fi";

const TopicPage = () => {
  const [boardList, setBoardList] = useState([]);
  const [articleList, setArticleList] = useState([]);
  const { slug } = useParams();
  const body = { slug: slug };

  useEffect(async () => {
    await axios
      .get("http://localhost:8080/board/get/list")
      .then((res) => setBoardList(res))
      .catch((err) => {
        console.error(err);
      });

    await axios
      .get(`http://localhost:8080/board/${slug}`, body)
      .then((res) => setArticleList(res));
  }, []);

  console.log(articleList);
  return (
    <section id="topic">
      <section id="select-topicbar">
        <div id="topicbar">
          {boardList.data &&
            boardList.data.map((b) => {
              return slug === b.slug ? (
                <a href={`/board/${b.slug}`} id="selecttopic" key={b._id}>
                  {b.title}
                </a>
              ) : (
                <a className="notselect" href={`/board/${b.slug}`} key={b._id}>
                  {b.title}
                </a>
              );
            })}
        </div>
      </section>
      <section id="show-topic">
        <div id="article-wrapper">
          {articleList.data &&
            articleList.data.article.map((a) => {
              return (
                <div key={a._id} className="article-container">
                  <Link className="article-title" to={`/article/${a.title}`}>
                    {a.title}
                  </Link>
                  <Link className="article-content" to={`/article/${a.title}`}>
                    {a.content}
                  </Link>
                  <div className="author-info">
                    <span>{a.author.nickname}</span>
                  </div>
                  <div className="article-info">
                    <div className="vtc">
                      <div>
                        <FiEye />
                        <span>{a.viewCount}</span>
                      </div>
                      <div>
                        <FiThumbsUp />
                        <span>{a.thumbupCount}</span>
                      </div>
                      <div>
                        <FiMessageSquare />
                        <span>{a.commentCount}</span>
                      </div>
                    </div>
                    <div className="create">
                      <span>{time(a.createdAt)}</span>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </section>
    </section>
  );
};

export default TopicPage;
