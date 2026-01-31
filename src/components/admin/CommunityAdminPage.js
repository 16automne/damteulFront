import React, { useState } from 'react';
import '../admin/styles/PostAdminPage.css'; // 관리자 페이지 공통 스타일
import CommunityAdminModal from './CommunityAdminModal';

/* ===========================
   1️⃣ 샘플 커뮤니티 데이터
=========================== */

const sampleCommunities = [
  { id: 120, category: '재활용/나눔', title: '동네 나눔 장터', date: '2026-01-23', status: '진행중' },
  { id: 119, category: '반려동물', title: '강아지 산책 모임', date: '2026-01-22', status: '종료' },
  { id: 118, category: '직업', title: '프리랜서 직무 공유', date: '2026-01-21', status: '진행중' },
  { id: 117, category: '유아/교육', title: '유아 배움 모임', date: '2026-01-20', status: '종료' },
  { id: 116, category: '중고 거래', title: '중고 도서 교환', date: '2026-01-19', status: '진행중' },
  { id: 115, category: '재활용/나눔', title: '가구 무료 나눔', date: '2026-01-18', status: '종료' },
  { id: 114, category: '반려동물', title: '고양이 돌봄 모임', date: '2026-01-17', status: '진행중' },
  { id: 113, category: '직업', title: '취업 정보 공유', date: '2026-01-16', status: '종료' },
  { id: 112, category: '유아/교육', title: '영어 놀이 모임', date: '2026-01-15', status: '진행중' },
  { id: 111, category: '중고 거래', title: '중고 가전 판매', date: '2026-01-14', status: '종료' },
];

/* ===========================
   2️⃣ CommunityAdminPage
=========================== */

const CommunityAdminPage = () => {
  /* ===========================
     🔹 입력용 상태 (타이핑만)
  =========================== */
  const [inputKeyword, setInputKeyword] = useState('');
  const [inputStatus, setInputStatus] = useState('');

  /* ===========================
     🔹 실제 검색 적용 상태
     (검색 버튼 클릭 시에만 변경)
  =========================== */
  const [keyword, setKeyword] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  /* ===========================
     🔹 페이지네이션 상태
  =========================== */
  const [currentPage, setCurrentPage] = useState(1);

  /* ===========================
   🔹 선택된 커뮤니티 (모달용)
=========================== */
  const [selectedCommunity, setSelectedCommunity] = useState(null);

  const communitiesPerPage = 10;

  /* ===========================
     3️⃣ 검색 버튼 클릭 로직
     - 검색 조건 적용
     - 페이지 1로 초기화
  =========================== */
  const handleSearch = () => {
    setKeyword(inputKeyword);
    setStatusFilter(inputStatus);
    setCurrentPage(1);
  };

  /* ===========================
     4️⃣ 최신글 우선 정렬
  =========================== */
  const sortedCommunities = [...sampleCommunities].sort(
    (a, b) => b.id - a.id
  );

  /* ===========================
     5️⃣ 필터링 로직
     - 상태 필터
     - 제목/카테고리 검색
  =========================== */
  const filteredCommunities = sortedCommunities.filter(item => {
    const matchStatus = statusFilter
      ? item.status === statusFilter
      : true;

    const matchKeyword = keyword
      ? item.title.includes(keyword) ||
      item.category.includes(keyword)
      : true;

    return matchStatus && matchKeyword;
  });

  /* ===========================
     6️⃣ 페이지네이션 계산
  =========================== */
  const indexOfLast = currentPage * communitiesPerPage;
  const indexOfFirst = indexOfLast - communitiesPerPage;
  const currentCommunities = filteredCommunities.slice(
    indexOfFirst,
    indexOfLast
  );
  const totalPages = Math.ceil(
    filteredCommunities.length / communitiesPerPage
  );

  return (
    <div className="adminPageContainer">
      {/* 헤더 */}
      <div className="adminHeader">
        <h2 className="adminTitle">커뮤니티 관리</h2>
        <span className="adminDesc">
          커뮤니티 게시글과 모임 상태를 관리합니다
        </span>
      </div>

      {/* ===========================
         🔍 검색 / 필터 영역
      =========================== */}
      <div className="filterBar">
        <div className="searchBox">
          <input
            type="text"
            placeholder=" 카테고리 / 제목 검색"
            value={inputKeyword}
            onChange={(e) => setInputKeyword(e.target.value)}
          />
        </div>

        <select
          value={inputStatus}
          onChange={(e) => setInputStatus(e.target.value)}
        >
          <option value="">전체 상태</option>
          <option value="진행중">진행중</option>
          <option value="종료">종료</option>
        </select>

        {/* 🔹 검색 버튼 클릭 시에만 실제 검색 */}
        <button onClick={handleSearch}>검색</button>

        {/* 🔹 입력값 + 검색 조건 + 페이지 초기화 */}
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

      {/* ===========================
         📋 커뮤니티 테이블
      =========================== */}
      <table className="adminTable">
        <thead>
          <tr>
            <th>ID</th>
            <th>카테고리</th>
            <th>제목</th>
            <th>모임 날짜</th>
            <th>상태</th>
            <th>관리</th>
          </tr>
        </thead>
        <tbody>
          {currentCommunities.length === 0 ? (
            <tr>
              <td colSpan="6">게시글이 없습니다.</td>
            </tr>
          ) : (
            currentCommunities.map(item => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.category}</td>
                <td>{item.title}</td>
                <td>{item.date}</td>
                <td>
                  <span
                    className={`statusBadge ${item.status === '진행중' ? 'new' : 'used'
                      }`}
                  >
                    {item.status}
                  </span>
                </td>
                {/* <td>
                  <button
                    className="btn-sm"
                    onClick={() => setSelectedCommunity(item)}
                  >
                    관리
                  </button>

                  <button className="btn-sm danger">삭제</button>
                </td> */}

                <td>
                  <button
                    className="btn-sm"
                    onClick={() => setSelectedCommunity(item)}
                    title="관리"
                    aria-label="관리"
                  >
                    ⚙
                  </button>
                </td>

              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* ===========================
         📄 페이지네이션
      =========================== */}
      <div className="pagination">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          {'<'}
        </button>
        <span>{currentPage} / {totalPages || 1}</span>
        <button
          onClick={() =>
            setCurrentPage(prev => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          {'>'}
        </button>
      </div>

      <CommunityAdminModal
        community={selectedCommunity}
        onClose={() => setSelectedCommunity(null)}
        onComplete={(id, status) => {
          console.log(id, status);
          setSelectedCommunity(null);
        }}
        onDelete={(id) => {
          console.log(id);
          setSelectedCommunity(null);
        }}
      />

    </div>
  );
};

export default CommunityAdminPage;
