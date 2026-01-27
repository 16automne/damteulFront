import React, { useState } from 'react';
import '../admin/styles/PostAdminPage.css';
import TradeAdminModal from '../admin/TradeAdminModal';


/* -------------------------------------------------
   샘플 거래 데이터
   - 실제 API 연동 시 이 배열만 서버 데이터로 교체
------------------------------------------------- */
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
];

const TradeAdminPage = () => {

  /* =================================================
   0️⃣ 모달 상태
================================================= */
  const [selectedTrade, setSelectedTrade] = useState(null);

  /* =================================================
     1️⃣ 입력 전용 상태 (UI 상태)
     - input에만 바인딩
     - 아직 검색에 사용 ❌
  ================================================= */
  const [inputKeyword, setInputKeyword] = useState('');
  const [inputStatus, setInputStatus] = useState('');

  /* =================================================
     2️⃣ 실제 검색 상태 (검색 버튼 클릭 시만 변경)
  ================================================= */
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchStatus, setSearchStatus] = useState('');

  /* =================================================
     3️⃣ 페이지네이션 상태
  ================================================= */
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 5;

  /* =================================================
     4️⃣ 검색 버튼 클릭 핸들러
     - 입력 상태 → 검색 상태로 복사
     - 페이지는 반드시 1로 초기화
  ================================================= */
  const handleSearch = () => {
    setSearchKeyword(inputKeyword);
    setSearchStatus(inputStatus);
    setCurrentPage(1);
  };

  /* =================================================
     5️⃣ 초기화 버튼
  ================================================= */
  const handleReset = () => {
    setInputKeyword('');
    setInputStatus('');
    setSearchKeyword('');
    setSearchStatus('');
    setCurrentPage(1);
  };

  /* =================================================
     6️⃣ 최신 거래가 위로 오도록 정렬
  ================================================= */
  const transactionsDescending = [...sampleTransactions].sort(
    (a, b) => b.id - a.id
  );

  /* =================================================
     7️⃣ 필터링 (⚠️ search 상태 기준)
  ================================================= */
  const filteredTransactions = transactionsDescending.filter(trx => {
    const matchStatus = searchStatus
      ? trx.completed === searchStatus
      : true;

    const matchKeyword =
      trx.product.includes(searchKeyword) ||
      trx.buyer.includes(searchKeyword) ||
      trx.seller.includes(searchKeyword);

    return matchStatus && matchKeyword;
  });

  /* =================================================
     8️⃣ 페이지네이션 계산
  ================================================= */
  const indexOfLast = currentPage * transactionsPerPage;
  const indexOfFirst = indexOfLast - transactionsPerPage;
  const currentTransactions = filteredTransactions.slice(
    indexOfFirst,
    indexOfLast
  );
  const totalPages = Math.ceil(filteredTransactions.length / transactionsPerPage);

  return (
    <div className="adminPageContainer">

      {/* -------------------- 헤더 -------------------- */}
      <div className="adminHeader">
        <h2 className="adminTitle">거래 관리</h2>
        <span className="adminDesc">거래 내역 및 상태를 관리합니다</span>
      </div>

      {/* -------------------- 검색 / 필터 -------------------- */}
      <div className="filterBar">
        <div className="searchBox">
          <input
            type="text"
            placeholder=" 상품명 / 구매자 / 판매자 검색"
            value={inputKeyword}
            onChange={(e) => setInputKeyword(e.target.value)}
          />
        </div>

        <select
          value={inputStatus}
          onChange={(e) => setInputStatus(e.target.value)}
        >
          <option value="">전체 상태</option>
          <option value="예">거래 완료</option>
          <option value="아니오">미완료</option>
        </select>

        <button onClick={handleSearch}>검색</button>
        <button onClick={handleReset}>초기화</button>
      </div>

      {/* -------------------- 테이블 -------------------- */}
      <table className="adminTable">
        <thead>
          <tr>
            <th>ID</th>
            <th>상품명</th>
            <th>구매자</th>
            <th>판매자</th>
            <th>거래 방식</th>
            <th>거래 일시</th>
            <th>금액</th>
            <th>완료 여부</th>
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
                <td>{trx.completed}</td>
                <td>
                  <button
                    className="btn-sm"
                    onClick={() => setSelectedTrade(trx)}
                  >
                    관리
                  </button>
                  <button className="btn-sm danger">삭제</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* -------------------- 페이지네이션 -------------------- */}
      <div className="pagination">
        <button
          onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
        >
          {'<'}
        </button>

        <span>{currentPage} / {totalPages || 1}</span>

        <button
          onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages || totalPages === 0}
        >
          {'>'}
        </button>
      </div>

        {/* ==========================
            거래 관리 모달
        ========================== */}
        {selectedTrade && (
          <TradeAdminModal
            trade={selectedTrade}
            onClose={() => setSelectedTrade(null)}
            onComplete={(id) => {
              alert(`거래 ${id} 완료 처리`);
              setSelectedTrade(null);
            }}
          />
        )}

    </div>
  );
};

export default TradeAdminPage;
