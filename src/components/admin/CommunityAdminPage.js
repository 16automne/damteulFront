import React, { useState } from 'react';
import '../admin/styles/PostAdminPage.css'; // 통일된 스타일

// 샘플 커뮤니티 게시글 20개 생성, 상태는 '진행중'과 '종료' 섞음
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
  { id: 110, category: '재활용/나눔', title: '옷 나눔 모임', date: '2026-01-13', status: '진행중' },
  { id: 109, category: '반려동물', title: '반려동물 용품 교환', date: '2026-01-12', status: '종료' },
  { id: 108, category: '직업', title: '코딩 스터디', date: '2026-01-11', status: '진행중' },
  { id: 107, category: '유아/교육', title: '아이 그림 그리기 모임', date: '2026-01-10', status: '종료' },
  { id: 106, category: '중고 거래', title: '중고 스마트폰 나눔', date: '2026-01-09', status: '진행중' },
  { id: 105, category: '재활용/나눔', title: '책 무료 나눔', date: '2026-01-08', status: '종료' },
  { id: 104, category: '반려동물', title: '강아지 용품 교환', date: '2026-01-07', status: '진행중' },
  { id: 103, category: '직업', title: '디자인 워크샵', date: '2026-01-06', status: '종료' },
  { id: 102, category: '유아/교육', title: '유아 놀이 모임', date: '2026-01-05', status: '진행중' },
  { id: 101, category: '중고 거래', title: '중고 장난감 교환', date: '2026-01-04', status: '종료' },
];

const CommunityAdminPage = () => {
  const [keyword, setKeyword] = useState(''); // 검색어 상태
  const [statusFilter, setStatusFilter] = useState(''); // 전체 상태 필터 (진행중/종료)
  const [currentPage, setCurrentPage] = useState(1); // 페이지네이션 현재 페이지
  const communitiesPerPage = 5; // 한 페이지당 5개 게시글

  // 최신 ID가 상단에 오도록 내림차순 정렬
  const communitiesDescending = [...sampleCommunities].sort((a, b) => b.id - a.id);

  // 필터링: 상태 + 키워드 (제목, 카테고리)
  const filteredCommunities = communitiesDescending.filter(item => {
    const matchStatus = statusFilter ? item.status === statusFilter : true; // 상태 필터
    const matchKeyword = item.title.includes(keyword) || item.category.includes(keyword); // 검색어 필터
    return matchStatus && matchKeyword;
  });

  // 페이지네이션 계산
  const indexOfLast = currentPage * communitiesPerPage;
  const indexOfFirst = indexOfLast - communitiesPerPage;
  const currentCommunities = filteredCommunities.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredCommunities.length / communitiesPerPage);

  return (
    <div className="adminPageContainer">
      {/* 페이지 헤더 */}
      <div className="adminHeader">
        <h2 className="adminTitle">커뮤니티 관리</h2>
        <span className="adminDesc">커뮤니티 게시글과 모임 상태를 관리합니다</span>
      </div>

      {/* 검색창 + 상태 필터 */}
      <div className="filterBar">
        <div className="searchBox">
          <input
            type="text"
            placeholder="🔍 제목/카테고리 검색"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>

        {/* 상태 필터 추가 */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">전체 상태</option>
          <option value="진행중">진행중</option>
          <option value="종료">종료</option>
        </select>

        <button>검색</button>
        <button onClick={() => { setKeyword(''); setStatusFilter(''); }}>초기화</button>
      </div>

      {/* 테이블 */}
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
                  {/* 상태 표시 배지 */}
                  <span className={`statusBadge ${item.status === '진행중' ? 'new' : 'used'}`}>
                    {item.status}
                  </span>
                </td>
                <td>
                  <button className="btn-sm">완료 처리</button>
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

export default CommunityAdminPage;
