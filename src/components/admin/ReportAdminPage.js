import React, { useState } from 'react';
import '../admin/styles/PostAdminPage.css'; // 공통 관리자 테이블 스타일
import ReportAdminModal from './ReportAdminModal';
// 🔹 [모달 컴포넌트] 신고 상세/처리 모달 import
import { IoSettingsOutline } from "react-icons/io5";

/* =================================================
   1️⃣ 샘플 신고 데이터 (임시)
   - 실제로는 API 응답으로 대체될 영역
================================================= */
const sampleReports = [
  { id: 120, category: '게시글에 부적합한 내용', reporter: 'user020', reported: 'userA', createdAt: '2026-01-23', status: '처리중' }, { id: 119, category: '사기가 의심돼요', reporter: 'user019', reported: 'userB', createdAt: '2026-01-22', status: '완료' }, { id: 118, category: '거래 금지 물품이에요', reporter: 'user018', reported: 'userC', createdAt: '2026-01-21', status: '무시' }, { id: 117, category: '게시글에 도배함', reporter: 'user017', reported: 'userD', createdAt: '2026-01-20', status: '처리중' }, { id: 116, category: '사기가 의심돼요', reporter: 'user016', reported: 'userE', createdAt: '2026-01-19', status: '완료' }, { id: 115, category: '거래 금지 물품이에요', reporter: 'user015', reported: 'userF', createdAt: '2026-01-18', status: '무시' }, { id: 114, category: '게시글에 부적합한 내용', reporter: 'user014', reported: 'userG', createdAt: '2026-01-17', status: '처리중' }, { id: 113, category: '게시글에 도배함', reporter: 'user013', reported: 'userH', createdAt: '2026-01-16', status: '완료' }, { id: 112, category: '사기가 의심돼요', reporter: 'user012', reported: 'userI', createdAt: '2026-01-15', status: '처리중' }, { id: 111, category: '거래 금지 물품이에요', reporter: 'user011', reported: 'userJ', createdAt: '2026-01-14', status: '완료' }, { id: 110, category: '게시글에 부적합한 내용', reporter: 'user010', reported: 'userK', createdAt: '2026-01-13', status: '처리중' }, { id: 109, category: '게시글에 도배함', reporter: 'user009', reported: 'userL', createdAt: '2026-01-12', status: '완료' }, { id: 108, category: '사기가 의심돼요', reporter: 'user008', reported: 'userM', createdAt: '2026-01-11', status: '처리중' }, { id: 107, category: '거래 금지 물품이에요', reporter: 'user007', reported: 'userN', createdAt: '2026-01-10', status: '무시' }, { id: 106, category: '게시글에 부적합한 내용', reporter: 'user006', reported: 'userO', createdAt: '2026-01-09', status: '완료' }, { id: 105, category: '게시글에 도배함', reporter: 'user005', reported: 'userP', createdAt: '2026-01-08', status: '처리중' }, { id: 104, category: '사기가 의심돼요', reporter: 'user004', reported: 'userQ', createdAt: '2026-01-07', status: '완료' }, { id: 103, category: '거래 금지 물품이에요', reporter: 'user003', reported: 'userR', createdAt: '2026-01-06', status: '무시' }, { id: 102, category: '게시글에 부적합한 내용', reporter: 'user002', reported: 'userS', createdAt: '2026-01-05', status: '처리중' }, { id: 101, category: '게시글에 도배함', reporter: 'user001', reported: 'userT', createdAt: '2026-01-04', status: '완료' },];

/* =================================================
   2️⃣ ReportAdminPage
================================================= */
const ReportAdminPage = () => {

  /* =================================================
     🔹 [모달 제어 상태]
     - 현재 선택된 신고 데이터
     - null이면 모달 닫힘
  ================================================= */
  const [selectedReport, setSelectedReport] = useState(null);

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
          <option value="처리중">처리중</option>
          <option value="완료">완료</option>
          <option value="무시">무시</option>
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
                  <span
                    className={`statusBadge ${report.status === '처리중'
                      ? 'new'
                      : report.status === '완료'
                        ? 'used'
                        : 'ignored'
                      }`}
                  >
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

                <td>
                  <button
                    className="btn-sm gearButton"
                    onClick={() => setSelectedReport(report)}
                    title="신고 처리"
                  >
                    <IoSettingsOutline />
                  </button>
                </td>

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
      {selectedReport && (
        <ReportAdminModal
          report={selectedReport}
          onClose={() => setSelectedReport(null)}
          onComplete={(updatedReport) => {
            console.log('처리 결과:', updatedReport);
            setSelectedReport(null);
          }}
        />
      )}

    </div>
  );
};

export default ReportAdminPage;
