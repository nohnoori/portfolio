import React, {
  useState,
  useEffect,
  useReducer,
  createContext,
  useContext,
} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import * as Api from "./api";
import { loginReducer } from "./reducer";

import Header from "./components/Header";
import LoginForm from "./components/user/LoginForm";
import Network from "./components/user/Network";
import RegisterForm from "./components/user/RegisterForm";
import Portfolio from "./components/Portfolio";
import CompanyPortfolio from "./components/CompanyPortfolio";
import EmailSend from "./components/user/EmailSend";

export const UserStateContext = createContext(null);
export const DispatchContext = createContext(null);
export const ClassifierContext = createContext(null);

function App() {
  // useReducer 훅을 통해 userState 상태와 dispatch함수를 생성함.
  const [userState, dispatch] = useReducer(loginReducer, {
    user: null,
  });

  //userType의 초기값을 localStorage에 있는 값으로 초기화
  //처음에는 빈 값(null)
  const [userType, setUserType] = useState(
    window.localStorage.getItem("state")
  );

  // 아래의 fetchCurrentUser 함수가 실행된 다음에 컴포넌트가 구현되도록 함.
  // 아래 코드를 보면 isFetchCompleted 가 true여야 컴포넌트가 구현됨.
  const [isFetchCompleted, setIsFetchCompleted] = useState(false);

  const fetchCurrentUser = async () => {
    const apiUrl = userType === "user" ? "user/current" : "company/current";
    setUserType(() => {
      apiUrl === "user/current" ? "user" : "company";
    });
    console.log("새로고침 후 setUserType값: ", userType);
    console.log("새로고침 후 apiUrl값: ", apiUrl); //FIXME

    try {
      // 이전에 발급받은 토큰이 있다면, 이를 가지고 유저 정보를 받아옴.
      const res = await Api.get(apiUrl);
      const currentUser = res.data;

      // dispatch 함수를 통해 로그인 성공 상태로 만듦.
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: currentUser,
      });

      console.log("%c sessionStorage에 토큰 있음.", "color: #d93d1a;");
    } catch {
      console.log("%c SessionStorage에 토큰 없음.", "color: #d93d1a;");
    }
    // fetchCurrentUser 과정이 끝났으므로, isFetchCompleted 상태를 true로 바꿔줌
    setIsFetchCompleted(true);
  };

  // useEffect함수를 통해 fetchCurrentUser 함수를 실행함.
  useEffect(() => {
    fetchCurrentUser();
  }, []); // 한번만 실행하게 됨

  if (!isFetchCompleted) {
    return "loading...";
  }

  return (
    <DispatchContext.Provider value={dispatch}>
      <UserStateContext.Provider value={userState}>
        <ClassifierContext.Provider value={setUserType}>
          <Router>
            <Header />
            <Routes>
              <Route
                path="/"
                exact
                element={
                  userType === "user" ? <Portfolio /> : <CompanyPortfolio />
                }
              />
              <Route path="/reset" element={<EmailSend />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/register" element={<RegisterForm />} />
              <Route path="/users/:userId" element={<Portfolio />} />
              <Route path="/network" element={<Network />} />
              <Route path="*" element={<Portfolio />} />
            </Routes>
          </Router>
        </ClassifierContext.Provider>
      </UserStateContext.Provider>
    </DispatchContext.Provider>
  );
}

export default App;
