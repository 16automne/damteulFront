import React, { useState } from 'react';
import '../admin/styles/PostAdminPage.css';
import PostAdminModal from './PostAdminModal';
import { samplePosts } from './data/samplePosts';


/* ===========================
   1️⃣ 샘플 게시글 데이터
=========================== */

// const samplePosts = [
//   { id: 120, title: '스마트워치 판매', writer: 'user020', category: '전자기기', createdAt: '2026-01-09', productStatus: '새상품' },
//   { id: 119, title: '노트북 가방 판매', writer: 'user019', category: '패션', createdAt: '2026-01-09', productStatus: '새상품' },
//   { id: 118, title: '의자 무료', writer: 'user018', category: '가구', createdAt: '2026-01-10', productStatus: '중고 상품' },
//   { id: 117, title: '중고 장난감', writer: 'user017', category: '취미', createdAt: '2026-01-10', productStatus: '새상품' },
//   { id: 116, title: '모니터 판매', writer: 'user016', category: '전자기기', createdAt: '2026-01-11', productStatus: '새상품' },
//   { id: 115, title: '책상 판매', writer: 'user015', category: '가구', createdAt: '2026-01-11', productStatus: '중고 상품' },
//   { id: 114, title: '중고 카메라', writer: 'user014', category: '전자기기', createdAt: '2026-01-12', productStatus: '중고 상품' },
//   { id: 113, title: '의류 나눔', writer: 'user013', category: '패션', createdAt: '2026-01-12', productStatus: '새상품' },
//   { id: 112, title: '운동화 판매', writer: 'user012', category: '패션', createdAt: '2026-01-13', productStatus: '중고 상품' },
//   { id: 111, title: '에어팟 판매', writer: 'user011', category: '전자기기', createdAt: '2026-01-13', productStatus: '새상품' },
// ];

/* ===========================
   2️⃣ PostAdminPage 컴포넌트
=========================== */

const PostAdminPage = () => {

  // 상태
  const [selectedPost, setSelectedPost] = useState(null);

  /* ===========================
     🔹 검색 입력용 상태 (입력만)
  =========================== */
  const [inputKeyword, setInputKeyword] = useState('');
  const [inputStatus, setInputStatus] = useState('');

  /* ===========================
     🔹 실제 검색 적용 상태 (버튼 클릭 시)
  =========================== */
  const [keyword, setKeyword] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  /* ===========================
     🔹 페이지네이션 상태
  =========================== */
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  /* ===========================
     3️⃣ 검색 버튼 클릭 시 실행
  =========================== */
  const handleSearch = () => {
    setKeyword(inputKeyword);       // 제목 검색어 적용
    setStatusFilter(inputStatus);   // 상태 필터 적용
    setCurrentPage(1);              // 검색 시 항상 1페이지로 초기화
  };

  /* ===========================
     4️⃣ 필터링된 게시글
  =========================== */
  const filteredPosts = samplePosts.filter(post => {
    const matchStatus = statusFilter ? post.productStatus === statusFilter : true;
    const matchKeyword = keyword
      ? post.title.includes(keyword)
      : true;

    return matchStatus && matchKeyword;
  });

  /* ===========================
     5️⃣ 페이지네이션 처리
  =========================== */
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const goToPage = (page) => setCurrentPage(page);

  return (
    <div className="adminPageContainer">
      {/* 헤더 */}
      <div className="adminHeader">
        <h2 className="adminTitle">게시글 관리</h2>
        <span className="adminDesc">중고 거래 게시글을 관리합니다</span>
      </div>

      {/* ===========================
         🔍 검색 / 필터 영역
      =========================== */}
      <div className="filterBar">
        <div className="searchBox">
          <input
            type="text"
            placeholder=" 제목 검색"
            value={inputKeyword}
            onChange={(e) => setInputKeyword(e.target.value)}
          />
        </div>

        <select
          value={inputStatus}
          onChange={(e) => setInputStatus(e.target.value)}
        >
          <option value="">전체 상태</option>
          <option value="새상품">새상품</option>
          <option value="중고 상품">중고 상품</option>
        </select>

        {/* 🔹 검색 버튼 클릭 시에만 실제 검색 적용 */}
        <button onClick={handleSearch}>검색</button>

        {/* 🔹 입력/검색 상태 모두 초기화 */}
        <button
          onClick={() => {
            setInputKeyword('');
            setInputStatus('');
            setKeyword('');
            setStatusFilter('');
            setCurrentPage(1);
          }}
        >
          초기화
        </button>
      </div>

      {/* ===========================
         📋 게시글 테이블
      =========================== */}
      <table className="adminTable">
        <thead>
          <tr>
            <th>ID</th>
            <th>카테고리</th>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일</th>
            <th>상품 상태</th>
            <th>관리</th>
          </tr>
        </thead>
        <tbody>
          {currentPosts.length === 0 ? (
            <tr>
              <td colSpan="7">게시글이 없습니다.</td>
            </tr>
          ) : (
            currentPosts.map(post => (
              <tr key={post.id}>
                <td>{post.id}</td>
                <td>{post.category}</td>
                <td className="postTitle">{post.title}</td>
                <td>{post.writer}</td>
                <td>{post.createdAt}</td>
                <td>
                  <span
                    className={`statusBadge ${post.productStatus === '새상품' ? 'new' : 'used'
                      }`}
                  >
                    {post.productStatus}
                  </span>
                </td>
                {/* <td>

                  <button className="btn-sm" onClick={() => setSelectedPost(post)}>
                    관리
                  </button>
                  <button className="btn-sm danger">삭제</button>
                </td> */}

                {/* <td>
                  <button
                    className="btn-sm"
                    onClick={() => setSelectedPost(post)}
                    title="관리"
                    aria-label="관리"
                  >
                    ⚙
                  </button>
                </td> */}

                <td>
                  <button
                    className="btn-sm"
                    onClick={() => {
                      const url = `/admin/posts/detail/${post.id}`;
                      window.open(url, '_blank', 'width=1000,height=800'); // 새 창
                    }}
                    title="관리"
                    aria-label="관리"
                  >
                    ⚙
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* ===========================
         📄 페이지네이션
      =========================== */}
      <div className="pagination">
        <button onClick={() => goToPage(Math.max(1, currentPage - 1))}>{'<'}</button>
        <span>{currentPage} / {totalPages || 1}</span>
        <button onClick={() => goToPage(Math.min(totalPages, currentPage + 1))}>{'>'}</button>
      </div>


      {selectedPost && (
        <PostAdminModal
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
          onDelete={(id) => console.log('삭제', id)}
          onHide={(id) => console.log('숨김', id)}
        />
      )}
    </div>
  );
};

export default PostAdminPage;
