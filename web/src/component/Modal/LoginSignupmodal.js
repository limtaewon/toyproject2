import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../store/modules/user";
import "./LoginSignupModal.scss";
import { Link } from "react-router-dom";

import axios from "axios";

const LoginModal = (props) => {
  const { show, onHide } = props;

  const dispatch = useDispatch();

  const [inputID, setInputID] = useState(null);
  const [inputPW, setInputPW] = useState(null);

  const onEmailHandler = (e) => {
    setInputID(e.currentTarget.value);
  };
  const onPasswordHandler = (e) => {
    setInputPW(e.currentTarget.value);
  };
  const onSubmit = async (e) => {
    e.preventDefault();

    const body = { email: inputID, password: inputPW };

    const data = await axios
      .post("http://localhost:8080/user/login", body)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.error(err);
      });
    if (data.data.error) {
      alert("아이디 혹은 비밀번호가 틀렸습니다");
      return;
    }
    dispatch(login(data));
    window.location.replace("/");
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
        <Modal.Title id="contained-modal-title-vcenter">로그인</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div id="email">
            <label for="user-email">이메일</label>
            <input
              id="user-email"
              type="email"
              value={inputID}
              onChange={onEmailHandler}
              placeholder="email을 입력해주세요"
            ></input>
          </div>
          <div id="password">
            <label for="user-pw">비밀번호</label>
            <input
              id="user-pw"
              type="password"
              value={inputPW}
              onChange={onPasswordHandler}
              placeholder="pw를 입력해주세요"
            ></input>
          </div>
          <button onClick={onSubmit}>로그인</button>
        </form>
        <div className="signup">
          <Link to="/signup">회원가입창으로 이동</Link>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LoginModal;
