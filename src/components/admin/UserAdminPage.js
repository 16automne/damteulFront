import React, { useState, useEffect } from 'react';
import '../admin/styles/PostAdminPage.css'; // 관리자 페이지 공통 스타일

/* -------------------------------------------------
   사용자 등급 정보 매핑
   - key: 등급 이름 (user.grade와 반드시 동일해야 함)
   - value: 이미지 경로 + 설명
   - public/images 기준 절대경로 사용
------------------------------------------------- */
const gradeInfo = {
  '조심스러운 이웃': { img: '/images/level01.png', desc: '조심스럽게 활동하는 사용자' },
  '반가운 이웃': { img: '/images/level02.png', desc: '친근하게 다가오는 사용자' },
  '다정한 이웃': { img: '/images/level03.png', desc: '다정하고 친절한 사용자' },
  '듬직한 이웃': { img: '/images/level04.png', desc: '믿음직한 사용자' },
  '신뢰 깊은 이웃': { img: '/images/level05.png', desc: '신뢰할 수 있는 사용자' },
  '존경 받는 이웃': { img: '/images/level06.png', desc: '커뮤니티에서 존경받는 사용자' },
};

/* -------------------------------------------------
   샘플 사용자 데이터
   - 실제 API 연동 시 이 배열만 서버 데이터로 교체하면 됨
------------------------------------------------- */
const sampleUsers = [
  { id: 'user020', nickname: '별님', grade: '존경 받는 이웃', reportScore: 0 },
  { id: 'user019', nickname: '달님', grade: '신뢰 깊은 이웃', reportScore: 1 },
  { id: 'user018', nickname: '해님', grade: '듬직한 이웃', reportScore: 2 },
  { id: 'user017', nickname: '별빛', grade: '다정한 이웃', reportScore: 0 },
  { id: 'user016', nickname: '구름', grade: '반가운 이웃', reportScore: 3 },
  { id: 'user015', nickname: '바람', grade: '조심스러운 이웃', reportScore: 0 },
  { id: 'user014', nickname: '물결', grade: '존경 받는 이웃', reportScore: 1 },
  { id: 'user013', nickname: '꽃잎', grade: '신뢰 깊은 이웃', reportScore: 0 },
  { id: 'user012', nickname: '나무', grade: '듬직한 이웃', reportScore: 2 },
  { id: 'user011', nickname: '하늘', grade: '다정한 이웃', reportScore: 0 },
  { id: 'user010', nickname: '강', grade: '반가운 이웃', reportScore: 1 },
  { id: 'user009', nickname: '산', grade: '조심스러운 이웃', reportScore: 0 },
  { id: 'user008', nickname: '달빛', grade: '존경 받는 이웃', reportScore: 2 },
  { id: 'user007', nickname: '햇살', grade: '신뢰 깊은 이웃', reportScore: 0 },
  { id: 'user006', nickname: '별무리', grade: '듬직한 이웃', reportScore: 3 },
  { id: 'user005', nickname: '구름빛', grade: '다정한 이웃', reportScore: 0 },
  { id: 'user004', nickname: '바다', grade: '반가운 이웃', reportScore: 1 },
  { id: 'user003', nickname: '돌', grade: '조심스러운 이웃', reportScore: 0 },
  { id: 'user002', nickname: '꽃', grade: '신뢰 깊은 이웃', reportScore: 2 },
  { id: 'user001', nickname: '풀', grade: '존경 받는 이웃', reportScore: 0 },
];

const UserAdminPage = () => {
  /* -------------------- 상태 관리 -------------------- */
  const [keyword, setKeyword] = useState('');        // 검색어 (ID, 닉네임)
  const [statusFilter, setStatusFilter] = useState(''); // 등급 필터
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const usersPerPage = 5; // 페이지당 사용자 수

  /* -------------------------------------------------
     🔥 핵심 수정 포인트
     - 검색어 또는 등급 필터가 변경되면
     - 페이지네이션을 무조건 1페이지로 초기화
     - 필터 결과가 적을 때 "사용자가 없습니다" 오류 방지
  ------------------------------------------------- */
  useEffect(() => {
    setCurrentPage(1);
  }, [keyword, statusFilter]);

  /* -------------------- 정렬 --------------------
     - 최신 ID가 위로 오도록 내림차순 정렬
     - 원본 배열 보호를 위해 spread 사용
  ----------------------------------------------- */
  const usersDescending = [...sampleUsers].sort((a, b) =>
    b.id.localeCompare(a.id)
  );

  /* -------------------- 필터링 --------------------
     1. 등급 필터
     2. 검색어 필터 (ID 또는 닉네임 포함)
  ----------------------------------------------- */
  const filteredUsers = usersDescending.filter(user => {
    const matchStatus = statusFilter ? user.grade === statusFilter : true;
    const matchKeyword =
      user.id.includes(keyword) || user.nickname.includes(keyword);
    return matchStatus && matchKeyword;
  });

  /* -------------------- 페이지네이션 계산 -------------------- */
  const indexOfLast = currentPage * usersPerPage;
  const indexOfFirst = indexOfLast - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  return (
    <div className="adminPageContainer">
      {/* -------------------- 헤더 -------------------- */}
      <div className="adminHeader">
        <h2 className="adminTitle">사용자 관리</h2>
        <span className="adminDesc">사용자 정보와 신고 점수를 관리합니다</span>
      </div>

      {/* -------------------- 검색 / 필터 영역 -------------------- */}
      <div className="filterBar">
        <div className="searchBox">
          <input
            type="text"
            placeholder=" ID / 닉네임 검색"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>

        {/* 등급 필터 */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">전체 상태</option>
          {Object.keys(gradeInfo).map(grade => (
            <option key={grade} value={grade}>
              {grade}
            </option>
          ))}
        </select>

        {/* 실시간 필터링이라 버튼은 UX용 */}
        <button onClick={() => setCurrentPage(1)}>검색</button>
        <button
          onClick={() => {
            setKeyword('');
            setStatusFilter('');
          }}
        >
          초기화
        </button>
      </div>

      {/* -------------------- 테이블 -------------------- */}
      <table className="adminTable">
        <thead>
          <tr>
            <th>ID</th>
            <th>닉네임</th>
            <th>상태</th>
            <th>신고 점수</th>
            <th>관리</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.length === 0 ? (
            <tr>
              <td colSpan="5">사용자가 없습니다.</td>
            </tr>
          ) : (
            currentUsers.map(user => {
              const grade = gradeInfo[user.grade]; // 안전한 접근

              return (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.nickname}</td>
                  <td>
                    {grade && (
                      <div className="gradeContainer">
                        <img
                          src={grade.img}
                          alt={user.grade}
                          className="gradeImg"
                        />
                        <div>
                          <div>{user.grade}</div>
                          <small>{grade.desc}</small>
                        </div>
                      </div>
                    )}
                  </td>
                  <td>{user.reportScore} / 15</td>
                  <td>
                    <button className="btn-sm">경고</button>
                    <button className="btn-sm danger">삭제</button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>

      {/* -------------------- 페이지네이션 -------------------- */}
      <div className="pagination">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          {'<'}
        </button>

        <span>{currentPage} / {totalPages || 1}</span>

        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages || totalPages === 0}
        >
          {'>'}
        </button>
      </div>
    </div>
  );
};

export default UserAdminPage;
