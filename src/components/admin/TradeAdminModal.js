import React, { useState } from 'react'; 
// 1. styles라는 이름으로 import를 반드시 확인하세요!
import styles from '../admin/styles/TradeAdminModal.module.scss'; 

const TradeAdminModal = ({ trade, onClose, onComplete }) => {

  const [editTrade, setEditTrade] = useState(trade);

  if (!trade) return null;

  return (
    /* 2. 모든 className을 styles 객체의 속성으로 변경 */
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>

        {/* 닫기 버튼 */}
        <button className={styles.closeButton} onClick={onClose}>×</button>

        {/* 헤더 영역 */}
        <div className={styles.adminHeader}>
          <h3 className={styles.adminTitle}>거래 상세 관리</h3>
          <p className={styles.adminDesc}>
            선택한 거래 정보를 확인하고 수정할 수 있습니다
          </p>
        </div>

        {/* 본문 영역 */}
        <div className={styles.modalBody}>
          <section>
            <div className={styles.formGroup}>
              <label>상품명</label>
              <input value={editTrade.product} disabled />
            </div>

            <div className={styles.formGroup}>
              <label>구매자</label>
              <input value={editTrade.buyer} disabled />
            </div>

            <div className={styles.formGroup}>
              <label>판매자</label>
              <input value={editTrade.seller} disabled />
            </div>

            <div className={styles.formGroup}>
              <label>거래 방식</label>
              <input value={editTrade.method} disabled />
            </div>

            <div className={styles.formGroup}>
              <label>금액</label>
              <input
                value={`${editTrade.price.toLocaleString()}원`}
                disabled
              />
            </div>

            <div className={styles.formGroup}>
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

        {/* 하단 버튼 영역 */}
        <div className={styles.actionButtons}>
          <button
            className={styles.primary}
            onClick={() => onComplete(editTrade)}
          >
            저장
          </button>

          <button className={styles.danger} onClick={onClose}>
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default TradeAdminModal;