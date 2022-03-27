import "./asset/global.scss";
import "./App.css";
import GNB from "./component/GNB/gnb";
import MainPage from "./component/Main/mainpage.js";
import TopicPage from "./component/Topic/TopicPage";
import { Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { token } from "./store/modules/user";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const dispatch = useDispatch();
  axios
    .get("http://localhost:8080/user/token", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      dispatch(token(res));
    });

  return (
    <>
      <GNB />
      <div id="body">
        <Switch>
          <Route exact={true} path="/">
            <MainPage />
          </Route>
          <Route exact={true} path="/board/:slug">
            <TopicPage />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default App;
