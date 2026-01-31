// src/components/admin/PostDetailPage.js
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "../admin/styles/PostDetailPage.module.css";
import { samplePosts } from "./samplePosts";

const PostDetailPage = () => {
    const { id } = useParams();          // URL 파라미터
    const navigate = useNavigate();

    // id에 해당하는 게시글 찾기
    const post = samplePosts.find(
        (item) => String(item.id) === String(id)
    );

    if (!post) {
        return (
            <div className={styles.wrapper}>
                <p>존재하지 않는 게시글입니다.</p>
                <button onClick={() => navigate("/admin/posts")}>
                    목록으로 돌아가기
                </button>
            </div>
        );
    }

    return (
        <div className={styles.wrapper}>
            {/* 1. 관리자 헤더 */}
            <div className={styles.adminHeader}>
                <h2 className={styles.adminTitle}>게시글 상세 관리</h2>
                <span className={styles.adminDesc}>
                    {post.id}번 데이터 관리
                </span>
            </div>

            {/* 2. 본문 */}
            <div className={styles.adminBody}>
                <div className={styles.formGroup}>
                    <label>제목</label>
                    <input type="text" value={post.title} readOnly />
                </div>

                <div className={styles.formGroup}>
                    <label>작성자</label>
                    <input type="text" value={post.writer} readOnly />
                </div>


                <div className={styles.formGroup}>
                    <label>내용</label>
                    <textarea value={post.content} rows={8} readOnly />
                </div>

                <div className={styles.formGroup}>
                    <label>작성일</label>
                    <input type="text" value={post.createdAt} readOnly />
                </div>

                <div className={styles.formGroup}>
                    <label>상품 상태</label>
                    <input type="text" value={post.productStatus} readOnly />
                </div>


            </div>

            {/* 3. 하단 버튼 */}
            <div className={styles.actionButtons}>
                {/* <button
                    className={styles.secondary}
                    onClick={() => navigate("/admin/posts")}
                >
                    목록으로 가기
                </button> */}

                <button className={styles.danger}>
                    삭제
                </button>
            </div>
        </div>
    );
};

export default PostDetailPage;
