// src/components/admin/CommunityDetailPage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from '../admin/styles/CommunityDetailPage.module.scss';
import { sampleCommunityPosts } from './data/sampleCommunityPosts';

const CommunityDetailPage = () => {
    const { id } = useParams();

    // 🔹 샘플 데이터 찾기
    const post = sampleCommunityPosts.find(p => p.id === Number(id));

    // 🔹 상태값 초기화 (Hooks는 항상 최상위에서 호출)
    const [category, setCategory] = useState(post ? post.category : '');
    const [title, setTitle] = useState(post ? post.title : '');
    const [description, setDescription] = useState(post ? post.description : '');
    const [date, setDate] = useState(post ? post.date : '');
    const [status, setStatus] = useState(post ? post.status : '');

    // 🔹 post가 바뀌면 상태 업데이트
    useEffect(() => {
        if (post) {
            setCategory(post.category);
            setTitle(post.title);
            setDescription(post.description);
            setDate(post.date);
            setStatus(post.status);
        }
    }, [post]);

    if (!post) return <div>게시글을 찾을 수 없습니다.</div>;

    // 🔹 저장 버튼 클릭
    const handleDelete = () => {
        alert(`샘플 데이터 시뮬레이션:
ID: ${post.id}
카테고리: ${category}
제목: ${title}
내용: ${description}
모임 날짜: ${date}
상태: ${status}`);
    };

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.wrapper}>
                {/* 헤더 */}
                <div className={styles.adminHeader}>
                    <h2 className={styles.adminTitle}>커뮤니티 상세 정보</h2>
                    <span className={styles.adminDesc}>
                        커뮤니티 게시글 ID #{post.id} 상세 정보
                    </span>
                </div>

                {/* 본문 */}
                <div className={styles.adminBody}>
                    {/* 카테고리 */}
                    <div className={styles.inputGroup}>
                        <label>카테고리</label>
                        <input value={category} onChange={(e) => setCategory(e.target.value)} readOnly />
                    </div>

                    {/* 제목 */}
                    <div className={styles.inputGroup}>
                        <label>제목</label>
                        <input value={title} onChange={(e) => setTitle(e.target.value)} readOnly />
                    </div>

                    {/* 내용 */}
                    <div className={styles.inputGroup}>
                        <label>내용</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)} readOnly
                            rows={6}
                        />
                    </div>

                    {/* 모임 날짜 */}
                    <div className={styles.inputGroup}>
                        <label>모임 날짜</label>
                        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} disabled />
                    </div>

                    {/* 상태 */}
                    <div className={styles.statusWrapper}>
                        <strong>상태:</strong>
                        <span className={`${styles.statusBadge} ${status === '진행중' ? styles.new : styles.end}`}>
                            {status}
                        </span>
                    </div>

                    {/* 저장 버튼 */}
                    <div className={styles.statusActions}>
                        <button className={styles.danger} onClick={handleDelete}>
                            삭제
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommunityDetailPage;
