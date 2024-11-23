import React, { useEffect, useState } from "react";
import axios from "axios";

import "./style.css";

const TeacherPage = () => {
  const [teachers, setTeachers] = useState([]);
  const [pagination, setPagination] = useState({}); // phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10); //10 là mặc định đi
  const handleLimitChange = (e) => {
    setLimit(parseInt(e.target.value, 10)); //cập nhật limit (cơ sở 10,đảm bảocác giá trị xử lý đúng trong hệ thập phân )
    setCurrentPage(1); // Đặt lại trang hiện tại về 1 khi thay đổi limit
  };
  // Gọi API lấy danh sách giáo viên
  const fetchTeachers = async (page) => {
    try {
      const response = await axios.get("http://localhost:8080/teachers", {
        params: { page, limit },
      });
      const { data, pagination } = response.data;
      setTeachers(data);
      setPagination(pagination);
    } catch (error) {
      console.error("Error fetching teachers:", error);
    }
  };

  useEffect(() => {
    fetchTeachers(currentPage);
  }, [currentPage]);

  return (
    <div className="teacherPage">
      <h3>Giáo viên</h3>
      <div className="tableTeacherList">
        <div className="tableFrame">
          <input type="text" placeholder="Tìm kiếm thông tin" />
          <button className="reload" onClick={() => fetchTeachers(currentPage)}>
            Tải lại
          </button>
          <button className="create">Tạo mới</button>
        </div>
        <div className="tableHeader">
          <div className="code">Mã</div>
          <div className="teacher">Giáo viên</div>
          <div className="level">Trình độ</div>
          <div className="subject">Bộ môn</div>
          <div className="position">TT Công tác</div>
          <div className="address">Địa chỉ</div>
          <div className="status">Trạng thái</div>
          <div className="active">Hành động</div>
        </div>
        <div className="tableList">
          {teachers.map((teacher) => (
            <div key={teacher.code} className="teacherRow">
              <div className="code">{teacher.code}</div>
              <div className="teacher">
                <img src="./public/slider2_9.png" alt="" />
                <div className="teacherInfor">
                  <div className="name">{teacher.name}</div>
                  <div className="email">{teacher.email}</div>
                </div>
              </div>
              <div className="level">
                {teacher.degrees.map((degree, index) => (
                  <div key={index}>
                    {typeof degree === "object" ? (
                      <p>
                        <div className="type">Bậc: {degree.type}</div>
                        <div className="major">
                          Chuyên ngành: {degree.major}
                        </div>
                      </p>
                    ) : (
                      degree
                    )}
                  </div>
                ))}
              </div>
              <div className="subject">N/A</div>
              <div className="position">{teacher.position}</div>
              <div className="address">{teacher.address}</div>
              <div className="status">
                {teacher.isActive ? "Đang công tác" : "Không hoạt động"}
              </div>
              <div className="active">
                <button>Chi tiết</button>
              </div>
            </div>
          ))}
        </div>
        <div className="tableBottom">
          <div className="totalItem">Tổng: {pagination.totalTeachers}</div>
          <div className="pageList">
            {Array.from({ length: pagination.totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => setCurrentPage(index + 1)}
                className={currentPage === index + 1 ? "activePage" : ""}
              >
                {index + 1}
              </button>
            ))}
          </div>
          <select
            value={limit} // Đặt giá trị limit hiện tại
            onChange={handleLimitChange} // Cập nhật limit khi thay đổi
          >
            <option value="10">10 items/trang</option>
            <option value="20">20 items/trang</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default TeacherPage;
