import { Modal, Button } from "react-bootstrap";
import "./WritingModal.scss";
import "bootstrap/dist/css/bootstrap.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  current_select,
  board_id,
  board_drop,
  board_drop_off,
} from "../../store/modules/board";
import { set_write_then_close } from "../../store/modules/modal";
import { AiOutlineDown } from "react-icons/ai";

import axios from "axios";

const Writing_Modal = (props) => {
  const { show, onHide } = props;

  const is_drop = useSelector((state) => state.board.is_drop);
  const select = useSelector((state) => state.board.select);
  const board = useSelector((state) => state.board.id);

  const dispatch = useDispatch();

  const [boardlist, setBoardlist] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  function dropClick() {
    dispatch(board_drop());
  }
  function dropoffClick() {
    dispatch(board_drop_off());
  }
  function txareaHandler(e) {
    setContent(e.currentTarget.value);
  }
  function inputHandler(e) {
    setTitle(e.currentTarget.value);
  }

  useEffect(() => {
    axios.get("http://localhost:8080/board/get/list").then((res) => {
      setBoardlist(res.data);
    });
  }, []);

  const article_regist = async () => {
    const body = {
      title: title,
      board: board,
      content: content,
    };
    await axios.post("http://localhost:8080/article/create", body, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    setTitle("");
    setContent("");
    dispatch(set_write_then_close());
  };

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <h5>글쓰기</h5>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div id="writing-wrapper">
          <section id="select-categori">
            {is_drop ? (
              <div className="dropbox">
                <a className="selected" onClick={dropoffClick}>
                  {select}
                  <AiOutlineDown size="1em" />
                </a>

                {boardlist.map((x, index) => {
                  return (
                    <div
                      className="current-select"
                      key={x._id}
                      onClick={() => {
                        dispatch(board_id(boardlist[index]._id));
                        dispatch(current_select(boardlist[index].title));
                        dropoffClick();
                      }}
                    >
                      {boardlist[index].title}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div>
                <a className="selected" onClick={dropClick}>
                  {select}
                  <AiOutlineDown size="1em" />
                </a>
              </div>
            )}
          </section>
          <section id="make_article">
            <input
              placeholder="제목"
              type="text"
              value={title}
              onChange={inputHandler}
            ></input>
            <textarea
              type="text"
              placeholder="내용을 입력해 주세요"
              value={content}
              onChange={txareaHandler}
            ></textarea>
          </section>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={article_regist}>등록</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Writing_Modal;
