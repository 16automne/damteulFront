// src/components/admin/NoticeEventWritePage.js
import React, { useState, useEffect } from 'react';
import styles from '../admin/styles/NoticeDetailPage.module.css';

const NoticeEventWritePage = ({ defaultTab = 'notice', existingData = null }) => {
    // 🔹 탭: 'notice' | 'event'
    const [tab, setTab] = useState(defaultTab);

    // 🔹 상태 초기화
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [images, setImages] = useState([]);

    // 🔹 기존 데이터가 있으면 초기화
    useEffect(() => {
        if (existingData) {
            setTitle(existingData.title || '');
            setDescription(existingData.description || '');
            setStartDate(existingData.startDate || '');
            setEndDate(existingData.endDate || '');
            setImages(existingData.images || []);
            if (existingData.type) setTab(existingData.type); // notice | event
        }
    }, [existingData]);

    // 🔹 이미지 첨부 처리
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const previews = files.map(file => ({ file, url: URL.createObjectURL(file) }));
        setImages(prev => [...prev, ...previews]);
    };

    // 🔹 저장 버튼
    const handleSave = () => {
        alert(`저장 시뮬레이션:
탭: ${tab === 'notice' ? '공지사항' : '이벤트'}
제목: ${title}
설명: ${description}
${tab === 'event' ? `기간: ${startDate} ~ ${endDate}` : `종료일: ${endDate}`}
첨부 이미지: ${images.map(i => i.file?.name || i.name).join(', ') || '없음'}
`);
    };

    // 🔹 진행 상태 계산 (수정 모드용)
    const today = new Date();
    const statusBadge =
        tab === 'event'
            ? startDate && endDate
                ? today > new Date(endDate)
                    ? '종료'
                    : '진행중'
                : ''
            : endDate
                ? today > new Date(endDate)
                    ? '종료'
                    : '진행중'
                : '';

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.wrapper}>
                {/* ==========================
            헤더
        ========================== */}
                <div className={styles.adminHeader}>
                    <h2 className={styles.adminTitle}>
                        {existingData
                            ? tab === 'notice'
                                ? '공지사항 수정'
                                : '이벤트 수정'
                            : tab === 'notice'
                                ? '공지사항 작성'
                                : '이벤트 작성'}
                    </h2>
                    <span className={styles.adminDesc}>
                        {existingData
                            ? tab === 'notice'
                                ? '기존 공지사항을 수정합니다.'
                                : '기존 이벤트를 수정합니다.'
                            : tab === 'notice'
                                ? '새 공지사항을 작성합니다.'
                                : '새 이벤트를 작성합니다.'}
                    </span>
                </div>

                {/* ==========================
            폼
        ========================== */}
                <div className={styles.adminBody}>
                    {/* 제목 */}
                    <div className={styles.inputGroup}>
                        <label>제목</label>
                        <input value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>

                    {/* 설명 */}
                    <div className={styles.inputGroup}>
                        <label>설명</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={4}
                        />
                    </div>

                    {/* 이벤트 기간 */}
                    {tab === 'event' && (
                        <>
                            <div className={styles.inputGroup}>
                                <label>시작일</label>
                                <input
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <label>종료일</label>
                                <input
                                    type="date"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                />
                            </div>
                        </>
                    )}

                    {/* 공지 종료일 (공지사항 전용) */}
                    {tab === 'notice' && (
                        <div className={styles.inputGroup}>
                            <label>종료일</label>
                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                        </div>
                    )}

                    {/* 이미지 첨부 */}
                    <div className={styles.inputGroup}>
                        <label>사진 첨부</label>
                        <input type="file" multiple accept="image/*" onChange={handleImageChange} />
                        <div className={styles.previewBox}>
                            {images.map((img, idx) => (
                                <div key={idx} className={styles.previewItem}>
                                    <img src={img.url || img} alt={`첨부 ${idx}`} />
                                    <button
                                        type="button"
                                        onClick={() => setImages(images.filter((_, i) => i !== idx))}
                                    >
                                        삭제
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 상태 배지 */}
                    {existingData && (
                        <div className={styles.statusWrapper}>
                            <strong>진행 상태:</strong>
                            <span
                                className={`${styles.statusBadge} ${statusBadge === '진행중' ? styles.active : styles.inactive
                                    }`}
                            >
                                {statusBadge}
                            </span>
                        </div>
                    )}

                    {/* 저장 버튼 */}
                    <div className={styles.statusActions}>
                        <button className={styles.primary} onClick={handleSave}>
                            저장
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NoticeEventWritePage;
