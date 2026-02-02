// src/components/admin/NoticeEventAdminPage.js
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { sampleEvents } from './data/sampleEvents';
import { sampleNotices } from './data/sampleNotices';
import styles from '../admin/styles/NoticeEventAdminPage.module.css'; // 모듈 import

const NoticeEventAdminPage = () => {
  const location = useLocation();

  /* ==========================
     🔹 탭 상태
  ========================== */
  const [activeTab, setActiveTab] = useState(
    location.state?.activeTab === '공지사항' ? 'notice' : 'event'
  );

  /* ==========================
     🔹 검색 입력 상태 (UI)
  ========================== */
  const [inputKeyword, setInputKeyword] = useState('');
  const [inputStatus, setInputStatus] = useState('');

  /* ==========================
     🔹 검색 적용 상태 (실제 필터)
  ========================== */
  const [keyword, setKeyword] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  /* ==========================
     🔹 페이지네이션
  ========================== */
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  /* ==========================
     3️⃣ 검색 버튼 클릭
  ========================== */
  const handleSearch = () => {
    setKeyword(inputKeyword.trim());
    setStatusFilter(inputStatus);
    setCurrentPage(1);
  };


  /* ==========================
  🔹 글쓰기 버튼 클릭
   ========================== */
  const handleWrite = () => {
    // activeTab이 'event'면 이벤트, 'notice'면 공지사항
    const tab = activeTab === 'event' ? 'event' : 'notice';
    window.open(
      `/admin/${tab}/write?defaultTab=${tab}`,
      '_blank',
      'width=800,height=600'
    );
  };


  /* ==========================
     4️⃣ 현재 탭 데이터 선택
  ========================== */
  const data =
    activeTab === 'event'
      ? [...sampleEvents].sort((a, b) => b.id - a.id)
      : [...sampleNotices].sort((a, b) => b.id - a.id);

  /* ==========================
     5️⃣ 필터링
  ========================== */
  const filteredData = data.filter((item) => {
    const matchKeyword = keyword ? item.title.includes(keyword) : true;
    const matchStatus = statusFilter ? item.status === statusFilter : true;
    return matchKeyword && matchStatus;
  });

  /* ==========================
     6️⃣ 페이지네이션 계산
  ========================== */
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentData = filteredData.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <div className={`${styles.noticeEventPage} ${styles.adminPageContainer}`}>

      {/* ==========================
          헤더
      ========================== */}
      <div className={styles.adminHeader}>
        <h2 className={styles.adminTitle}>이벤트 / 공지사항 관리</h2>
        <span className={styles.adminDesc}>이벤트와 공지사항을 관리합니다</span>
      </div>

      {/* ==========================
          탭 버튼
      ========================== */}
      <div className={styles.tabContainer}>
        <button
          className={`${styles.tabButton1} ${activeTab === 'event' ? styles.active : ''}`}
          onClick={() => {
            setActiveTab('event');
            setCurrentPage(1);
          }}
        >
          이벤트
        </button>
        <button
          className={`${styles.tabButton2} ${activeTab === 'notice' ? styles.active : ''}`}
          onClick={() => {
            setActiveTab('notice');
            setCurrentPage(1);
          }}
        >
          공지사항
        </button>

      </div>

      {/* ==========================
          검색 / 필터
      ========================== */}
      <div className={styles.filterBar}>
        <div className={styles.searchBox}>
          <input
            type="text"
            placeholder={activeTab === 'event' ? '이벤트 제목 검색' : '공지사항 제목 검색'}
            value={inputKeyword}
            onChange={(e) => setInputKeyword(e.target.value)}
          />
        </div>

        <select value={inputStatus} onChange={(e) => setInputStatus(e.target.value)}>
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

        {/* ==========================
            글쓰기 버튼
        ========================== */}

        <div className={styles.writeButtonWrap}>
          <button
            className={styles.writeButton}
            onClick={handleWrite}>
            + 글쓰기
          </button>
        </div>
      </div>

      {/* ==========================
          테이블
      ========================== */}
      <table className={styles.adminTable}>
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
                <td>{activeTab === 'event' ? item.startDate : item.postDate}</td>
                <td>{item.endDate}</td>

                {/* <span
                    className={`${styles.statusBadge} ${item.status === '진행중' ? 'new' : 'used'
                      }`}
                  >
                    {item.status}
                  </span> */}
                <td>
                  <span
                    className={`${styles.statusBadge} ${item.status === '진행중' ? styles.new : styles.used
                      }`}
                  >
                    {item.status}
                  </span>
                </td>


                <td>
                  <button
                    className={styles['btn-sm']}
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(
                        activeTab === 'event'
                          ? `/admin/event/detail/${item.id}`
                          : `/admin/notice/detail/${item.id}`,
                        '_blank',
                        'width=1000,height=800'
                      );
                    }}
                  >
                    ⚙
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* ==========================
          페이지네이션
      ========================== */}
      <div className={styles.pagination}>
        <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
          {'<'}
        </button>

        <span>
          {currentPage} / {totalPages || 1}
        </span>

        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages || totalPages === 0}
        >
          {'>'}
        </button>
      </div>
    </div>
  );
};

export default NoticeEventAdminPage;
