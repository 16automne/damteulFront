import React, { useState } from 'react';
import '../admin/styles/PostAdminPage.css'; // 공통 관리자 테이블 스타일
// import ReportAdminModal from './ReportAdminModal';
// import { useNavigate } from 'react-router-dom';
import { sampleReports } from './data/sampleReports';


/* =================================================
   2️⃣ ReportAdminPage
================================================= */
const ReportAdminPage = () => {
  // const navigate = useNavigate();

  /* =================================================
     🔹 [모달 제어 상태]
     - 현재 선택된 신고 데이터
     - null이면 모달 닫힘
  ================================================= */
  // const [selectedReport, setSelectedReport] = useState(null);

  /* -------------------------------------------------
     🔹 입력 전용 상태 (즉시 반응 ❌)
     - 검색 input, select 값
     - 검색 버튼을 눌러야 실제 필터 적용됨
  ------------------------------------------------- */
  const [inputKeyword, setInputKeyword] = useState('');
  const [inputStatus, setInputStatus] = useState('');

  /* -------------------------------------------------
     🔹 실제 검색 상태 (필터 적용용)
  ------------------------------------------------- */
  const [keyword, setKeyword] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  /* -------------------------------------------------
     🔹 페이지네이션 상태
  ------------------------------------------------- */
  const [currentPage, setCurrentPage] = useState(1);
  const reportsPerPage = 10;

  /* -------------------------------------------------
     🔹 검색 버튼 클릭 시 실행
     - 입력값 → 실제 필터 상태로 반영
     - 페이지는 항상 1로 초기화
  ------------------------------------------------- */
  const handleSearch = () => {
    setKeyword(inputKeyword);
    setStatusFilter(inputStatus);
    setCurrentPage(1);
  };

  /* -------------------------------------------------
     🔹 최신 신고가 위로 오도록 정렬
  ------------------------------------------------- */
  const reportsDescending = [...sampleReports].sort(
    (a, b) => b.id - a.id
  );

  /* -------------------------------------------------
     🔹 필터링 로직
     - 검색 버튼 클릭 후에만 반영됨
  ------------------------------------------------- */
  const filteredReports = reportsDescending.filter(report => {
    const matchStatus = statusFilter
      ? report.status === statusFilter
      : true;

    const matchKeyword =
      report.reporter.includes(keyword) ||
      report.reported.includes(keyword);

    return matchStatus && matchKeyword;
  });

  /* -------------------------------------------------
     🔹 페이지네이션 계산
  ------------------------------------------------- */
  const indexOfLast = currentPage * reportsPerPage;
  const indexOfFirst = indexOfLast - reportsPerPage;
  const currentReports = filteredReports.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredReports.length / reportsPerPage);

  /* =================================================
     🔹 렌더링 시작
  ================================================= */
  return (
    <div className="reportStatusWrapper">
      <div className="adminPageContainer">

        {/* =========================
         🔹 페이지 헤더
      ========================= */}
        <div className="adminHeader">
          <h2 className="adminTitle">신고 관리</h2>
          <span className="adminDesc">
            신고된 게시글 및 사용자를 관리합니다
          </span>
        </div>

        {/* =========================
         🔹 검색 / 필터 영역
      ========================= */}
        <div className="filterBar">
          <div className="searchBox">
            <input
              type="text"
              placeholder=" 신고자 / 신고 대상 검색"
              value={inputKeyword}
              onChange={(e) => setInputKeyword(e.target.value)}
            />
          </div>

          <select
            value={inputStatus}
            onChange={(e) => setInputStatus(e.target.value)}
          >
            <option value="">전체 상태</option>
            <option value="보류">보류</option>
            <option value="승인">승인</option>
            <option value="반려">반려</option>
          </select>

          <button onClick={handleSearch}>검색</button>

          {/* 🔹 필터 초기화 */}
          <button
            onClick={() => {
              setInputKeyword('');
              setInputStatus('');
              setKeyword('');
              setStatusFilter('');
              setCurrentPage(1);
            }}
          >
            초기화
          </button>
        </div>

        {/* =========================
         🔹 신고 목록 테이블
      ========================= */}
        <table className="adminTable">
          <thead>
            <tr>
              <th>ID</th>
              <th>카테고리</th>
              <th>신고자</th>
              <th>신고 대상</th>
              <th>신고 일시</th>
              <th>처리 상태</th>
              <th>관리</th>
            </tr>
          </thead>

          <tbody>
            {currentReports.length === 0 ? (
              <tr>
                <td colSpan="7">신고 내역이 없습니다.</td>
              </tr>
            ) : (
              currentReports.map(report => (
                <tr key={report.id}>
                  <td>{report.id}</td>
                  <td>{report.category}</td>
                  <td>{report.reporter}</td>
                  <td>{report.reported}</td>
                  <td>{report.createdAt}</td>

                  {/* 🔹 상태 뱃지 */}
                  <td>
                    {/* <span
                    className={`statusBadge ${report.status === '보류'
                      ? 'new'
                      : report.status === '승인'
                        ? 'used'
                        : 'ignored'
                      }`}
                  > */}

                    <span className={`statusBadge ${report.status}`}>
                      {report.status}
                    </span>

                  </td>

                  {/* =========================
                   🔹 관리 버튼 영역
                ========================= */}
                  {/* <td>
                  🔹 처리 버튼 → 모달 오픈
                  <button
                    className="btn-sm"
                    onClick={() => setSelectedReport(report)}
                  >
                    처리
                  </button>

                  <button className="btn-sm danger">
                    삭제
                  </button>
                </td> */}

                  {/* <td>
                  <button
                    className="btn-sm gearButton"
                    onClick={() => setSelectedReport(report)}
                    title="신고 처리"
                  >
                    ⚙
                  </button>
                </td> */}
                  <button
                    className="btn-sm gearButton"
                    onClick={() => {
                      const url = `/admin/reports/detail/${report.id}`;
                      window.open(url, '_blank', 'width=1000,height=800'); // 새 창
                    }}

                  //     window.open(`/admin/reports/detail/${report.id}`, '_blank')}
                  //   title="신고 상세"
                  >
                    ⚙
                  </button>




                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* =========================
         🔹 페이지네이션
      ========================= */}
        <div className="pagination">
          <button
            onClick={() =>
              setCurrentPage(prev => Math.max(prev - 1, 1))
            }
            disabled={currentPage === 1}
          >
            {'<'}
          </button>

          <span>
            {currentPage} / {totalPages || 1}
          </span>

          <button
            onClick={() =>
              setCurrentPage(prev =>
                Math.min(prev + 1, totalPages)
              )
            }
            disabled={currentPage === totalPages || totalPages === 0}
          >
            {'>'}
          </button>
        </div>

        {/* =================================================
         🔹 [중요] 신고 상세/처리 모달 렌더링 위치
         - 페이지 최하단
         - selectedReport가 있을 때만 표시
      ================================================= */}
        {/* {selectedReport && (
        <ReportAdminModal
          report={selectedReport}
          onClose={() => setSelectedReport(null)}
          onComplete={(updatedReport) => {
            console.log('처리 결과:', updatedReport);
            setSelectedReport(null);
          }}
        />
      )} */}
      </div>
    </div>
  );
};

export default ReportAdminPage;
