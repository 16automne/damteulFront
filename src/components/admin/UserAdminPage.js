import React, { useState } from 'react';
import '../admin/styles/PostAdminPage.css'; // 기존 CSS 적용
import { gradeInfo } from './constants/gradeInfo';
import { sampleUsers } from './data/sampleUsers';

const UserAdminPage = () => {
  // ==============================
  // 상태값 정의
  // ==============================
  const [inputKeyword, setInputKeyword] = useState('');      // 입력창 키워드
  const [inputGrade, setInputGrade] = useState('');          // 입력창 등급
  const [inputUserStatus, setInputUserStatus] = useState('');// 입력창 상태

  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchGrade, setSearchGrade] = useState('');
  const [searchUserStatus, setSearchUserStatus] = useState('');

  const [currentPage, setCurrentPage] = useState(1);        // 현재 페이지
  const usersPerPage = 10;                                   // 페이지당 사용자 수

  // ==============================
  // 데이터 내림차순 정렬
  // ==============================
  const usersDescending = [...sampleUsers].sort((a, b) =>
    b.id.localeCompare(a.id)
  );

  // ==============================
  // 필터링
  // ==============================
  const filteredUsers = usersDescending.filter(user => {
    const matchKeyword =
      user.id.includes(searchKeyword) || user.nickname.includes(searchKeyword);
    const matchGrade = searchGrade ? user.grade === searchGrade : true;
    const matchStatus = searchUserStatus ? user.status === searchUserStatus : true;
    return matchKeyword && matchGrade && matchStatus;
  });

  // ==============================
  // 페이지네이션
  // ==============================
  const indexOfLast = currentPage * usersPerPage;
  const indexOfFirst = indexOfLast - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  // ==============================
  // 검색/필터 버튼 이벤트
  // ==============================
  const handleSearch = () => {
    setSearchKeyword(inputKeyword.trim());
    setSearchGrade(inputGrade);
    setSearchUserStatus(inputUserStatus);
    setCurrentPage(1);
  };

  const handleReset = () => {
    setInputKeyword('');
    setInputGrade('');
    setInputUserStatus('');
    setSearchKeyword('');
    setSearchGrade('');
    setSearchUserStatus('');
    setCurrentPage(1);
  };

  return (
    <div className="userStatusWrapper">
      <div className="adminPageContainer">
        {/* ==============================
          헤더
      ============================== */}
        <div className="adminHeader">
          <h2 className="adminTitle">사용자 관리</h2>
          <span className="adminDesc">사용자 정보 및 계정 상태를 관리합니다</span>
        </div>

        {/* ==============================
          필터바
      ============================== */}
        <div className="filterBar">
          <div className="searchBox">
            <input
              type="text"
              placeholder="ID / 닉네임 검색"
              value={inputKeyword}
              onChange={(e) => setInputKeyword(e.target.value)}
            />
          </div>

          <select value={inputGrade} onChange={(e) => setInputGrade(e.target.value)}>
            <option value="">전체 등급</option>
            {Object.keys(gradeInfo).map(grade => (
              <option key={grade} value={grade}>{grade}</option>
            ))}
          </select>
          <select value={inputUserStatus} onChange={(e) => setInputUserStatus(e.target.value)}>
            <option value="">전체 상태</option>
            <option value="활동중">활동중</option>
            <option value="정지">정지</option>
            <option value="탈퇴">탈퇴</option>
          </select>
          <button onClick={handleSearch}>검색</button>
          <button onClick={handleReset}>초기화</button>
        </div>

        {/* ==============================
          테이블
      ============================== */}
        <table className="adminTable">
          <thead>
            <tr>
              <th>ID</th>
              <th>닉네임</th>
              <th>등급</th>
              <th>신고 점수</th>
              <th>가입일</th>
              <th>상태</th>
              <th>관리</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.length === 0 ? (
              <tr>
                <td colSpan="7">사용자가 없습니다.</td>
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
                          <img src={grade.img} alt={user.grade} />
                          <div>{user.grade}</div>
                        </div>
                      )}
                    </td>
                    <td>{user.reportScore} / 15</td>

                    <td>{user.createdAt}</td> {/* ✅ 가입일 표시 */}
                    <td>
                      <span className={`statusBadge ${user.status}`}>{user.status}</span>
                    </td>


                    <td>
                      <button
                        className="btn-sm gearButton"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(`/admin/users/detail/${user.id}`, '_blank', 'width=1000,height=800');
                        }}
                        title="회원 관리"
                      >
                        ⚙
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>

        {/* ==============================
          페이지네이션
      ============================== */}
        <div className="pagination">
          <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>{'<'}</button>
          <span>{currentPage} / {totalPages || 1}</span>
          <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)}>{'>'}</button>
        </div>
      </div>
    </div>
  );
};

export default UserAdminPage;
