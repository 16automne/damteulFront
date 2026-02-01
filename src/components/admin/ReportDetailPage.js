import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from '../admin/styles/ReportDetailPage.module.css';
import { sampleReports } from "./data/sampleReports";

const ReportDetailPage = () => {
    const { id } = useParams();
    // const navigate = useNavigate();

    // 임시 데이터 (나중에 API로 교체)
    const report = sampleReports.find(r => r.id === Number(id));

    const [selectedStatus, setSelectedStatus] = useState(report.status);

    if (!report) {
        return <div>신고 데이터를 찾을 수 없습니다.</div>;
    }



    const handleUpdateStatus = () => {
        console.log('선택된 상태:', selectedStatus);
        // TODO: API 호출 또는 sampleReports 업데이트
    };

    const handleDeleteReport = () => {
        console.log('삭제 요청:', report.id);
        // TODO: 삭제 처리
    };


    return (
        <div className={styles.pageWrapper}>
            <div className={styles.wrapper}>

                {/* 헤더 */}
                <div className={styles.adminHeader}>
                    <h2 className={styles.adminTitle}>신고 상세 관리</h2>
                    <span className={styles.adminDesc}>
                        신고 ID #{report.id} 상세 정보
                    </span>
                </div>

                {/* 본문 */}
                <div className={styles.adminBody}>
                    <div className={styles.formGroup}>
                        <label>카테고리</label>
                        <input type="text" value={report.category} readOnly />
                    </div>

                    <div className={styles.formGroup}>
                        <label>신고자</label>
                        <input type="text" value={report.reporter} readOnly />
                    </div>

                    <div className={styles.formGroup}>
                        <label>신고 대상</label>
                        <input type="text" value={report.reported} readOnly />
                    </div>

                    {/* 신고 날짜 */}
                    <div className={styles.formGroup}>
                        <label>신고 일시</label>
                        <input type="text" value={report.createdAt} readOnly />
                    </div>

                    {/* 신고 상태 */}
                    <div className={styles.formGroup}>
                        <label>신고 상태</label>
                        <section className={styles.formSection}>
                            <span className={`${styles.statusBadge} ${styles[report.status]}`}>
                                {report.status}
                            </span>
                        </section>
                    </div>

                    <div className={styles.formGroup}>
                        <label>신고 내용</label>
                        <textarea value={report.content} readOnly />
                    </div>
                </div>

                {/* 하단 버튼 */}
                {/* <div className={styles.actionButtons}>

                    <button className={styles.danger}>
                        삭제
                    </button>
                </div> */}

                {/* 하단 상태 변경 영역 */}
                <div className={styles.actionButtons}>
                    {/* 상태 선택 */}
                    <select
                        className={styles.statusSelect}
                        value={selectedStatus}          // useState로 관리
                        onChange={(e) => setSelectedStatus(e.target.value)}
                    >
                        <option value="승인">승인</option>
                        <option value="보류">보류</option>
                        <option value="반려">반려</option>
                    </select>

                    {/* 적용 버튼 */}
                    <button
                        className={styles.primary}
                        onClick={() => handleUpdateStatus()}
                    >
                        저장
                    </button>

                    {/* 삭제 버튼 */}
                    <button
                        className={styles.danger}
                        onClick={() => handleDeleteReport()}
                    >
                        삭제
                    </button>
                </div>



            </div>
        </div>
    );
};

export default ReportDetailPage;
