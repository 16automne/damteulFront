import React, { useState } from 'react';
import '../admin/styles/UserDetailModal.scss';
import { gradeInfo } from './constants/gradeInfo';


// UserDetailModal.jsx
  const UserDetailModal = ({ user, onClose }) => {
    const [reportScore, setReportScore] = useState(user.reportScore); // ✅ 항상 최상단
    const grade = gradeInfo[user.grade]; // ⭐ 핵심
  // ✅ user가 아직 없을 때 렌더링 방지 (중요)
    if (!user) return null;

  // 기존 user를 props로 받는 상태를 복제해서 수정 가능하게 만들기


  return (
    <div className="modalOverlay" onClick={onClose}>
      <div
        className="modalContent"
        onClick={(e) => e.stopPropagation()} // ⭐ 모달 내부 클릭 시 닫힘 방지
      >

         {/* 닫기 버튼 */}
        <button className="modalCloseBtn" onClick={onClose}>
          ×
        </button>

        <div className="adminPageContainer">
          {/* 헤더 */}
          <div className="adminHeader">
            <h2 className="adminTitle">회원 정보 수정</h2>
            <span className="adminDesc">
              회원 정보를 확인하고 관리합니다
            </span>
          </div>

          {/* 카드 영역 */}
          <div className="userEditCard">
            {/* 사용자 요약 */}
            <div className="userSummary">
              {grade && (
                <img
                  src={grade.img}
                  alt={user.grade}
                  className="gradeImg"
                />
              )}
              <div>
                <strong>ID:</strong> {user.id}
                <br />
                <strong>닉네임:</strong> {user.nickname}
              </div>
            </div>

            {/* 기본 정보 */}
            <section>
              <h4>기본 정보</h4>
              <strong>ID:</strong><input value={user.id} disabled />
              <strong>닉네임:</strong><input defaultValue={user.nickname} />
              <strong>등급:</strong><select defaultValue={user.grade}>
                <option>조심스러운 이웃</option>
                <option>반가운 이웃</option>
                <option>다정한 이웃</option>
                <option>듬직한 이웃</option>
                <option>신뢰 깊은 이웃</option>
                <option>존경 받는 이웃</option>
              </select>
            </section>

            {/* 상태 및 점수 */}
            <section>
              <h4>상태 및 점수</h4>
              <div className="scoreControl">
                  <button
                    onClick={() => setReportScore(prev => Math.max(prev - 1, 0))} // 최소 0
                  >
                    -
                  </button>

                  <span>{reportScore}</span>

                  <button
                    onClick={() => setReportScore(prev => Math.min(prev + 1, 15))} // 최대 15
                  >
                    +
                  </button>
                    </div>
            </section>

            {/* 관리자 메모 */}
            <textarea placeholder="관리자 메모" />

            {/* 액션 버튼 */}
            <div className="actionButtons">
              <button className="danger">경고</button>
              <button>삭제</button>
              <button
                className="primary"
                onClick={() => {
                  console.log('저장할 점수:', reportScore);
                  onClose(); // 모달 닫기
                }}
              >
                저장
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailModal;
