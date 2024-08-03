import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import store from "./redux/store/store";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Error from "./pages/error";
import { Provider } from "react-redux";


import Admin1 from "./pages/admin1";
import Admin from "./pages/Admin";
import Admin2 from "./pages/admin2";
import Admin3 from "./pages/admin3";
import Admin4 from "./pages/admin4";
import Admin5 from "./pages/admin5";
import Admin6 from "./pages/admin6";
import Admin7 from "./pages/admin7";
import Admin8 from "./pages/admin8";
import Admin9 from "./pages/admin9";
import Toast from "./pages/toast";
import Protected from "./pages/protected";

//the best is that i grab the token from local storage and send to server to verify and bring back boolean
// const [user, setuser] = useState("");
const user = localStorage.getItem("client");

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <Provider store={store}>
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin1" element={<Admin1 />} />
        <Route path="/admin2" element={<Admin2 />} />
        <Route path="/admin3" element={<Admin3 />} />
        {/* <Route
          path="/admin4"
          element={
            <Protected user={user}>
              <Admin4 />
            </Protected>
          }
        /> */}
         <Route path="/admin4" element={<Admin4 />} />
        <Route path="/admin5" element={<Admin5 />} />
        <Route path="/admin6" element={<Admin6 />} />
        <Route path="/admin7" element={<Admin7 />} />
        <Route path="/" element={<Admin6 />} />
        <Route path="*" element={<Error />} />

        <Route path="/admin8/:email/verify/:token" element={<Admin8 />} />
        <Route path="/admin9/:email/verify/:token" element={<Admin9 />} />
      </Routes>
    </Provider>
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebSkills(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-Skills
