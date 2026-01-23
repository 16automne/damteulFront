import React, { useState } from 'react';
import '../admin/styles/PostAdminPage.css'; // 통일된 스타일 적용

// 사용자 등급별 이미지와 설명 매핑
const gradeInfo = {
  '조심스러운 이웃': { img: '/images/leve01.png', desc: '조심스럽게 활동하는 사용자' },
  '반가운 이웃': { img: '/images/leve02.png', desc: '친근하게 다가오는 사용자' },
  '다정한 이웃': { img: '/images/leve03.png', desc: '다정하고 친절한 사용자' },
  '듬직한 이웃': { img: '/images/leve04.png', desc: '믿음직한 사용자' },
  '신뢰 깊은 이웃': { img: '/images/leve05.png', desc: '신뢰할 수 있는 사용자' },
  '존경 받는 이웃': { img: '/images/leve06.png', desc: '커뮤니티에서 존경받는 사용자' },
};

// 샘플 사용자 데이터 20명 생성
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
  const [keyword, setKeyword] = useState(''); // 검색어 상태
  const [statusFilter, setStatusFilter] = useState(''); // 전체 상태 필터 (등급)
  const [currentPage, setCurrentPage] = useState(1); // 페이지네이션 현재 페이지
  const usersPerPage = 5; // 한 페이지당 5명

  // 최신 ID가 상단에 오도록 내림차순 정렬
  const usersDescending = [...sampleUsers].sort((a, b) => b.id.localeCompare(a.id));

  // 필터링: 등급 + 키워드 (ID, 닉네임)
  const filteredUsers = usersDescending.filter(user => {
    const matchStatus = statusFilter ? user.grade === statusFilter : true; // 등급 필터
    const matchKeyword = user.id.includes(keyword) || user.nickname.includes(keyword); // 검색어 필터
    return matchStatus && matchKeyword;
  });

  // 페이지네이션 계산
  const indexOfLast = currentPage * usersPerPage;
  const indexOfFirst = indexOfLast - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  return (
    <div className="adminPageContainer">
      {/* 페이지 헤더 */}
      <div className="adminHeader">
        <h2 className="adminTitle">사용자 관리</h2>
        <span className="adminDesc">사용자 정보와 신고 점수를 관리합니다</span>
      </div>

      {/* 검색창 + 상태 필터 */}
      <div className="filterBar">
        <div className="searchBox">
          <input
            type="text"
            placeholder="🔍 ID/닉네임 검색"
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
            <option key={grade} value={grade}>{grade}</option>
          ))}
        </select>

        <button>검색</button>
        <button onClick={() => { setKeyword(''); setStatusFilter(''); }}>초기화</button>
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
            currentUsers.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.nickname}</td>
                <td>
                  {/* 상태: 등급 이미지 + 이름 + 설명 */}
                  <div className="gradeContainer">
                    <img src={gradeInfo[user.grade].img} alt={user.grade} className="gradeImg" />
                    <div>
                      <div>{user.grade}</div>
                      <small>{gradeInfo[user.grade].desc}</small>
                    </div>
                  </div>
                </td>
                <td>{user.reportScore} / 5</td> {/* 신고 점수 최대 5점 */}
                <td>
                  <button className="btn-sm">경고</button>
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

export default UserAdminPage;
