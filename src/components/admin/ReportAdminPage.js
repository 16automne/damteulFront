import React, { useState } from 'react';
import '../admin/styles/PostAdminPage.css'; // PostAdminPage와 동일 스타일 사용

const sampleReports = [
  { id: 120, category: '게시글에 부적합한 내용', reporter: 'user020', reported: 'userA', createdAt: '2026-01-23', status: '처리중' },
  { id: 119, category: '사기가 의심돼요', reporter: 'user019', reported: 'userB', createdAt: '2026-01-22', status: '완료' },
  { id: 118, category: '거래 금지 물품이에요', reporter: 'user018', reported: 'userC', createdAt: '2026-01-21', status: '무시' },
  { id: 117, category: '게시글에 도배함', reporter: 'user017', reported: 'userD', createdAt: '2026-01-20', status: '처리중' },
  { id: 116, category: '사기가 의심돼요', reporter: 'user016', reported: 'userE', createdAt: '2026-01-19', status: '완료' },
  { id: 115, category: '거래 금지 물품이에요', reporter: 'user015', reported: 'userF', createdAt: '2026-01-18', status: '무시' },
  { id: 114, category: '게시글에 부적합한 내용', reporter: 'user014', reported: 'userG', createdAt: '2026-01-17', status: '처리중' },
  { id: 113, category: '게시글에 도배함', reporter: 'user013', reported: 'userH', createdAt: '2026-01-16', status: '완료' },
  { id: 112, category: '사기가 의심돼요', reporter: 'user012', reported: 'userI', createdAt: '2026-01-15', status: '처리중' },
  { id: 111, category: '거래 금지 물품이에요', reporter: 'user011', reported: 'userJ', createdAt: '2026-01-14', status: '완료' },
  { id: 110, category: '게시글에 부적합한 내용', reporter: 'user010', reported: 'userK', createdAt: '2026-01-13', status: '처리중' },
  { id: 109, category: '게시글에 도배함', reporter: 'user009', reported: 'userL', createdAt: '2026-01-12', status: '완료' },
  { id: 108, category: '사기가 의심돼요', reporter: 'user008', reported: 'userM', createdAt: '2026-01-11', status: '처리중' },
  { id: 107, category: '거래 금지 물품이에요', reporter: 'user007', reported: 'userN', createdAt: '2026-01-10', status: '무시' },
  { id: 106, category: '게시글에 부적합한 내용', reporter: 'user006', reported: 'userO', createdAt: '2026-01-09', status: '완료' },
  { id: 105, category: '게시글에 도배함', reporter: 'user005', reported: 'userP', createdAt: '2026-01-08', status: '처리중' },
  { id: 104, category: '사기가 의심돼요', reporter: 'user004', reported: 'userQ', createdAt: '2026-01-07', status: '완료' },
  { id: 103, category: '거래 금지 물품이에요', reporter: 'user003', reported: 'userR', createdAt: '2026-01-06', status: '무시' },
  { id: 102, category: '게시글에 부적합한 내용', reporter: 'user002', reported: 'userS', createdAt: '2026-01-05', status: '처리중' },
  { id: 101, category: '게시글에 도배함', reporter: 'user001', reported: 'userT', createdAt: '2026-01-04', status: '완료' },
];

const ReportAdminPage = () => {
  const [statusFilter, setStatusFilter] = useState('');
  const [keyword, setKeyword] = useState('');
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
  const reportsPerPage = 5; // 한 페이지에 보여줄 신고 개수

  // 최신 ID가 상단에 오도록 내림차순 정렬
  const reportsDescending = [...sampleReports].sort((a, b) => b.id - a.id);

  // 상태와 검색 키워드로 필터링
  const filteredReports = reportsDescending.filter(report => {
    const matchStatus = statusFilter ? report.status === statusFilter : true;
    const matchKeyword = report.reporter.includes(keyword) || report.reported.includes(keyword);
    return matchStatus && matchKeyword;
  });

  // 페이지네이션 계산
  const indexOfLast = currentPage * reportsPerPage; // 현재 페이지 마지막 인덱스
  const indexOfFirst = indexOfLast - reportsPerPage; // 현재 페이지 첫번째 인덱스
  const currentReports = filteredReports.slice(indexOfFirst, indexOfLast); // 현재 페이지에 표시할 신고

  const totalPages = Math.ceil(filteredReports.length / reportsPerPage); // 총 페이지 수

  return (
    <div className="adminPageContainer">
      {/* 페이지 헤더 */}
      <div className="adminHeader">
        <h2 className="adminTitle">신고 관리</h2>
        <span className="adminDesc">신고된 게시글 및 사용자를 관리합니다</span>
      </div>

      {/* 필터 영역 */}
      <div className="filterBar">
        <div className="searchBox">
          <input
            type="text"
            placeholder=" 신고자/신고 대상 검색"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">전체 상태</option>
          <option value="처리중">처리중</option>
          <option value="완료">완료</option>
          <option value="무시">무시</option>
        </select>

        <button>검색</button>
        <button onClick={() => { setKeyword(''); setStatusFilter(''); }}>
          초기화
        </button>
      </div>

      {/* 신고 테이블 */}
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
                <td>
                  <span className={`statusBadge ${report.status === '처리중' ? 'new' :
                    report.status === '완료' ? 'used' : 'ignored'
                    }`}>
                    {report.status}
                  </span>
                </td>
                <td>
                  <button className="btn-sm">처리</button>
                  <button className="btn-sm danger">삭제</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* 페이지네이션 */}
      <div className="pagination">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          {'<'}
        </button>
        <span>{currentPage} / {totalPages}</span>
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          {'>'}
        </button>
      </div>
    </div>
  );
};

export default ReportAdminPage;
