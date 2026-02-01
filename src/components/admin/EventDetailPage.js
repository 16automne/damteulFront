import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from '../admin/styles/EventDetailPage.module.scss';
import { sampleEvents } from './data/sampleEvents';

const EventDetailPage = () => {
    const { id } = useParams();
    const event = sampleEvents.find(ev => ev.id === id);

    // 상태값 초기화
    const [title, setTitle] = useState(event ? event.title : '');
    const [description, setDescription] = useState(event ? event.description : '');
    const [startDate, setStartDate] = useState(event ? event.startDate : '');
    const [endDate, setEndDate] = useState(event ? event.endDate : '');

    // 상태 계산 (자동, 진행중/종료만 표시)
    const today = new Date();
    const end = new Date(event.endDate);

    let statusBadge = today > end ? "종료" : "진행중"; // 종료 아니면 진행중


    if (!event) return <div>이벤트를 찾을 수 없습니다.</div>;



    const handleSave = () => {
        alert(`샘플 데이터 시뮬레이션:  
ID: ${event.id}  
제목: ${title}  
설명: ${description}  
시작일: ${startDate}  
종료일: ${endDate}  
상태: ${statusBadge}`);
    };



    const handleDelete = () => {
        if (window.confirm('이 이벤트를 삭제하시겠습니까?')) {
            alert(`샘플 데이터 시뮬레이션: ${event.id} 삭제`);
        }
    };

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.wrapper}>
                {/* 헤더 */}
                <div className={styles.adminHeader}>
                    <h2 className={styles.adminTitle}>이벤트 상세 정보</h2>
                    <span className={styles.adminDesc}>
                        이벤트 ID #{event.id} 상세 정보
                    </span>
                </div>


                {/* 이벤트 카드 */}
                <div className={styles.eventCard}>
                    <div className={styles.inputGroup}>
                        <label>제목</label>
                        <input value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>

                    <div className={styles.inputGroup}>
                        <label>설명</label>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} />
                    </div>

                    <div className={styles.inputGroup}>
                        <label>배너 이미지</label>
                        {event.bannerImg && (
                            <img src={event.bannerImg} alt={title} style={{ width: '100%', borderRadius: '6px' }} />
                        )}
                    </div>

                    <div className={styles.inputGroup}>
                        <label>시작일</label>
                        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                    </div>

                    <div className={styles.inputGroup}>
                        <label>종료일</label>
                        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                    </div>

                    {/* 상태 배지 */}
                    <div className={styles.statusWrapper}>
                        <strong>진행 상태:</strong>
                        <span className={`${styles.statusBadge} ${styles[statusBadge]}`}>
                            {statusBadge}
                        </span>
                    </div>

                    {/* 하단 액션 버튼 */}
                    <div className={styles.statusActions}>
                        <button className={styles.primary} onClick={handleSave}>저장</button>
                        <button className={styles.danger} onClick={handleDelete}>삭제</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventDetailPage;
