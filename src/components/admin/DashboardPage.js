import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../admin/styles/Dashboard.css';

/* =================================================
   1️⃣ KPI 데이터
   - UserAdminPage / ReportAdminPage / PostAdminPage에서
     "요약용"으로 뽑아온 데이터라고 가정
   - 나중에 API 연동 시 이 객체만 서버 데이터로 교체
================================================= */
const kpiData = {
  today: {
    users: 3,     // 오늘 가입자 수
    reports: 2,   // 오늘 신고 건수
    posts: 12,    // 오늘 작성된 게시글 수
  },
  month: {
    users: 30,    // 이번 달 가입자 수
    reports: 20,  // 이번 달 신고 건수
    posts: 150,   // 이번 달 게시글 수
  },
};

/* =================================================
   2️⃣ 일자별 요약 데이터
   - 대시보드에서 "흐름"을 보는 용도
   - 통계 페이지 생기면 여기서 확장 가능
================================================= */
const summaryData = [
  { date: '2026-01-20', users: 2, reports: 1, posts: 5 },
  { date: '2026-01-21', users: 1, reports: 0, posts: 7 },
  { date: '2026-01-22', users: 3, reports: 1, posts: 10 },
];

/* =================================================
   3️⃣ 이벤트 / 공지사항 데이터
   - NoticeEventAdminPage와 직접 연동 대상
   - 최근 N개만 가져와서 보여주는 용도
================================================= */
const eventsData = [
  { id: 'e001', title: '신년 이벤트', type: '이벤트', date: '2026-01-01' },
  { id: 'n001', title: '공지사항 예시', type: '공지사항', date: '2026-01-10' },
];

/* =================================================
   4️⃣ KPI 카드 컴포넌트
   - 클릭 가능
   - 클릭 시 해당 관리자 페이지로 이동
================================================= */
const KPIBlock = ({ title, today, month, onClick }) => (
  <div className="kpiCard">
    {/* 상단 영역 */}
    <div className="kpiHeader">
      <h4>{title}</h4>

      {/* 이동 화살표 버튼 */}
      <button
        className="arrowButton"
        onClick={onClick}
        aria-label={`${title} 이동`}
      />

    </div>

    {/* 수치 영역 */}
    <div className="kpiBody">
      <p className="today">오늘: {today}</p>
      <p className="month">이번 달: {month}</p>
    </div>
  </div>
);
/* =================================================
   5️⃣ Dashboard 메인 컴포넌트
================================================= */
const Dashboard = () => {
  const navigate = useNavigate(); // 관리자 페이지 이동용

  return (
    <div className="dashboardContainer">

      {/* ================= 운영 현황 KPI ================= */}
      <div className="kpiSection">
        <h2 className="sectionTitle">운영 현황</h2>

        <div className="kpiCards">
          {/* 사용자 관리 페이지 연동 */}
          <KPIBlock
            title="오늘 가입자"
            today={kpiData.today.users}
            month={kpiData.month.users}
            onClick={() => navigate('/admin/users')}
          />

          {/* 신고 관리 페이지 연동 */}
          <KPIBlock
            title="오늘 신고 내역"
            today={kpiData.today.reports}
            month={kpiData.month.reports}
            onClick={() => navigate('/admin/reports')}
          />

          {/* 게시글 관리 페이지 연동 */}
          <KPIBlock
            title="오늘 총 게시물"
            today={kpiData.today.posts}
            month={kpiData.month.posts}
            onClick={() => navigate('/admin/posts')}
          />
        </div>
      </div>

      {/* ================= 하단 영역 ================= */}
      <div className="lowerSection">

        {/* -------- 좌측: 일자별 요약 -------- */}
        <div className="summaryBox">
          <h3>일자별 요약</h3>

          <ul>
            {summaryData.map(item => (
              <li key={item.date}>
                <strong>{item.date}</strong>
                <span> 가입자 {item.users}</span>
                <span> · 신고 {item.reports}</span>
                <span> · 게시물 {item.posts}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* -------- 우측: 이벤트 / 공지사항 -------- */}
        <div className="eventBox">
          <h3>이벤트 / 공지사항</h3>

          <table>
            <thead>
              <tr>
                <th>제목</th>
                <th>구분</th>
                <th>날짜</th>
              </tr>
            </thead>

            <tbody>
              {eventsData.map(item => (
                <tr key={item.id}>
                  <td
                    className="clickableCell"
                    onClick={() =>
                      navigate('/admin/events', {
                        state: { activeTab: item.type } // '공지사항' | '이벤트'
                      })
                    }
                  >
                    {item.title}
                  </td>
                  <td>{item.type}</td>
                  <td>{item.date}</td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
