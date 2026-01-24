import React, { useState } from 'react';
import '../admin/styles/PostAdminPage.css'; // 게시글 관리 페이지와 통일된 스타일 사용

// 샘플 거래 데이터 20개 생성
// id는 최신 거래가 높음, 나중에 내림차순 정렬하여 상단에 최신 거래 표시
const sampleTransactions = [
  { id: 120, product: '중고 아이패드', buyer: 'user020', seller: 'userA', method: '직거래', date: '2026-01-23', price: 400000, completed: '예' },
  { id: 119, product: '책상', buyer: 'user019', seller: 'userB', method: '택배거래', date: '2026-01-22', price: 50000, completed: '아니오' },
  { id: 118, product: '노트북', buyer: 'user018', seller: 'userC', method: '직거래', date: '2026-01-21', price: 700000, completed: '예' },
  { id: 117, product: '의자', buyer: 'user017', seller: 'userD', method: '택배거래', date: '2026-01-20', price: 30000, completed: '예' },
  { id: 116, product: '자전거', buyer: 'user016', seller: 'userE', method: '직거래', date: '2026-01-19', price: 150000, completed: '아니오' },
  { id: 115, product: '중고 핸드폰', buyer: 'user015', seller: 'userF', method: '택배거래', date: '2026-01-18', price: 250000, completed: '예' },
  { id: 114, product: '책', buyer: 'user014', seller: 'userG', method: '직거래', date: '2026-01-17', price: 10000, completed: '예' },
  { id: 113, product: '냉장고', buyer: 'user013', seller: 'userH', method: '택배거래', date: '2026-01-16', price: 300000, completed: '아니오' },
  { id: 112, product: 'TV', buyer: 'user012', seller: 'userI', method: '직거래', date: '2026-01-15', price: 200000, completed: '예' },
  { id: 111, product: '소파', buyer: 'user011', seller: 'userJ', method: '택배거래', date: '2026-01-14', price: 150000, completed: '예' },
  { id: 110, product: '에어팟', buyer: 'user010', seller: 'userK', method: '직거래', date: '2026-01-13', price: 120000, completed: '예' },
  { id: 109, product: '운동화', buyer: 'user009', seller: 'userL', method: '택배거래', date: '2026-01-12', price: 40000, completed: '아니오' },
  { id: 108, product: '의류', buyer: 'user008', seller: 'userM', method: '직거래', date: '2026-01-11', price: 50000, completed: '예' },
  { id: 107, product: '카메라', buyer: 'user007', seller: 'userN', method: '택배거래', date: '2026-01-10', price: 300000, completed: '예' },
  { id: 106, product: '책상', buyer: 'user006', seller: 'userO', method: '직거래', date: '2026-01-09', price: 45000, completed: '예' },
  { id: 105, product: '모니터', buyer: 'user005', seller: 'userP', method: '택배거래', date: '2026-01-08', price: 180000, completed: '아니오' },
  { id: 104, product: '장난감', buyer: 'user004', seller: 'userQ', method: '직거래', date: '2026-01-07', price: 20000, completed: '예' },
  { id: 103, product: '의자', buyer: 'user003', seller: 'userR', method: '택배거래', date: '2026-01-06', price: 35000, completed: '아니오' },
  { id: 102, product: '노트북 가방', buyer: 'user002', seller: 'userS', method: '직거래', date: '2026-01-05', price: 60000, completed: '예' },
  { id: 101, product: '스마트워치', buyer: 'user001', seller: 'userT', method: '택배거래', date: '2026-01-04', price: 150000, completed: '예' },
];

const TradeAdminPage = () => {
  // 상태 관리
  const [keyword, setKeyword] = useState(''); // 검색어 상태
  const [statusFilter, setStatusFilter] = useState(''); // 거래 완료 여부 필터
  const [currentPage, setCurrentPage] = useState(1); // 페이지네이션 현재 페이지
  const transactionsPerPage = 5; // 한 페이지당 거래 수

  // 최신 거래가 상단에 오도록 내림차순 정렬
  const transactionsDescending = [...sampleTransactions].sort((a, b) => b.id - a.id);

  // 필터링: 거래 완료 여부 및 검색 키워드 (상품명, 구매자, 판매자)
  const filteredTransactions = transactionsDescending.filter(trx => {
    const matchStatus = statusFilter ? trx.completed === statusFilter : true;
    const matchKeyword = trx.product.includes(keyword) || trx.buyer.includes(keyword) || trx.seller.includes(keyword);
    return matchStatus && matchKeyword;
  });

  // 페이지네이션 계산
  const indexOfLast = currentPage * transactionsPerPage;
  const indexOfFirst = indexOfLast - transactionsPerPage;
  const currentTransactions = filteredTransactions.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredTransactions.length / transactionsPerPage);

  return (
    <div className="adminPageContainer">
      {/* 페이지 헤더 */}
      <div className="adminHeader">
        <h2 className="adminTitle">거래 관리</h2>
        <span className="adminDesc">거래 내역 및 상태를 관리합니다</span>
      </div>

      {/* 검색 및 필터 */}
      <div className="filterBar">
        <div className="searchBox">
          <input
            type="text"
            placeholder=" 상품명/구매자/판매자 검색"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">전체 상태</option>
          <option value="예">거래 완료</option>
          <option value="아니오">미완료</option>
        </select>

        <button>검색</button>
        <button onClick={() => { setKeyword(''); setStatusFilter(''); }}>
          초기화
        </button>
      </div>

      {/* 거래 테이블 */}
      <table className="adminTable">
        <thead>
          <tr>
            <th>ID</th>
            <th>상품명</th>
            <th>구매자</th>
            <th>판매자</th>
            <th>거래 방식</th>
            <th>거래 일시</th>
            <th>거래 금액</th>
            <th>거래 완료 여부</th>
            <th>관리</th>
          </tr>
        </thead>
        <tbody>
          {currentTransactions.length === 0 ? (
            <tr>
              <td colSpan="9">거래 내역이 없습니다.</td>
            </tr>
          ) : (
            currentTransactions.map(trx => (
              <tr key={trx.id}>
                <td>{trx.id}</td>
                <td>{trx.product}</td>
                <td>{trx.buyer}</td>
                <td>{trx.seller}</td>
                <td>{trx.method}</td>
                <td>{trx.date}</td>
                <td>{trx.price.toLocaleString()}원</td>
                <td>
                  <span className={`statusBadge ${trx.completed === '예' ? 'used' : 'ignored'
                    }`}>
                    {trx.completed}
                  </span>
                </td>
                <td>
                  <button className="btn-sm">완료 처리</button>
                  <button className="btn-sm danger">삭제</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* 페이지네이션 */}
      <div className="pagination">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          {'<'}
        </button>
        <span>{currentPage} / {totalPages}</span>
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          {'>'}
        </button>
      </div>
    </div>
  );
};

export default TradeAdminPage;
