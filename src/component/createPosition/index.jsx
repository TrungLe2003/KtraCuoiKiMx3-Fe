import { useState } from "react";
import axios from "axios"; // Import axios để gọi API
import "./style.css";

const CreatePosition = (props) => {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [des, setDes] = useState("");
  const [isActive, setIsActive] = useState(true); // Trạng thái mặc định là hoạt động

  const handleSubmit = async (e) => {
    e.preventDefault(); // Ngăn form reload lại trang
    try {
      const newPosition = { code, name, des, isActive };
      const response = await axios.post(
        "http://localhost:8080/teacher-positions",
        newPosition
      );
      alert("Vị trí công tác mới đã được tạo thành công!");
      console.log(response.data); // Xem dữ liệu trả về
    } catch (error) {
      alert("Đã xảy ra lỗi khi tạo vị trí công tác!");
      console.error("Error creating position:", error);
    }
  };

  return (
    <div className="createPosition">
      <div className="content">
        <div className="frame1">
          <div className="closeModel" onClick={props.onClose}>
            X
          </div>
          <h2 className="modelName">Vị trí công tác</h2>
        </div>
        <form className="form" onSubmit={handleSubmit}>
          <div className="frame">
            <div className="title">
              * <span>Mã</span>
            </div>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
          </div>
          <div className="frame">
            <div className="title">
              * <span>Tên</span>
            </div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="frame">
            <div className="title">
              * <span>Mô tả</span>
            </div>
            <input
              type="text"
              value={des}
              onChange={(e) => setDes(e.target.value)}
              required
            />
          </div>
          <div className="frame2">
            <div className="title">
              * <span>Trạng thái</span>
            </div>
            <div className="chooseStatus">
              <label>
                <input
                  type="radio"
                  name="status"
                  checked={isActive}
                  onChange={() => setIsActive(true)}
                />
                Hoạt động
              </label>
              <label>
                <input
                  type="radio"
                  name="status"
                  checked={!isActive}
                  onChange={() => setIsActive(false)}
                />
                Ngừng hoạt động
              </label>
            </div>
          </div>
          <button type="submit">Lưu</button>
        </form>
      </div>
    </div>
  );
};

export default CreatePosition;
