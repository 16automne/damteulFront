// src/components/admin/TradeDetailPage.js
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from '../admin/styles/TradeDetailPage.module.css';
import { sampleTransactions } from './data/sampleTransactions';

const TradeDetailPage = () => {
    const { id } = useParams();
    const trade = sampleTransactions.find(item => item.id === Number(id));

    

    // 🔹 게시글 숨김/보이기 상태
    const [showArticle, setShowArticle] = useState(true);

    // 🔹 거래 상태 (변경 불가)
    const status = trade.completed;


    if (!trade) {
        return <div className={styles.pageWrapper}>거래 정보를 찾을 수 없습니다.</div>;
    }



// 🔹 저장 버튼 클릭 시 실행될 함수
const handleUpdateStatus = () => {
    // 1. selectedStatus 대신 실제 데이터인 status(trade.completed)를 사용하거나,
    // 2. 현재 화면의 설정값(showArticle 등)을 확인하도록 수정합니다.
    console.log('저장 시도: ', {
        거래ID: trade.id,
        거래상태: status, // trade.completed 값
        게시글표시: showArticle
    });
    
    alert('설정이 저장되었습니다.');
};

    const handleDeleteReport = () => {
        console.log('게시글 표시 여부:', showArticle);
        // TODO: API 호출하여 게시글 숨김/보이기 적용
    };

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.wrapper}>
                {/* 헤더 */}
                <div className={styles.adminHeader}>
                    <h2 className={styles.adminTitle}>거래 상세 관리</h2>
                    <span className={styles.adminDesc}>
                        거래 ID #{trade.id} 상세 정보
                    </span>
                </div>

                {/* 본문 */}
                <div className={styles.adminBody}>
                    {/* 상품 정보 */}
                    <div className={styles.formGroup}>
                        <label>상품명</label>
                        <input type="text" value={trade.product} readOnly />
                    </div>

                    <div className={styles.formGroup}>
                        <label>설명</label>
                        <textarea value={trade.description} readOnly />
                    </div>

                    {/* 이미지 */}
                    <div className={styles.formGroup}>
                        <label>이미지</label>
                        <div className={styles.imageGrid}>
                            {trade.images.map((img, idx) => (
                                <img
                                    key={idx}
                                    src={img}
                                    alt={`상품 이미지 ${idx + 1}`}
                                    style={{
                                        width: '150px',
                                        height: '100px',
                                        objectFit: 'cover',
                                        borderRadius: '8px',
                                    }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* 거래 정보 */}
                    <div className={styles.formGroup}>
                        <label>판매자</label>
                        <input type="text" value={trade.seller} readOnly />
                    </div>
                    <div className={styles.formGroup}>
                        <label>구매자</label>
                        <input type="text" value={trade.buyer} readOnly />
                    </div>
                    <div className={styles.formGroup}>
                        <label>거래 방식</label>
                        <input type="text" value={trade.method} readOnly />
                    </div>
                    <div className={styles.formGroup}>
                        <label>거래 일시</label>
                        <input type="text" value={trade.date} readOnly />
                    </div>
                    <div className={styles.formGroup}>
                        <label>거래 금액</label>
                        <input type="text" value={`${trade.price.toLocaleString()}원`} readOnly />
                    </div>

                    {/* 거래 상태 (변경 불가) */}
                    <div className={styles.formGroup}>
                        <label>거래 상태</label>
                        <section className={styles.formSection}>
                            <span
                                className={`${styles.statusBadge} ${status === '완료'
                                    ? styles.승인
                                    : status === '거래중'
                                        ? styles.보류
                                        : styles.반려
                                    }`}
                            >
                                {status}
                            </span>
                        </section>
                    </div>

                    {/* 게시글 숨김/보이기 선택 */}
                    <div className={styles.formGroup}>
                        <label>게시글 표시 여부</label>
                        <div className={styles.formSection}>
                            <label className={styles.checkboxLabel}>
                                <input
                                    type="checkbox"
                                    checked={showArticle}
                                    onChange={(e) => setShowArticle(e.target.checked)}
                                />
                                표시
                            </label>
                        </div>
                    </div>
                </div>

                {/* 하단 버튼 */}
                <div className={styles.actionButtons}>

                <button
                        className={styles.primary}
                        onClick={() => handleUpdateStatus()}
                    >
                        저장
                    </button>

                    <button className={styles.danger} onClick={handleDeleteReport}>
                        삭제
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TradeDetailPage;
