import React, { useState } from "react";
import '../admin/css/AdminPage.css';

// 더미 데이터
const sampleData = [
  { id: "rep-1022", type: "부적절한 내용", reporter: "user001", target: "corn-0001", date: "2026-01-21", status: "대기", detail: "게시글에 부적절한 내용 포함" },
  { id: "rep-9876", type: "스팸 광고", reporter: "user123", target: "book-1253", date: "2026-01-20", status: "처리완료", detail: "광고 게시글" },
  { id: "rep-8673", type: "스팸 광고", reporter: "user541", target: "testuser234", date: "2026-01-19", status: "처리완료", detail: "광고 게시글" },
];

function AdminPage(props) {
  const columns = ["ID", "Type", "Reporter", "Target", "Date", "Status"];
  const [selectedRow, setSelectedRow] = useState(null);

  const openDetail = (row) => setSelectedRow(row);
  const closeDetail = () => setSelectedRow(null);

  return (
    <>
      <div className="admin-table-container">
        <h2>신고 관리</h2>

        {/* 검색/필터 */}
        <div className="filter-bar">
          <input type="text" placeholder="신고 관리 검색" />
          <select>
            <option value="">상태 선택</option>
            <option value="대기">대기</option>
            <option value="처리완료">처리완료</option>
          </select>
          <button>필터</button>
          <button>초기화</button>
        </div>

        {/* 테이블 */}
        <table className="admin-table">
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col}>{col}</th>
              ))}
              <th>작업</th>
            </tr>
          </thead>
          <tbody>
            {sampleData.map((row) => (
              <tr key={row.id}>
                {columns.map((col) => {
                  const key = col.toLowerCase();
                  return <td key={key}>{row[key]}</td>;
                })}
                <td>
                  <button onClick={() => openDetail(row)}>보기</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* 상세 모달 */}
        {selectedRow && (
          <div className="modal-overlay">
            <div className="modal">
              <h3>신고 정보</h3>
              {Object.keys(selectedRow).map((key) => (
                <p key={key}>
                  <strong>{key}: </strong>
                  {selectedRow[key]}
                </p>
              ))}
              <div className="modal-actions">
                <button>조치</button>
                <button>무혐의</button>
                <button onClick={closeDetail}>닫기</button>
              </div>
            </div>
          </div>
        )}

        {/* 페이지네이션 */}
        <div className="pagination">
          <button>{"<"}</button>
          <span>1 / 1</span>
          <button>{">"}</button>
        </div>
      </div>
    </>
  );
}

export default AdminPage;
