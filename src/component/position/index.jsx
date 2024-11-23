import React, { useEffect, useState } from "react";
import axios from "axios";
import CreatePosition from "../createPosition";
import "./style.css";

const PositionPage = () => {
  const [positions, setPositions] = useState([]);
  const [positionModel, setPositionModel] = useState(false);
  const fetchPosition = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/teacher-positions"
      );
      console.log(response);
      const { data } = response.data;
      setPositions(data);
    } catch (error) {
      console.error("Error fetching teachers:", error);
    }
  };

  let PositionModel = null;

  if (positionModel) {
    PositionModel = (
      <CreatePosition
        onClose={() => {
          setPositionModel(false);
        }}
      ></CreatePosition>
    );
  }

  const openPositionModel = () => {
    setPositionModel(true);
  };
  // Gọi dữ liệu khi component được render lần đầu tiên
  useEffect(() => {
    fetchPosition();
  }, []);

  return (
    <div className="PositionPage">
      {PositionModel}
      <h3>Dữ liệu</h3>
      <div className="tablePositionList">
        <div className="tableFrame">
          <button className="reload">Tải lại</button>
          <button className="create" onClick={openPositionModel}>
            Tạo mới
          </button>
        </div>
        <div className="tableHeader">
          <div className="stt">STT</div>
          <div className="code">Mã</div>
          <div className="name">Tên</div>
          <div className="status">Trạng thái</div>
          <div className="des">Mô tả</div>
        </div>
        <div className="tableList">
          {positions.map((position, index) => (
            <div key={position.code} className="positionRow">
              <div className="stt">{index + 1}</div>
              <div className="code">{position.code}</div>
              <div className="name">{position.name}</div>
              <div className="status">
                {position.isActive ? "Hoạt động" : "Không hoạt động"}
              </div>
              <div className="des">{position.des}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PositionPage;
