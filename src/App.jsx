import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import TeacherPage from "./component/teacherPage";
import PositionPage from "./component/position";
import { useNavigate } from "react-router-dom";
import ClassSence from "../public/Class";
import Student from "../public/Student";
import Statistic from "../public/Statistic";
import MentorIcon from "../public/mentor";
import DataIcon from "../public/Data";
import "./App.css";

function App() {
  const nav = useNavigate();
  return (
    <div className="homePage">
      <div className="header">
        <h3>School System</h3>
      </div>
      <div className="frame1">
        <div className="menu">
          <div className="frame">
            <Statistic></Statistic>
            <div className="title">Thống kê</div>
          </div>
          <div className="frame">
            <ClassSence></ClassSence>
            <div className="title">Lớp học</div>
          </div>
          <div className="frame">
            <Student></Student>
            <div className="title">Học sinh</div>
          </div>
          <div
            onClick={() => {
              nav("/teachers");
            }}
            className="frame"
          >
            <MentorIcon></MentorIcon>
            <div className="title">Giáo viên</div>
          </div>
          <div className="frame">
            <DataIcon></DataIcon>
            <div className="title">Dữ liệu</div>
          </div>
          <div
            onClick={() => {
              nav("/teacher-positions");
            }}
            className="positions"
          >
            Vị trí công tác{" "}
          </div>
        </div>
        <div className="content">
          <Routes>
            <Route
              path="/teachers"
              element={<TeacherPage></TeacherPage>}
            ></Route>
            <Route
              path="/teacher-positions"
              element={<PositionPage></PositionPage>}
            ></Route>
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
