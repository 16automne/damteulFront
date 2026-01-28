import React, { useState } from 'react';
import styles from '../admin/styles/ReportAdminModal.module.scss';

const ReportAdminModal = ({ report, onClose, onComplete }) => {
  const [editReport, setEditReport] = useState(report);

  // 🔹 report가 없으면 모달 렌더링 안 함
  if (!report) return null;

  return (
    /* =========================
       🔹 모달 오버레이
       - 클릭 시 모달 닫힘
    ========================= */
    <div className={styles.modalOverlay} onClick={onClose}>
      <div
        className={styles.modalContent}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 닫기 버튼 */}
        <button
          className={styles.closeButton}
          onClick={onClose}
        >
          ×
        </button>

        {/* =========================
           🔹 헤더 영역
        ========================= */}
        <div className={styles.adminHeader}>
          <h3 className={styles.adminTitle}>신고 상세 관리</h3>
          <p className={styles.adminDesc}>
            신고 내용을 확인하고 처리 상태를 변경할 수 있습니다
          </p>
        </div>

        {/* =========================
           🔹 본문 영역
        ========================= */}
        <div className={styles.modalBody}>
          <section>
            <div className={styles.formGroup}>
              <label>신고 ID</label>
              <input value={editReport.id} disabled />
            </div>

            <div className={styles.formGroup}>
              <label>신고 카테고리</label>
              <input value={editReport.category} disabled />
            </div>

            <div className={styles.formGroup}>
              <label>신고자</label>
              <input value={editReport.reporter} disabled />
            </div>

            <div className={styles.formGroup}>
              <label>신고 대상</label>
              <input value={editReport.reported} disabled />
            </div>

            <div className={styles.formGroup}>
              <label>신고 일시</label>
              <input value={editReport.createdAt} disabled />
            </div>

            <div className={styles.formGroup}>
              <label>처리 상태</label>
              <select
                value={editReport.status}
                onChange={(e) =>
                  setEditReport({
                    ...editReport,
                    status: e.target.value,
                  })
                }
              >
                <option value="처리중">처리중</option>
                <option value="완료">완료</option>
                <option value="무시">무시</option>
              </select>
            </div>
          </section>
        </div>

        {/* =========================
           🔹 하단 버튼 영역
        ========================= */}
        <div className={styles.actionButtons}>
          <button
            className={styles.primary}
            onClick={() => onComplete(editReport)}
          >
            저장
          </button>

          <button
            className={styles.danger}
            onClick={onClose}
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportAdminModal;
