import React, { useState } from 'react';
// SCSS Module
import styles from '../admin/styles/UserDetailModal.module.css';
import { gradeInfo } from './constants/gradeInfo';

const UserDetailModal = ({ user, onClose }) => {
  /* =================================================
     1️⃣ 기본 상태 관리
  ================================================= */
  const [nickname, setNickname] = useState(user?.nickname || '');
  const [selectedGrade, setSelectedGrade] = useState(user?.grade || '');
  const [reportScore, setReportScore] = useState(user?.reportScore || 0);
  const [adminMemo, setAdminMemo] = useState('');

  /* =================================================
     2️⃣ 회원 상태 관리
     - 정상 / 정지 / 탈퇴
  ================================================= */
  const [userStatus, setUserStatus] = useState(user?.status || '정상');

  const currentGradeData = gradeInfo[selectedGrade];

  if (!user) return null;

  /* =================================================
     3️⃣ 상태 변경 핸들러
  ================================================= */
  const handleStatusChange = (newStatus) => {
    console.log('회원 상태 변경:', user.id, newStatus);
    setUserStatus(newStatus);
  };

  /* =================================================
     4️⃣ 저장 핸들러
  ================================================= */
  const handleSave = () => {
    const updatedData = {
      id: user.id,
      nickname,
      grade: selectedGrade,
      reportScore,
      status: userStatus,
      memo: adminMemo,
    };

    console.log('서버로 전송될 데이터:', updatedData);
    alert('성공적으로 저장되었습니다.');
    onClose();
  };

  return (
    <div className={styles.userDetailModal}>
    <div className={styles.modalOverlay} onClick={onClose}>
      <div
        className={styles.modalContent}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ===================== 닫기 버튼 ===================== */}
        <button
          className={styles.modalCloseBtn}
          onClick={onClose}
        >
          ×
        </button>

        <div className={styles.adminPageContainer}>
          {/* ===================== 헤더 ===================== */}
          <div className={styles.adminHeader}>
            <h2 className={styles.adminTitle}>회원 정보 수정</h2>
            <span className={styles.adminDesc}>
              회원 정보를 확인하고 관리합니다
            </span>
          </div>

          <div className={styles.userEditCard}>
            {/* ===================== 프로필 요약 ===================== */}
            <div className={styles.profile}>
              <img
                src="/images/defaultProfile.png"
                alt="user"
                className={styles.profileImg}
              />
              <div>
                <strong>ID:</strong> {user.id} <br />
                <strong>닉네임:</strong> {nickname}
              </div>
            </div>

            {/* ===================== 기본 정보 ===================== */}
            <section className={styles.formSection}>
              <h4>기본 정보</h4>

              <div className={styles.inputGroup}>
                <strong>ID:</strong>
                <input
                  value={user.id}
                  disabled
                  className={styles.disabledInput}
                />
              </div>

              <div className={styles.inputGroup}>
                <strong>닉네임:</strong>
                <input
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  placeholder="닉네임 입력"
                />
              </div>

              <div className={styles.gradeWrapper}>
                <strong>등급:</strong>
                <select
                  value={selectedGrade}
                  onChange={(e) => setSelectedGrade(e.target.value)}
                >
                  {Object.keys(gradeInfo).map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>

                <div className={styles.userSummary}>
                  {currentGradeData && (
                    <img
                      src={currentGradeData.img}
                      alt={selectedGrade}
                      className={styles.gradeImg}
                    />
                  )}
                </div>
              </div>

              {/* <div className={styles.inputGroup}>
                <strong>신고 점수:</strong>
                <input
                  type="number"
                  value={reportScore}
                  onChange={(e) => setReportScore(e.target.value)}
                />
              </div> */}

              <div className={styles.inputGroup}>
                <strong>신고 점수:</strong>
                <input
                  type="number"
                  value={reportScore}
                  disabled
                  className={styles.disabledInput}
                />
              </div>

            </section>

            {/* ===================== 계정 상태 표시 ===================== */}
            <section className={styles.formSection}>
              <h4>계정 상태</h4>

              <div className={styles.statusRow}>
                <span
                  className={`${styles.statusBadge} ${styles[userStatus]}`}
                >
                  {userStatus}
                </span>
              </div>
            </section>

            {/* ===================== 관리자 메모 ===================== */}
            <textarea
              placeholder="관리자용 메모를 입력하세요 (수정 사유, 정지 사유 등)"
              value={adminMemo}
              onChange={(e) => setAdminMemo(e.target.value)}
            />

            {/* ===================== 하단 액션 버튼 ===================== */}

              {/* 상태 변경 버튼 */}
              <div className={styles.statusActions}>
                {userStatus === '정상' && (
                  <button
                    type="button"
                    className={styles.banBtn}
                    onClick={() => handleStatusChange('정지')}
                  >
                    회원 정지
                  </button>
                )}

                {userStatus === '정지' && (
                  <>
                    <button
                      type="button"
                      className={styles.primary}
                      onClick={() => handleStatusChange('정상')}
                    >
                      정지 해제
                    </button>
                    <button
                      type="button"
                      className={styles.banBtn}
                      onClick={() => handleStatusChange('탈퇴')}
                    >
                      탈퇴 처리
                    </button>
                  </>
                )}

                {userStatus === '탈퇴' && (
                  <span className={styles.mutedText}>
                    탈퇴 회원
                  </span>
                )}

            <div className={styles.actionButtons}>
              {/* 저장 버튼 */}
              <button
                type="button"
                className={`${styles.primary} ${styles.saveBtn}`}
                onClick={handleSave}
              >
                저장
              </button>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default UserDetailModal;
