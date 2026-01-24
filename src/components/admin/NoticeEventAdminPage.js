import React, { useState } from 'react';
import '../admin/styles/PostAdminPage.css'; // 통일된 스타일 사용
import '../admin/styles/NoticeEventAdminPage.css'; // 통일된 스타일 사용


// 🔹 샘플 이벤트 데이터
const sampleEvents = [
  { id: 20, title: '동네 벚꽃 축제', startDate: '2026-03-01', endDate: '2026-03-05', status: '진행중' },
  { id: 19, title: '중고 장터 이벤트', startDate: '2026-02-25', endDate: '2026-02-28', status: '종료' },
  { id: 18, title: '아이돌 팬 미팅', startDate: '2026-02-20', endDate: '2026-02-21', status: '진행중' },
  { id: 17, title: '주말 농장 체험', startDate: '2026-02-18', endDate: '2026-02-19', status: '종료' },
  { id: 16, title: '지역 환경 정화 활동', startDate: '2026-02-15', endDate: '2026-02-16', status: '진행중' },
  { id: 15, title: '커뮤니티 글쓰기 대회', startDate: '2026-02-10', endDate: '2026-02-12', status: '종료' },
  { id: 14, title: '도서 나눔 행사', startDate: '2026-02-05', endDate: '2026-02-06', status: '진행중' },
  { id: 13, title: '반려동물 산책 모임', startDate: '2026-02-01', endDate: '2026-02-02', status: '종료' },
  { id: 12, title: '재활용 캠페인', startDate: '2026-01-28', endDate: '2026-01-30', status: '진행중' },
  { id: 11, title: '지역 음악회', startDate: '2026-01-25', endDate: '2026-01-26', status: '종료' },
  { id: 10, title: '무료 영화 상영', startDate: '2026-01-22', endDate: '2026-01-23', status: '진행중' },
  { id: 9, title: '동네 운동회', startDate: '2026-01-20', endDate: '2026-01-21', status: '종료' },
  { id: 8, title: '창업 컨설팅 세미나', startDate: '2026-01-18', endDate: '2026-01-18', status: '진행중' },
  { id: 7, title: '지역 역사 탐방', startDate: '2026-01-15', endDate: '2026-01-16', status: '종료' },
  { id: 6, title: '유아 교육 워크숍', startDate: '2026-01-12', endDate: '2026-01-13', status: '진행중' },
  { id: 5, title: '중고 거래 교육', startDate: '2026-01-10', endDate: '2026-01-11', status: '종료' },
  { id: 4, title: '반려동물 건강 세미나', startDate: '2026-01-08', endDate: '2026-01-09', status: '진행중' },
  { id: 3, title: '재능 기부 활동', startDate: '2026-01-05', endDate: '2026-01-06', status: '종료' },
  { id: 2, title: '지역 플리마켓', startDate: '2026-01-02', endDate: '2026-01-03', status: '진행중' },
  { id: 1, title: '주말 반려동물 모임', startDate: '2026-01-01', endDate: '2026-01-02', status: '종료' },
];

// 🔹 샘플 공지사항 데이터
const sampleNotices = [
  { id: 20, title: '서비스 점검 안내', postDate: '2026-01-23', endDate: '2026-01-23', status: '종료' },
  { id: 19, title: '커뮤니티 규칙 변경', postDate: '2026-01-22', endDate: '2026-01-22', status: '종료' },
  { id: 18, title: '회원 이벤트 안내', postDate: '2026-01-21', endDate: '2026-01-21', status: '진행중' },
  { id: 17, title: '중요 개인정보 변경', postDate: '2026-01-20', endDate: '2026-01-20', status: '종료' },
  { id: 16, title: '공지사항 테스트', postDate: '2026-01-19', endDate: '2026-01-19', status: '진행중' },
  { id: 15, title: '새 기능 업데이트', postDate: '2026-01-18', endDate: '2026-01-18', status: '종료' },
  { id: 14, title: '이용 약관 변경', postDate: '2026-01-17', endDate: '2026-01-17', status: '진행중' },
  { id: 13, title: '서버 점검 안내', postDate: '2026-01-16', endDate: '2026-01-16', status: '종료' },
  { id: 12, title: '커뮤니티 활성화 이벤트', postDate: '2026-01-15', endDate: '2026-01-15', status: '진행중' },
  { id: 11, title: '회원 등급 안내', postDate: '2026-01-14', endDate: '2026-01-14', status: '종료' },
  { id: 10, title: '신규 기능 안내', postDate: '2026-01-13', endDate: '2026-01-13', status: '진행중' },
  { id: 9, title: '긴급 서버 점검', postDate: '2026-01-12', endDate: '2026-01-12', status: '종료' },
  { id: 8, title: '커뮤니티 안전 공지', postDate: '2026-01-11', endDate: '2026-01-11', status: '진행중' },
  { id: 7, title: '이벤트 당첨 안내', postDate: '2026-01-10', endDate: '2026-01-10', status: '종료' },
  { id: 6, title: '시스템 점검 안내', postDate: '2026-01-09', endDate: '2026-01-09', status: '진행중' },
  { id: 5, title: '커뮤니티 정기 점검', postDate: '2026-01-08', endDate: '2026-01-08', status: '종료' },
  { id: 4, title: '공지사항 테스트2', postDate: '2026-01-07', endDate: '2026-01-07', status: '진행중' },
  { id: 3, title: '회원 혜택 안내', postDate: '2026-01-06', endDate: '2026-01-06', status: '종료' },
  { id: 2, title: '이벤트 참여 안내', postDate: '2026-01-05', endDate: '2026-01-05', status: '진행중' },
  { id: 1, title: '시스템 공지사항', postDate: '2026-01-04', endDate: '2026-01-04', status: '종료' },
];

const NoticeEventAdminPage = () => {
  const [activeTab, setActiveTab] = useState('event'); // 이벤트 / 공지사항 탭
  const [keyword, setKeyword] = useState('');           // 검색어 상태
  const [statusFilter, setStatusFilter] = useState(''); // 상태 필터
  const [currentPage, setCurrentPage] = useState(1);    // 현재 페이지
  const itemsPerPage = 5;                                // 한 페이지 5개

  // 🔹 현재 선택된 데이터
  const data = activeTab === 'event' ? sampleEvents : sampleNotices;

  // 🔹 검색 및 상태 필터링
  const filteredData = data.filter(item => {
    const matchKeyword = item.title.includes(keyword);
    const matchStatus = statusFilter ? item.status === statusFilter : true;
    return matchKeyword && matchStatus;
  });

  // 🔹 페이지네이션 계산
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentData = filteredData.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <div className="adminPageContainer  noticeEventPage">
      {/* 페이지 헤더 */}
      <div className="adminHeader">
        <h2 className="adminTitle"> 이벤트 / 공지사항 관리</h2>
        <span className="adminDesc">이벤트와 공지사항을 관리합니다</span>
      </div>

      {/* 🔹 탭 버튼 */}
      <div className="tabContainer ">
        <button
          className={`tabButton ${activeTab === 'event' ? 'active' : ''}`}
          onClick={() => { setActiveTab('event'); setCurrentPage(1); }}
        >
          이벤트
        </button>
        <button
          className={`tabButton ${activeTab === 'notice' ? 'active' : ''}`}
          onClick={() => { setActiveTab('notice'); setCurrentPage(1); }}
        >
          공지사항
        </button>
      </div>

      {/* 🔹 검색 + 상태 필터 */}
      <div className="filterBar">
        <div className="searchBox">
          <input
            type="text"
            placeholder={` ${activeTab === 'event' ? '이벤트 제목' : '공지사항 제목'} 검색`}
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>
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

      {/* 🔹 테이블 */}
      <table className="adminTable">
        <thead>
          <tr>
            <th>ID</th>
            <th>제목</th>
            <th>{activeTab === 'event' ? '이벤트 게시일' : '공지 게시일'}</th>
            <th>종료일</th>
            <th>상태</th>
            <th>관리</th>
          </tr>
        </thead>
        <tbody>
          {currentData.length === 0 ? (
            <tr>
              <td colSpan="6">데이터가 없습니다.</td>
            </tr>
          ) : (
            currentData.map(item => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{activeTab === 'event' ? item.startDate : item.postDate}</td>
                <td>{item.endDate}</td>
                <td>
                  <span className={`statusBadge ${item.status === '진행중' ? 'new' : 'used'}`}>
                    {item.status}
                  </span>
                </td>
                <td>
                  <button className="btn-sm">완료</button>
                  <button className="btn-sm danger">삭제</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* 🔹 페이지네이션 */}
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

export default NoticeEventAdminPage;
