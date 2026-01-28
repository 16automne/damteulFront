import React, { useState } from 'react'; 
import '../admin/styles/TradeAdminModal.scss'; 

const TradeAdminModal = ({ trade, onClose, onComplete }) => {

  /* =================================================
     1️⃣ 수정용 상태
     - trade(원본)를 직접 건드리지 않기 위해
     - 모달 내부에서만 사용하는 복사본
  ================================================= */
  const [editTrade, setEditTrade] = useState(trade);

  // trade가 없으면 렌더링하지 않음 (안전장치)
  if (!trade) return null;

  return (
    <div className="modalOverlay">
      <div className="modalContent">

        {/* ==========================
            닫기 버튼 (X)
        ========================== */}
        <button className="closeButton" onClick={onClose}>×</button>

        {/* ==========================
            헤더 영역
        ========================== */}
        <div className="adminHeader">
          <h3 className="adminTitle">거래 상세 관리</h3>
          <p className="adminDesc">
            선택한 거래 정보를 확인하고 수정할 수 있습니다
          </p>
        </div>

        {/* ==========================
            본문 영역
        ========================== */}
        <div className="modalBody">
          <section>
            <h4>거래 정보</h4>

            {/* 상품명 (읽기 전용) */}
            <div className="formGroup">
              <label>상품명</label>
              <input value={editTrade.product} disabled />
            </div>

            {/* 구매자 */}
            <div className="formGroup">
              <label>구매자</label>
              <input value={editTrade.buyer} disabled />
            </div>

            {/* 판매자 */}
            <div className="formGroup">
              <label>판매자</label>
              <input value={editTrade.seller} disabled />
            </div>

            {/* 거래 방식 */}
            <div className="formGroup">
              <label>거래 방식</label>
              <input value={editTrade.method} disabled />
            </div>

            {/* 금액 */}
            <div className="formGroup">
              <label>금액</label>
              <input
                value={`${editTrade.price.toLocaleString()}원`}
                disabled
              />
            </div>

            {/* ==========================
                🔥 수정 가능한 부분
                거래 상태 select
            ========================== */}
            <div className="formGroup">
              <label>거래 상태</label>
              <select
                value={editTrade.completed}
                onChange={(e) =>
                  setEditTrade({
                    ...editTrade,
                    completed: e.target.value,
                  })
                }
              >
                <option value="예">완료</option>
                <option value="아니오">미완료</option>
              </select>
            </div>

          </section>
        </div>

        {/* ==========================
            하단 버튼 영역
        ========================== */}
        <div className="actionButtons">

          {/* 저장 버튼
              - editTrade 전체를 부모로 전달 */}
          <button
            className="primary"
            onClick={() => onComplete(editTrade)}
          >
            저장
          </button>

          {/* 닫기 버튼 (수정 내용 폐기) */}
          <button className="danger" onClick={onClose}>
            닫기
          </button>

        </div>
      </div>
    </div>
  );
};

export default TradeAdminModal;
