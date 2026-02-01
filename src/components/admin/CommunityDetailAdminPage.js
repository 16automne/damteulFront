import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { sampleCommunities } from './data/sampleCommunities';
import styles from '../admin/styles/CommunityDetailAdminPage.module.css';

const CommunityDetailAdminPage = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        const found = sampleCommunities.find(item => item.id === parseInt(id));
        setPost(found);
    }, [id]);

    if (!post) return <div className={styles.empty}>게시글이 없습니다.</div>;

    return (
        <div className={styles.adminPageContainer}>
            <div className={styles.adminHeader}>
                <h2 className={styles.adminTitle}>{post.title}</h2>
                <span className={styles.adminDesc}>작성자: {post.author} | 작성일: {post.date}</span>
            </div>

            <div className={styles.statusWrap}>
                <span className={`${styles.statusBadge} ${post.status === '진행중' ? styles.new : styles.used}`}>
                    {post.status}
                </span>
            </div>

            <div className={styles.adminBody}>
                <div className={styles.content}>
                    {post.content.split('\n').map((line, idx) => (
                        <p key={idx}>{line}</p>
                    ))}
                </div>

                {post.images?.length > 0 && (
                    <div className={styles.imageContainer}>
                        {post.images.map((img, idx) => (
                            <img key={idx} src={img} alt={`img-${idx}`} />
                        ))}
                    </div>
                )}
            </div>

            <div className={styles.actionButtons}>
                <button className={styles.primary} onClick={() => alert('수정')}>수정</button>
                <button className={styles.danger} onClick={() => alert('삭제')}>삭제</button>
            </div>
        </div>
    );
};

export default CommunityDetailAdminPage;
