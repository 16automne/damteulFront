import React, { useState } from 'react';
import styles from '../admin/styles/PostAdminModal.module.css';


const PostAdminModal = ({ post, onClose, onDelete, onHide }) => {
  const [status, setStatus] = useState(post.productStatus);
  if (!post) return null;

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
          <h3 className={styles.adminTitle}>게시글 관리</h3>
          <p className={styles.adminDesc}>
            선택한 게시글의 정보를 확인하고 관리할 수 있습니다
          </p>
        </div>

        {/* 본문 */}
        <div className={styles.modalBody}>
          <section>
            <h4>게시글 정보</h4>

            <div className={styles.formGroup}>
              <label>ID</label>
              <input value={post.id} disabled />
            </div>

            <div className={styles.formGroup}>
              <label>제목</label>
              <input value={post.title} disabled />
            </div>

            <div className={styles.formGroup}>
              <label>작성자</label>
              <input value={post.writer} disabled />
            </div>

            <div className={styles.formGroup}>
              <label>카테고리</label>
              <input value={post.category} disabled />
            </div>

            <div className={styles.formGroup}>
              <label>상품 상태</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="새상품">새상품</option>
                <option value="사용감 있음">사용감 있음</option>
              </select>
            </div>
          </section>

          {/* 버튼 영역 */}
          <div className={styles.actionButtons}>
            <button
              className={styles.primary}
              onClick={() => onHide(post.id)}
            >
              숨김 처리
            </button>
            <button
              className={styles.danger}
              onClick={() => onDelete(post.id)}
            >
              삭제
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostAdminModal;
