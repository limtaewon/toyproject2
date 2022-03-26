import "./gnb.scss";
import Writing_Modal from "../Modal/WritingModal";
import LoginModal from "../Modal/LoginSignupmodal";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/modules/user";
import {
  set_login_then_close,
  set_login_then_open_window,
  set_write_then_close,
  set_write_then_open_window,
} from "../../store/modules/modal";
import "bootstrap/dist/css/bootstrap.css";

const GNB = () => {
  const login = useSelector((state) => state.user.login);
  const login_modal = useSelector((state) => state.modal.login_modal);
  const write_modal = useSelector((state) => state.modal.write_modal);
  const dispatch = useDispatch();

  return (
    <div id="header">
      <LoginModal
        show={login_modal}
        onHide={() => dispatch(set_login_then_close())}
      />
      <Writing_Modal
        show={write_modal}
        onHide={() => dispatch(set_write_then_close())}
      />
      <nav>
        <Link to="/" id="logobox">
          <img src="../images/gnb-logo.png" />
        </Link>
        <ul>
          <div id="left">
            <li>
              <Link to="/">홈</Link>
            </li>
            <li>
              <Link to="/review">기업리뷰</Link>
            </li>
            <li>
              <Link to="/announce">채용공고</Link>
            </li>
          </div>
          <div id="right">
            <section>
              {login ? (
                <Link
                  to="/"
                  className="write"
                  onClick={() => {
                    dispatch(set_write_then_open_window());
                  }}
                >
                  글쓰기
                </Link>
              ) : (
                <Link
                  to="/"
                  className="write"
                  onClick={() => {
                    dispatch(set_login_then_open_window());
                  }}
                >
                  글쓰기
                </Link>
              )}
              {login ? (
                <Link
                  to="/"
                  className="login"
                  onClick={() => {
                    dispatch(logout());
                  }}
                >
                  로그아웃
                </Link>
              ) : (
                <Link
                  to="/"
                  className="login"
                  onClick={() => {
                    dispatch(set_login_then_open_window());
                  }}
                >
                  로그인
                </Link>
              )}
            </section>
          </div>
        </ul>
      </nav>
    </div>
  );
};

export default GNB;
