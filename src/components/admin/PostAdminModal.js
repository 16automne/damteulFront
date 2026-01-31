import React, { useState } from 'react';
import styles from '../admin/styles/PostAdminModal.module.scss';

// 샘플 데이터
const samplePosts = [
  { id: 'post01', title: '첫 번째 게시글', writer: '은하', category: '공지', productStatus: '새상품' },
  { id: 'post02', title: '두 번째 게시글', writer: '별하', category: '자유', productStatus: '사용감 있음' },
];

const PostAdminPage = () => {
  const [posts, setPosts] = useState(samplePosts);
  const [selectedStatus, setSelectedStatus] = useState({});

  const handleStatusChange = (id, value) => {
    setSelectedStatus(prev => ({ ...prev, [id]: value }));
  };

  const handleSave = (id) => {
    console.log('저장', id, selectedStatus[id]);
    // 실제 API 연결
  };

  const handleDelete = (id) => {
    console.log('삭제', id);
    setPosts(posts.filter(p => p.id !== id));
  };

  return (
    <div className={styles.pageWrapper}>
      <h2 className={styles.adminTitle}>게시글 관리</h2>
      <div className={styles.pageContent}>
        {posts.map(post => (
          <div key={post.id} className={styles.postCard}>
            <div className={styles.formGroup}>
              <label>ID</label>
              <input value={post.id} disabled />
            </div>
            <div className={styles.formGroup}>
              <label>제목</label>
              <input value={post.title} disabled />
            </div>
            <div className={styles.formGroup}>
              <label>작성자</label>
              <input value={post.writer} disabled />
            </div>
            <div className={styles.formGroup}>
              <label>카테고리</label>
              <input value={post.category} disabled />
            </div>
            <div className={styles.formGroup}>
              <label>상품 상태</label>
              <select
                value={selectedStatus[post.id] || post.productStatus}
                onChange={(e) => handleStatusChange(post.id, e.target.value)}
              >
                <option value="새상품">새상품</option>
                <option value="사용감 있음">사용감 있음</option>
              </select>
            </div>

            <div className={styles.actionButtons}>
              <button className={styles.primary} onClick={() => handleSave(post.id)}>저장</button>
              <button className={styles.danger} onClick={() => handleDelete(post.id)}>삭제</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostAdminPage;
