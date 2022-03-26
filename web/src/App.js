import GNB from "./component/GNB/gnb";
import { Switch, Route } from "react-router-dom";
import MainPage from "./component/Main/mainpage.js";
import "./asset/global.scss";
import { useDispatch } from "react-redux";
import { token } from "./store/modules/user";
import axios from "axios";
import "./App.css";

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
        </Switch>
      </div>
    </>
  );
}

export default App;
