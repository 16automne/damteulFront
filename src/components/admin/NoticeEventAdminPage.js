// src/components/admin/NoticeEventAdminPage.js
import React, { useState } from 'react';
import '../admin/styles/PostAdminPage.css';
import '../admin/styles/NoticeEventAdminPage.css';
import NoticeEventModal from './NoticeEventModal';
import { useLocation } from 'react-router-dom';


/* ===========================
   1️⃣ 샘플 데이터
   - 추후 API 연동 시 제거 예정
=========================== */

// 🔹 이벤트 데이터
const sampleEvents = [
  {
    id: 20,
    title: '동네 벚꽃 축제',
    startDate: '2026-03-01',
    endDate: '2026-03-05',
    status: '진행중',
  },
  {
    id: 19,
    title: '중고 장터 이벤트',
    startDate: '2026-02-25',
    endDate: '2026-02-28',
    status: '종료',
  },
  {
    id: 18,
    title: '아이돌 팬 미팅',
    startDate: '2026-02-20',
    endDate: '2026-02-21',
    status: '진행중',
  },
];

// 🔹 공지사항 데이터
const sampleNotices = [
  {
    id: 20,
    title: '서비스 점검 안내',
    postDate: '2026-01-23',
    endDate: '2026-01-23',
    status: '종료',
  },
  {
    id: 19,
    title: '커뮤니티 규칙 변경',
    postDate: '2026-01-22',
    endDate: '2026-01-22',
    status: '종료',
  },
  {
    id: 18,
    title: '회원 이벤트 안내',
    postDate: '2026-01-21',
    endDate: '2026-01-21',
    status: '진행중',
  },
];

/* ===========================
   2️⃣ NoticeEventAdminPage
=========================== */
const NoticeEventAdminPage = () => {
  const location = useLocation();

  /* ===========================
     🔹 탭 상태
     - event | notice
  ============================ */
  const [activeTab, setActiveTab] = useState(
    location.state?.activeTab === '공지사항' ? 'notice' : 'event'
  );

  /* ===========================
     🔹 검색 입력 상태 (UI)
  ============================ */
  const [inputKeyword, setInputKeyword] = useState('');
  const [inputStatus, setInputStatus] = useState('');

  /* ===========================
     🔹 검색 적용 상태 (실제 필터)
  ============================ */
  const [keyword, setKeyword] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  /* ===========================
     🔹 페이지네이션
  ============================ */
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  /* ===========================
     🔹 모달 상태
     - selectedItem === null → 글쓰기
     - selectedItem !== null → 수정
  ============================ */
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  /* ===========================
     3️⃣ 검색 버튼 클릭
  ============================ */
  const handleSearch = () => {
    setKeyword(inputKeyword.trim());
    setStatusFilter(inputStatus);
    setCurrentPage(1);
  };

  /* ===========================
     4️⃣ 현재 탭 데이터 선택
  ============================ */
  const data =
    activeTab === 'event'
      ? [...sampleEvents].sort((a, b) => b.id - a.id)
      : [...sampleNotices].sort((a, b) => b.id - a.id);

  /* ===========================
     5️⃣ 필터링
  ============================ */
  const filteredData = data.filter((item) => {
    const matchKeyword = keyword ? item.title.includes(keyword) : true;
    const matchStatus = statusFilter ? item.status === statusFilter : true;
    return matchKeyword && matchStatus;
  });

  /* ===========================
     6️⃣ 페이지네이션 계산
  ============================ */
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentData = filteredData.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <div className="adminPageContainer noticeEventPage">

      {/* ===========================
          헤더
      ============================ */}
      <div className="adminHeader">
        <h2 className="adminTitle">이벤트 / 공지사항 관리</h2>
        <span className="adminDesc">
          이벤트와 공지사항을 관리합니다
        </span>
      </div>

      {/* ===========================
          탭 버튼
      ============================ */}
      <div className="tabContainer">
        <button
          className={`tabButton1 ${activeTab === 'event' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('event');
            setCurrentPage(1);
          }}
        >
          이벤트
        </button>
        <button
          className={`tabButton2 ${activeTab === 'notice' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('notice');
            setCurrentPage(1);
          }}
        >
          공지사항
        </button>
      </div>

      {/* ===========================
          검색 / 필터
      ============================ */}
      <div className="filterBar">
        <div className="searchBox">
          <input
            type="text"
            placeholder={
              activeTab === 'event'
                ? '이벤트 제목 검색'
                : '공지사항 제목 검색'
            }
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

        <button onClick={handleSearch}>검색</button>
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

        {/* ===========================
          ✍ 글쓰기 버튼
          - 클릭 시 작성 모달
      ============================ */}
        <div className="writeButtonWrap">
          <button
            className="writeButton"
            onClick={() => {
              setSelectedItem({
                id: null,
                title: '',
                content: '',
                startDate: '',
                endDate: '',
                type: activeTab, // event / notice
              });
              setIsModalOpen(true);
            }}
          >
            + 글쓰기
          </button>
        </div>

      </div>





      {/* ===========================
          테이블
      ============================ */}
      <table className="adminTable">
        <thead>
          <tr>
            <th>ID</th>
            <th>제목</th>
            <th>{activeTab === 'event' ? '시작일' : '게시일'}</th>
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
            currentData.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>
                  {activeTab === 'event'
                    ? item.startDate
                    : item.postDate}
                </td>
                <td>{item.endDate}</td>
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
                    onClick={(e) => {
                      e.stopPropagation(); // 🔥 행 클릭 방지
                      setSelectedItem({ ...item, type: activeTab });
                      setIsModalOpen(true);
                    }}
                  >
                    수정</button>
                  <button className="btn-sm danger">삭제</button>
                </td> */}

                <td>
                  <button
                    className="btn-sm"
                    onClick={(e) => {
                      e.stopPropagation(); // 🔥 행 클릭 방지
                      setSelectedItem({ ...item, type: activeTab });
                      setIsModalOpen(true);
                    }}
                    title="수정 / 관리"
                    aria-label="수정 / 관리"
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
          페이지네이션
      ============================ */}
      <div className="pagination">
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.max(prev - 1, 1))
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
            setCurrentPage((prev) =>
              Math.min(prev + 1, totalPages)
            )
          }
          disabled={currentPage === totalPages || totalPages === 0}
        >
          {'>'}
        </button>
      </div>

      {/* ===========================
          모달
          - selectedItem 있으면 수정
          - 없으면 작성
      ============================ */}
      {isModalOpen && (
        <NoticeEventModal
          item={selectedItem}
          type={activeTab}
          mode={selectedItem ? 'edit' : 'create'}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default NoticeEventAdminPage;
