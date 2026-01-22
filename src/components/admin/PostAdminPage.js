import React, { useState } from 'react';
import '../admin/styles/PostAdminPage.css';

const samplePosts = [
  {
    id: 101,
    title: '중고 아이패드 팝니다',
    writer: 'user001',
    category: '전자기기',
    createdAt: '2026-01-20',
    productStatus: '새상품',
  },
  {
    id: 102,
    title: '책상 무료 나눔',
    writer: 'user123',
    category: '가구',
    createdAt: '2026-01-19',
    productStatus: '사용감 있음',
  },
];

const PostAdminPage = () => {
  const [statusFilter, setStatusFilter] = useState('');
  const [keyword, setKeyword] = useState('');

  const filteredPosts = samplePosts.filter(post => {
    const matchStatus = statusFilter ? post.productStatus === statusFilter : true;
    const matchKeyword = post.title.includes(keyword);
    return matchStatus && matchKeyword;
  });

  return (
    <div className="adminPageContainer">
      {/* 페이지 헤더 */}
      <div className="adminHeader">
        <h2 className="adminTitle">게시글 관리</h2>
        <span className="adminDesc">중고 거래 게시글을 관리합니다</span>
      </div>

      {/* 필터 영역 */}
      <div className="filterBar">
        <div className="searchBox">
          <input
            type="text"
            placeholder="🔍 제목 검색"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">전체 상태</option>
          <option value="새상품">새상품</option>
          <option value="사용감 있음">사용감 있음</option>
        </select>

        <button>검색</button>
        <button onClick={() => { setKeyword(''); setStatusFilter(''); }}>
          초기화
        </button>
      </div>

      {/* 게시글 테이블 */}
      <table className="adminTable">
        <thead>
          <tr>
            <th>ID</th>
            <th>제목</th>
            <th>작성자</th>
            <th>카테고리</th>
            <th>작성일</th>
            <th>상품 상태</th>
            <th>관리</th>
          </tr>
        </thead>

        <tbody>
          {filteredPosts.length === 0 ? (
            <tr>
              <td colSpan="7">게시글이 없습니다.</td>
            </tr>
          ) : (
            filteredPosts.map(post => (
              <tr key={post.id}>
                <td>{post.id}</td>
                <td className="postTitle">{post.title}</td>
                <td>{post.writer}</td>
                <td>{post.category}</td>
                <td>{post.createdAt}</td>
                <td>
                  <span className={`statusBadge ${
                    post.productStatus === '새상품' ? 'new' : 'used'
                  }`}>
                    {post.productStatus}
                  </span>
                </td>
                <td>
                  <button className="btn-sm">숨김</button>
                  <button className="btn-sm danger">삭제</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* 페이지네이션 */}
      <div className="pagination">
        <button>{'<'}</button>
        <span>1 / 1</span>
        <button>{'>'}</button>
      </div>
    </div>
  );
};

export default PostAdminPage;
