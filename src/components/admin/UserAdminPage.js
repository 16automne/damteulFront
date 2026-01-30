import React, { useState } from 'react';
import '../admin/styles/PostAdminPage.css';
import UserDetailModal from './UserDetailModal';
import { gradeInfo } from './constants/gradeInfo';

/* -------------------------------------------------
   📌 샘플 사용자 데이터
   - grade  : 커뮤니티 등급
   - status : 계정 상태 (정상 / 정지 / 탈퇴)
------------------------------------------------- */
  const sampleUsers = [
    // ===== 정상 회원 =====
    { id: 'user030', nickname: '은하', grade: '존경 받는 이웃', reportScore: 0, status: '정상' },
    { id: 'user029', nickname: '별하', grade: '신뢰 깊은 이웃', reportScore: 1, status: '정상' },
    { id: 'user028', nickname: '노을', grade: '듬직한 이웃', reportScore: 2, status: '정상' },
    { id: 'user027', nickname: '햇빛', grade: '다정한 이웃', reportScore: 0, status: '정상' },
    { id: 'user026', nickname: '초롱', grade: '반가운 이웃', reportScore: 1, status: '정상' },
    { id: 'user025', nickname: '이슬', grade: '조심스러운 이웃', reportScore: 0, status: '정상' },
    { id: 'user024', nickname: '솔바람', grade: '신뢰 깊은 이웃', reportScore: 2, status: '정상' },
    { id: 'user023', nickname: '달무리', grade: '존경 받는 이웃', reportScore: 0, status: '정상' },
  
    // ===== 정지 회원 =====
    { id: 'user022', nickname: '먹구름', grade: '조심스러운 이웃', reportScore: 7, status: '정지' },
    { id: 'user021', nickname: '번개', grade: '반가운 이웃', reportScore: 6, status: '정지' },
    { id: 'user020', nickname: '회색별', grade: '다정한 이웃', reportScore: 8, status: '정지' },
    { id: 'user019', nickname: '거센바람', grade: '듬직한 이웃', reportScore: 5, status: '정지' },
    { id: 'user018', nickname: '파도', grade: '신뢰 깊은 이웃', reportScore: 9, status: '정지' },
    { id: 'user017', nickname: '폭우', grade: '조심스러운 이웃', reportScore: 10, status: '정지' },
  
    // ===== 탈퇴 회원 =====
    { id: 'user016', nickname: '잿빛', grade: '반가운 이웃', reportScore: 3, status: '탈퇴' },
    { id: 'user015', nickname: '사라진별', grade: '조심스러운 이웃', reportScore: 2, status: '탈퇴' },
    { id: 'user014', nickname: '빈하늘', grade: '다정한 이웃', reportScore: 1, status: '탈퇴' },
    { id: 'user013', nickname: '흔적', grade: '듬직한 이웃', reportScore: 4, status: '탈퇴' },
    { id: 'user012', nickname: '안개', grade: '반가운 이웃', reportScore: 0, status: '탈퇴' },
  
    // ===== 추가 혼합 데이터 =====
    { id: 'user011', nickname: '서리', grade: '존경 받는 이웃', reportScore: 0, status: '정상' },
    { id: 'user010', nickname: '별빛나래', grade: '신뢰 깊은 이웃', reportScore: 1, status: '정상' },
    { id: 'user009', nickname: '바위', grade: '듬직한 이웃', reportScore: 4, status: '정지' },
    { id: 'user008', nickname: '모래', grade: '조심스러운 이웃', reportScore: 0, status: '정상' },
    { id: 'user007', nickname: '풀잎', grade: '반가운 이웃', reportScore: 0, status: '정상' },
    { id: 'user006', nickname: '별무덤', grade: '조심스러운 이웃', reportScore: 6, status: '탈퇴' },
    { id: 'user005', nickname: '강물', grade: '다정한 이웃', reportScore: 2, status: '정상' },
    { id: 'user004', nickname: '달그림자', grade: '신뢰 깊은 이웃', reportScore: 5, status: '정지' },
    { id: 'user003', nickname: '숲길', grade: '존경 받는 이웃', reportScore: 0, status: '정상' },
    { id: 'user002', nickname: '여울', grade: '반가운 이웃', reportScore: 1, status: '정상' },
    { id: 'user001', nickname: '돌담', grade: '조심스러운 이웃', reportScore: 0, status: '탈퇴' },
  ];


const UserAdminPage = () => {
  /* =================================================
     🔹 1. 입력 상태 (UI 전용)
     - 검색 버튼을 누르기 전까지 실제 필터에 반영 X
  ================================================= */
  const [inputKeyword, setInputKeyword] = useState('');
  const [inputGrade, setInputGrade] = useState('');
  const [inputUserStatus, setInputUserStatus] = useState('');

  /* =================================================
     🔹 2. 검색 적용 상태
     - "검색" 버튼 클릭 시 실제 필터 기준
  ================================================= */
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchGrade, setSearchGrade] = useState('');
  const [searchUserStatus, setSearchUserStatus] = useState('');

  /* =================================================
     🔹 3. 페이지네이션 상태
  ================================================= */
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  /* =================================================
     🔹 4. 사용자 상세 모달 상태
  ================================================= */
  const [selectedUser, setSelectedUser] = useState(null);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);

  /* =================================================
     🔹 5. 사용자 정렬 (ID 기준 내림차순)
  ================================================= */
  const usersDescending = [...sampleUsers].sort((a, b) =>
    b.id.localeCompare(a.id)
  );

  /* =================================================
     🔹 6. 필터링 로직
     - 키워드 + 등급 + 상태 모두 AND 조건
  ================================================= */
  const filteredUsers = usersDescending.filter(user => {
    const matchKeyword =
      user.id.includes(searchKeyword) ||
      user.nickname.includes(searchKeyword);

    const matchGrade = searchGrade
      ? user.grade === searchGrade
      : true;

    const matchStatus = searchUserStatus
      ? user.status === searchUserStatus
      : true;

    return matchKeyword && matchGrade && matchStatus;
  });

  /* =================================================
     🔹 7. 페이지네이션 계산
  ================================================= */
  const indexOfLast = currentPage * usersPerPage;
  const indexOfFirst = indexOfLast - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  /* =================================================
     🔹 8. 검색 버튼
     - 입력 상태 → 검색 상태로 반영
  ================================================= */
  const handleSearch = () => {
    setSearchKeyword(inputKeyword.trim());
    setSearchGrade(inputGrade);
    setSearchUserStatus(inputUserStatus);
    setCurrentPage(1);
  };

  /* =================================================
     🔹 9. 초기화 버튼
  ================================================= */
  const handleReset = () => {
    setInputKeyword('');
    setInputGrade('');
    setInputUserStatus('');
    setSearchKeyword('');
    setSearchGrade('');
    setSearchUserStatus('');
    setCurrentPage(1);
  };

  /* =================================================
     🔹 10. 회원 상태 변경 (예시)
     - 실제로는 API 연동
  ================================================= */
  const handleSuspend = (userId) => {
    console.log('회원 정지:', userId);
  };

  return (
    <div className="adminPageContainer">
      {/* ===================== 헤더 ===================== */}
      <div className="adminHeader">
        <h2 className="adminTitle">사용자 관리</h2>
        <span className="adminDesc">
          사용자 정보 및 계정 상태를 관리합니다
        </span>
      </div>

      {/* ===================== 필터 바 ===================== */}
      <div className="filterBar">
        <div className="searchBox">
        {/* 키워드 검색 */}
        <input
          type="text"
          placeholder="ID / 닉네임 검색"
          value={inputKeyword}
          onChange={(e) => setInputKeyword(e.target.value)}
        />
        </div>

        {/* 등급 필터 */}
        <select
          value={inputGrade}
          onChange={(e) => setInputGrade(e.target.value)}
        >
          <option value="">전체 등급</option>
          {Object.keys(gradeInfo).map(grade => (
            <option key={grade} value={grade}>{grade}</option>
          ))}
        </select>

        {/* 상태 필터 */}
        <select
          value={inputUserStatus}
          onChange={(e) => setInputUserStatus(e.target.value)}
        >
          <option value="">전체 상태</option>
          <option value="정상">정상</option>
          <option value="정지">정지</option>
          <option value="탈퇴">탈퇴</option>
        </select>

        <button onClick={handleSearch}>검색</button>
        <button onClick={handleReset}>초기화</button>
      </div>

      {/* ===================== 테이블 ===================== */}
      <table className="adminTable">
        <thead>
          <tr>
            <th>ID</th>
            <th>닉네임</th>
            <th>등급</th>
            <th>신고 점수</th>
            <th>상태</th>
            <th>관리</th>
          </tr>
        </thead>

        <tbody>
          {currentUsers.length === 0 ? (
            <tr>
              <td colSpan="6">사용자가 없습니다.</td>
            </tr>
          ) : (
            currentUsers.map(user => {
              const grade = gradeInfo[user.grade];

              return (
                <tr
                  key={user.id}
                  className="clickableRow"
                  onClick={() => {
                    setSelectedUser(user);
                    setIsUserModalOpen(true);
                  }}
                >
                  <td>{user.id}</td>
                  <td>{user.nickname}</td>

                  {/* 등급 표시 */}
                  <td>
                    {grade && (
                      <div className="gradeContainer">
                        <img src={grade.img} alt={user.grade} />
                        <div>
                          <div>{user.grade}</div>
                          <small>{grade.desc}</small>
                        </div>
                      </div>
                    )}
                  </td>

                  <td>{user.reportScore} / 15</td>

                  {/* 상태 배지 */}
                  <td>
                    <span className={`statusBadge ${user.status}`}>
                      {user.status}
                    </span>
                  </td>

                  {/* 관리 버튼 */}
                  <td>
                    {user.status === '정상' && (
                      <button
                        className="btn-sm danger"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSuspend(user.id);
                        }}
                      >
                        회원 정지
                      </button>
                    )}
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>

      {/* ===================== 페이지네이션 ===================== */}
      <div className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(p => p - 1)}
        >
          {'<'}
        </button>
        <span>{currentPage} / {totalPages || 1}</span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(p => p + 1)}
        >
          {'>'}
        </button>
      </div>

      {/* ===================== 사용자 상세 모달 ===================== */}
      {isUserModalOpen && selectedUser && (
        <UserDetailModal
          user={selectedUser}
          onClose={() => setIsUserModalOpen(false)}
        />
      )}
    </div>
  );
};

export default UserAdminPage;
