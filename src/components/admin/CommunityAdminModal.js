import React, { useState } from 'react';
import styles from '../admin/styles/CommunityAdminModal.module.scss';

const CommunityAdminModal = ({ community, onClose, onComplete, onDelete }) => {
  // ✅ Hook은 항상 최상단
  const [status, setStatus] = useState(
    community ? community.status : ''
  );

  // ✅ 그 다음 early return
  if (!community) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div
        className={styles.modalContent}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 닫기 버튼 */}
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>

        {/* 헤더 */}
        <div className={styles.adminHeader}>
          <h3 className={styles.adminTitle}>커뮤니티 관리</h3>
          <p className={styles.adminDesc}>
            선택한 커뮤니티 게시글을 관리합니다
          </p>
        </div>

        {/* 본문 */}
        <div className={styles.modalBody}>
          <section>
            <h4>게시글 정보</h4>

            <div className={styles.formGroup}>
              <label>ID</label>
              <input value={community.id} disabled />
            </div>

            <div className={styles.formGroup}>
              <label>카테고리</label>
              <input value={community.category} disabled />
            </div>

            <div className={styles.formGroup}>
              <label>제목</label>
              <input value={community.title} disabled />
            </div>

            <div className={styles.formGroup}>
              <label>모임 날짜</label>
              <input value={community.date} disabled />
            </div>

            <div className={styles.formGroup}>
              <label>상태</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="진행중">진행중</option>
                <option value="종료">종료</option>
              </select>
            </div>
          </section>

          {/* 버튼 */}
          <div className={styles.actionButtons}>
            <button
              className={`${styles.primary}`}
              onClick={() => onComplete(community.id, status)}
            >
              상태 변경
            </button>
            <button
              className={`${styles.danger}`}
              onClick={() => onDelete(community.id)}
            >
              삭제
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityAdminModal;
