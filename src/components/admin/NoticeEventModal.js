// src/components/admin/NoticeEventModal.js
import React, { useState } from 'react';
import '../admin/styles/NoticeEventModal.scss';

/**
 * NoticeEventModal
 * - 공지사항 / 이벤트 공통 상세·수정 모달
 * - item.type === 'event' 인 경우에만 날짜 입력 노출
 */
const NoticeEventModal = ({ item, onClose }) => {
  /* ===========================
     1️⃣ 상태(state) 초기화
     - 수정 모달이므로 item 값 기반
  ============================ */

  // 제목
  const [title, setTitle] = useState(item.title || '');

  // 내용
  const [content, setContent] = useState(item.content || '');

  // 이미지 파일 목록 (신규 업로드용)
  const [images, setImages] = useState([]);

  // 이벤트 시작일 / 종료일 (이벤트일 경우만 사용)
  const [startDate, setStartDate] = useState(item.startDate || '');
  const [endDate, setEndDate] = useState(item.endDate || '');

  /* ===========================
     2️⃣ 렌더링
  ============================ */
  return (
    // 모달 바깥 영역 (클릭 시 닫힘)
    <div className="modalOverlay" onClick={onClose}>
      {/* 모달 본문 (클릭 이벤트 전파 차단) */}
      <div
        className="modalContent"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 닫기 버튼 */}
        <button className="closeButton" onClick={onClose}>
          ×
        </button>

        {/* 모달 헤더 */}
        <div className="adminHeader">
          <h2 className="adminTitle">상세 정보</h2>
          <span className="adminDesc">
            {item.id} 번 데이터 관리
          </span>
        </div>

        {/* ===========================
            모달 본문
        ============================ */}
        <div className="modalBody">

          {/* 제목 */}
          <div className="formGroup">
            <label>제목</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="제목을 입력하세요"
            />
          </div>

          {/* 내용 */}
          <div className="formGroup">
            <label>내용</label>
            <textarea
              rows="6"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="내용을 입력하세요"
            />
          </div>

          {/* ===========================
              📸 이미지 첨부
              - 다중 업로드 가능
              - 실제 저장은 FormData로 처리 예정
          ============================ */}
          <div className="formGroup">
            <label>이미지 첨부</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => setImages([...e.target.files])}
            />
          </div>

           {/* 이미지 미리 보기  */}
          {images.length > 0 && (
          <div className="previewBox">
            {Array.from(images).map((file, idx) => (
              <img
                key={idx}
                src={URL.createObjectURL(file)}
                alt="preview"
              />
            ))}
          </div>
        )}  


          {/* ===========================
              📅 이벤트 전용 필드
              - item.type === 'event' 일 때만 노출
          ============================ */}
          {item.type === 'event' && (
            <>
              <div className="formGroup">
                <label>이벤트 시작일</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>

              <div className="formGroup">
                <label>이벤트 종료일</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </>
          )}

          {/* ===========================
              하단 액션 버튼
          ============================ */}
          <div className="actionButtons">
            {/* 삭제 */}
            <button className="danger">
              삭제
            </button>

            {/* 저장 */}
            <button className="primary">
              저장
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default NoticeEventModal;
