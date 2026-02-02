// src/components/admin/NoticeDetailPage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from '../admin/styles/NoticeDetailPage.module.css';
import { sampleNotices } from './data/sampleNotices';

const NoticeDetailPage = () => {
    const { id } = useParams();

    // 🔹 샘플 데이터 찾기
    const notice = sampleNotices.find(n => n.id === Number(id));

    // 🔹 상태값 초기화
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [postDate, setPostDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [images, setImages] = useState([]);

    // 🔹 notice가 바뀌면 상태 초기화
    useEffect(() => {
        if (notice) {
            setTitle(notice.title);
            setDescription(notice.description || '');
            setPostDate(notice.postDate);
            setEndDate(notice.endDate);
        }
    }, [notice]);

    if (!notice) return <div>공지사항을 찾을 수 없습니다.</div>;

    // 🔹 status 배지 클래스
    const statusClass = notice.status === '진행중' ? styles.active : styles.inactive;

    // 🔹 저장 버튼 클릭
    const handleSave = () => {
        alert(`샘플 데이터 시뮬레이션:
ID: ${notice.id}
제목: ${title}
설명: ${description}
게시일: ${postDate}
종료일: ${endDate}
상태: ${notice.status}
첨부 이미지: ${images.length > 0 ? images.map(img => img.file.name).join(', ') : '없음'}
`);
    };

    // 🔹 삭제 버튼 클릭
    const handleDelete = () => {
        if (window.confirm('이 공지사항을 삭제하시겠습니까?')) {
            alert(`샘플 데이터 시뮬레이션: ${notice.id} 삭제`);
        }
    };

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.wrapper}>
                {/* 헤더 */}
                <div className={styles.adminHeader}>
                    <h2 className={styles.adminTitle}>공지사항 상세 정보</h2>
                    <span className={styles.adminDesc}>
                        공지사항 ID #{notice.id} 상세 정보
                    </span>
                </div>

                {/* 본문 */}
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

                    {/* 사진 첨부 */}
                    <div className={styles.inputGroup}>
                        <label>사진 첨부</label>
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={(e) => {
                                const files = Array.from(e.target.files);
                                const previews = files.map(file => ({
                                    file,
                                    url: URL.createObjectURL(file)
                                }));
                                setImages(prev => [...prev, ...previews]);
                            }}
                        />

                        <div className={styles.previewBox}>
                            {images.map((img, idx) => (
                                <div key={idx} className={styles.previewItem}>
                                    <img src={img.url} alt={`첨부 ${idx}`} />
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
                    <div className={styles.statusWrapper}>
                        <strong>상태</strong>
                        <span className={`${styles.statusBadge} ${statusClass}`}>
                            {notice.status}
                        </span>
                    </div>

                    {/* 액션 버튼 */}
                    <div className={styles.actionButtons}>
                        <button className={styles.primary} onClick={handleSave}>저장</button>
                        <button className={styles.danger} onClick={handleDelete}>삭제</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NoticeDetailPage;
