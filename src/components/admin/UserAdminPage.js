import React, { useState } from 'react';
import '../admin/styles/PostAdminPage.css';

/* -------------------------------------------------
   사용자 등급 정보 매핑
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
  /* -------------------- 입력 상태 (UI 전용) -------------------- */
  const [inputKeyword, setInputKeyword] = useState('');
  const [inputStatus, setInputStatus] = useState('');

  /* -------------------- 검색 적용 상태 -------------------- */
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchStatus, setSearchStatus] = useState('');

  /* -------------------- 페이지네이션 -------------------- */
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  /* -------------------- 정렬 -------------------- */
  const usersDescending = [...sampleUsers].sort((a, b) =>
    b.id.localeCompare(a.id)
  );

  /* -------------------- 필터링 (검색 버튼 기준) -------------------- */
  const filteredUsers = usersDescending.filter(user => {
    const matchStatus = searchStatus ? user.grade === searchStatus : true;
    const matchKeyword =
      user.id.includes(searchKeyword) ||
      user.nickname.includes(searchKeyword);
    return matchStatus && matchKeyword;
  });

  /* -------------------- 페이지 계산 -------------------- */
  const indexOfLast = currentPage * usersPerPage;
  const indexOfFirst = indexOfLast - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  /* -------------------- 검색 버튼 클릭 -------------------- */
  const handleSearch = () => {
    setSearchKeyword(inputKeyword.trim());
    setSearchStatus(inputStatus);
    setCurrentPage(1);
  };

  /* -------------------- 초기화 -------------------- */
  const handleReset = () => {
    setInputKeyword('');
    setInputStatus('');
    setSearchKeyword('');
    setSearchStatus('');
    setCurrentPage(1);
  };

  return (
    <div className="adminPageContainer">
      {/* 헤더 */}
      <div className="adminHeader">
        <h2 className="adminTitle">사용자 관리</h2>
        <span className="adminDesc">사용자 정보와 신고 점수를 관리합니다</span>
      </div>

      {/* 검색 / 필터 */}
      <div className="filterBar">
        <div className="searchBox">
          <input
            type="text"
            placeholder=" ID / 닉네임 검색"
            value={inputKeyword}
            onChange={(e) => setInputKeyword(e.target.value)}
          />
        </div>

        <select
          value={inputStatus}
          onChange={(e) => setInputStatus(e.target.value)}
        >
          <option value="">전체 상태</option>
          {Object.keys(gradeInfo).map(grade => (
            <option key={grade} value={grade}>
              {grade}
            </option>
          ))}
        </select>

        <button onClick={handleSearch}>검색</button>
        <button onClick={handleReset}>초기화</button>
      </div>

      {/* 테이블 */}
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
              const grade = gradeInfo[user.grade];
              return (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.nickname}</td>
                  <td>
                    {grade && (
                      <div className="gradeContainer">
                        <img src={grade.img} alt={user.grade} className="gradeImg" />
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

      {/* 페이지네이션 */}
      <div className="pagination">
        <button
          onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
        >
          {'<'}
        </button>
        <span>{currentPage} / {totalPages || 1}</span>
        <button
          onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages || totalPages === 0}
        >
          {'>'}
        </button>
      </div>
    </div>
  );
};

export default UserAdminPage;
