import React from 'react';
import '../admin/styles/Dashboard.css';

// 샘플 데이터
const kpiData = {
  today: { users: 3, reports: 2, posts: 12 },
  month: { users: 30, reports: 20, posts: 150 },
};

const summaryData = [
  { date: '2026-01-20', users: 2, reports: 1, posts: 5 },
  { date: '2026-01-21', users: 1, reports: 0, posts: 7 },
  { date: '2026-01-22', users: 3, reports: 1, posts: 10 },
];

const eventsData = [
  { id: 'e001', title: '신년 이벤트', type: '이벤트', date: '2026-01-01' },
  { id: 'n001', title: '공지사항 예시', type: '공지사항', date: '2026-01-10' },
];

// KPI 카드 컴포넌트
const KPIBlock = ({ title, today, month }) => (
  <div className="kpiCard">
    <h4>{title}</h4>
    <p className="today">오늘: {today}</p>
    <p className="month">이번 달: {month}</p>
  </div>
);

const Dashboard = () => {
  return (
    <div className="dashboardContainer">
      {/* -------------------- 운영 현황 KPI -------------------- */}
      <div className="kpiSection">
        <h2 className="sectionTitle">운영 현황</h2>
        <div className="kpiCards">
          <KPIBlock
            title="오늘 가입자"
            today={kpiData.today.users}
            month={kpiData.month.users}
          />
          <KPIBlock
            title="오늘 신고 내역"
            today={kpiData.today.reports}
            month={kpiData.month.reports}
          />
          <KPIBlock
            title="오늘 총 게시물"
            today={kpiData.today.posts}
            month={kpiData.month.posts}
          />
        </div>
      </div>

      {/* -------------------- 요약 / 이벤트 영역 -------------------- */}
      <div className="lowerSection">
        {/* 좌측: 일자별 요약 */}
        <div className="summaryBox">
          <h3>일자별 요약</h3>
          <ul>
            {summaryData.map(item => (
              <li key={item.date}>
                {item.date} - 가입자: {item.users}, 신고: {item.reports}, 게시물: {item.posts}
              </li>
            ))}
          </ul>
        </div>

        {/* 우측: 이벤트 / 공지사항 */}
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
                  <td>{item.title}</td>
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
