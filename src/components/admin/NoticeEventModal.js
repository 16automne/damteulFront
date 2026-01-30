// src/components/admin/NoticeEventModal.js
import React, { useState } from 'react';
// styles라는 이름으로 가져옵니다.
import styles from '../admin/styles/NoticeEventModal.module.css'; 

const NoticeEventModal = ({ item, onClose }) => {
  const [title, setTitle] = useState(item.title || '');
  const [content, setContent] = useState(item.content || '');
  const [images, setImages] = useState([]);
  const [startDate, setStartDate] = useState(item.startDate || '');
  const [endDate, setEndDate] = useState(item.endDate || '');

  if (!item) return null;

  return (
    // 1. 모달 오버레이
    <div className={styles.modalOverlay} onClick={onClose}>
      
      {/* 2. 모달 컨텐츠 */}
      <div
        className={styles.modalContent}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 3. 닫기 버튼 */}
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>

        {/* 4. 모달 헤더 */}
        <div className={styles.adminHeader}>
          <h2 className={styles.adminTitle}>상세 정보</h2>
          <span className={styles.adminDesc}>
            {item.id} 번 데이터 관리
          </span>
        </div>

        {/* 5. 모달 바디 */}
        <div className={styles.modalBody}>

          <div className={styles.formGroup}>
            <label>제목</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="제목을 입력하세요"
            />
          </div>

          <div className={styles.formGroup}>
            <label>내용</label>
            <textarea
              rows="6"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="내용을 입력하세요"
            />
          </div>

          <div className={styles.formGroup}>
            <label>이미지 첨부</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => setImages([...e.target.files])}
            />
          </div>

          {images.length > 0 && (
            <div className={styles.previewBox}>
              {Array.from(images).map((file, idx) => (
                <img
                  key={idx}
                  src={URL.createObjectURL(file)}
                  alt="미리보기"
                />
              ))}
            </div>
          )}

          {item.type === 'event' && (
            <>
              <div className={styles.formGroup}>
                <label>이벤트 시작일</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>

              <div className={styles.formGroup}>
                <label>이벤트 종료일</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </>
          )}

</div>

          {/* 6. 하단 버튼 영역 */}
          <div className={styles.actionButtons}>
            <button className={styles.danger}>
              삭제
            </button>

            {/* 클래스명이 여러 개이거나 동적일 때 예시 */}
            <button className={`${styles.primary} ${styles.saveButton}`}>
              저장
            </button>
          </div>


      </div>
    </div>
  );
};

export default NoticeEventModal;