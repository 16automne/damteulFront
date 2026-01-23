import React, { useState } from 'react';
import '../admin/styles/PostAdminPage.css';

/* ===========================
   1️⃣ 샘플 게시글 데이터 (최신글이 위로)
=========================== */

/*
  samplePosts: 게시글 데이터를 담는 배열입니다.
  - id: 게시글 고유 번호, 최신글일수록 숫자가 큽니다.
  - title: 게시글 제목
  - writer: 작성자 ID
  - category: 게시글 카테고리 (UI 테이블에서 ID 옆에 표시됨)
  - createdAt: 작성일
  - productStatus: 상품 상태 (새상품 / 사용감 있음)
  
  💡 React에서 배열을 map()으로 돌려 테이블 행으로 출력할 때 이 데이터 사용
*/

const samplePosts = [
  { id: 120, title: '스마트워치 판매', writer: 'user020', category: '전자기기', createdAt: '2026-01-09', productStatus: '새상품' },
  { id: 119, title: '노트북 가방 판매', writer: 'user019', category: '패션', createdAt: '2026-01-09', productStatus: '새상품' },
  { id: 118, title: '의자 무료', writer: 'user018', category: '가구', createdAt: '2026-01-10', productStatus: '사용감 있음' },
  { id: 117, title: '중고 장난감', writer: 'user017', category: '취미', createdAt: '2026-01-10', productStatus: '새상품' },
  { id: 116, title: '모니터 판매', writer: 'user016', category: '전자기기', createdAt: '2026-01-11', productStatus: '새상품' },
  { id: 115, title: '책상 판매', writer: 'user015', category: '가구', createdAt: '2026-01-11', productStatus: '사용감 있음' },
  { id: 114, title: '중고 카메라', writer: 'user014', category: '전자기기', createdAt: '2026-01-12', productStatus: '사용감 있음' },
  { id: 113, title: '의류 나눔', writer: 'user013', category: '패션', createdAt: '2026-01-12', productStatus: '새상품' },
  { id: 112, title: '운동화 판매', writer: 'user012', category: '패션', createdAt: '2026-01-13', productStatus: '사용감 있음' },
  { id: 111, title: '에어팟 판매', writer: 'user011', category: '전자기기', createdAt: '2026-01-13', productStatus: '새상품' },
  { id: 110, title: '소파 판매', writer: 'user010', category: '가구', createdAt: '2026-01-14', productStatus: '새상품' },
  { id: 109, title: '중고 TV', writer: 'user009', category: '가전', createdAt: '2026-01-14', productStatus: '사용감 있음' },
  { id: 108, title: '냉장고 판매', writer: 'user008', category: '가전', createdAt: '2026-01-15', productStatus: '사용감 있음' },
  { id: 107, title: '책 무료', writer: 'user007', category: '도서', createdAt: '2026-01-15', productStatus: '새상품' },
  { id: 106, title: '중고 핸드폰', writer: 'user006', category: '전자기기', createdAt: '2026-01-16', productStatus: '사용감 있음' },
  { id: 105, title: '자전거 판매', writer: 'user005', category: '스포츠', createdAt: '2026-01-17', productStatus: '새상품' },
  { id: 104, title: '의자 판매', writer: 'user004', category: '가구', createdAt: '2026-01-18', productStatus: '새상품' },
  { id: 103, title: '노트북 팝니다', writer: 'user003', category: '전자기기', createdAt: '2026-01-18', productStatus: '사용감 있음' },
  { id: 102, title: '책상 무료 나눔', writer: 'user002', category: '가구', createdAt: '2026-01-19', productStatus: '사용감 있음' },
  { id: 101, title: '중고 아이패드 팝니다', writer: 'user001', category: '전자기기', createdAt: '2026-01-20', productStatus: '새상품' },
];



/* ===========================
   2️⃣ PostAdminPage 컴포넌트
=========================== */

/*
  useState 훅:
  - 상태를 저장하고 업데이트할 수 있게 해줌
  - statusFilter: 상품 상태 필터 ('', '새상품', '사용감 있음')
  - keyword: 제목 검색어
  - currentPage: 현재 페이지 번호 (페이지네이션용)

  💡 상태가 바뀌면 React가 자동으로 화면을 다시 렌더링
*/

const PostAdminPage = () => {
  const [statusFilter, setStatusFilter] = useState('');
  const [keyword, setKeyword] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  /* ===========================
     3️⃣ 필터 적용
  ============================ */

  /*
    filteredPosts: 검색어와 상태 필터를 적용한 게시글 목록
    - statusFilter가 있으면 post.productStatus === statusFilter 비교
    - keyword가 있으면 post.title.includes(keyword) 비교
    - 두 조건 모두 만족하는 게시글만 반환
  
    💡 배열의 filter()와 includes()를 사용해서 동적으로 UI 반영
  */

  const filteredPosts = samplePosts.filter(post => {
    const matchStatus = statusFilter ? post.productStatus === statusFilter : true;
    const matchKeyword = post.title.includes(keyword);
    return matchStatus && matchKeyword;
  });

  /* ===========================
     4️⃣ 페이지네이션 처리
  ============================ */

  /*
  페이지네이션 구현
  - postsPerPage: 한 페이지에 보여줄 게시글 개수
  - indexOfLastPost: 현재 페이지의 마지막 게시글 인덱스
  - indexOfFirstPost: 현재 페이지의 첫 게시글 인덱스
  - currentPosts: 현재 페이지에 보여줄 게시글 배열 (slice 사용)

  💡 totalPages 계산: Math.ceil(filteredPosts.length / postsPerPage)
  💡 goToPage(): 버튼 클릭 시 현재 페이지 상태를 변경
*/

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const goToPage = (pageNumber) => setCurrentPage(pageNumber);

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
            placeholder=" 제목 검색"
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

        {/*
          검색 버튼: 사실 코드에서 단순 버튼, 실제 검색은 onChange 이벤트에서 실시간 적용
          초기화 버튼: setKeyword(''), setStatusFilter('')로 상태 초기화
          💡 버튼 클릭 시 React 상태를 바꿔 화면 즉시 갱신
        */}

        <button>검색</button>
        <button onClick={() => { setKeyword(''); setStatusFilter(''); }}>
          초기화
        </button>
      </div>

      {/* 게시글 테이블 */}

      {/*
        테이블 컬럼 순서:
        ID | 카테고리 | 제목 | 작성자 | 작성일 | 상품 상태 | 관리
        - ID 바로 옆에 카테고리를 두어 시각적으로 묶음
        - 상품 상태는 statusBadge span으로 스타일 적용
      */}



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
                  <span className={`statusBadge ${post.productStatus === '새상품' ? 'new' : 'used'}`}>
                    {post.productStatus}
                  </span>
                </td>
                {/*
                statusBadge: 상품 상태를 시각적으로 표시하는 UI 요소
                - className: statusBadge + (new / used)
                  - 'new' -> 새상품 (녹색 등 강조)
                  - 'used' -> 사용감 있음 (회색 등)
                - CSS에서 색상/배경/테두리 등 스타일링 가능

                💡 React에서 조건부 클래스 적용: template literal (`${}`) 사용
                💡 상태를 바로 시각화해 사용자에게 구분 가능
                */}

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
      {/*
        이전(<) 버튼: Math.max(1, currentPage - 1) -> 최소 1 페이지 보장
        다음(>) 버튼: Math.min(totalPages, currentPage + 1) -> 최대 totalPages 제한
        현재 페이지 / 총 페이지 표시: {currentPage} / {totalPages}

        💡 React 상태(currentPage) 변경 시 currentPosts 재계산 → 테이블 갱신
        */}

      <div className="pagination">
        <button onClick={() => goToPage(Math.max(1, currentPage - 1))}>{'<'}</button>
        <span>{currentPage} / {totalPages}</span>
        <button onClick={() => goToPage(Math.min(totalPages, currentPage + 1))}>{'>'}</button>
      </div>
    </div>
  );
};

export default PostAdminPage;
