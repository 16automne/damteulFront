import React, { useState } from "react";
import { useParams } from "react-router-dom"; // URL 파라미터
import styles from "../admin/styles/UserDetailPage.module.css"; // CSS Module
import { sampleUsers } from "./data/sampleUsers"; // 샘플 데이터
import { gradeInfo } from './constants/gradeInfo'; // 등급 이미지 정보

const UserDetailPage = () => {
    // URL에서 사용자 ID 가져오기
    const { id } = useParams();


    // 1️⃣ 샘플 데이터에서 사용자 찾기
    const user = sampleUsers.find(u => u.id === id);

    // 2️⃣ 등급 선택용 useState (항상 최상단 선언)
    const [userGrade, setUserGrade] = useState(user.grade);

    // 사용자 없으면 안내
    if (!user) return <div>사용자를 찾을 수 없습니다.</div>;



    // 3️⃣ 등급 이미지
    const currentGradeData = gradeInfo[userGrade];

    // 현재 사용자가 전체 샘플 데이터에서 몇 번째인지 계산
    const totalUsers = sampleUsers.length;
    const userIndex = totalUsers - sampleUsers.findIndex(u => u.id === user.id);

    // 상태 배지 클래스 결정
    const getStatusClass = (status) => {
        switch (status) {
            case "활동중": return styles.활동중;
            case "정지": return styles.정지;
            case "탈퇴": return styles.탈퇴;
            default: return "";
        }
    };

    // 저장 버튼 (등급 변경)
    const handleSave = () => {
        alert(`샘플 데이터 시뮬레이션: 등급 변경 ${user.id} → ${userGrade}`);
    };

    return (

        <div className={styles.pageWrapper}>
            <div className={styles.wrapper}>
                {/* 헤더 */}
                <div className={styles.adminHeader}>
                    <h2 className={styles.adminTitle}>사용자 상세 정보 </h2>
                    <span className={styles.adminDesc}>회원 ID #{userIndex} 상세 정보</span>
                </div>

                {/* 카드 영역 */}
                <div className={styles.userEditCard}>
                    {/* 프로필 */}
                    <div className={styles.profile}>
                        <img src="/images/defaultProfile.png" alt="user" className={styles.profileImg} />
                        <div>
                            <strong>ID:</strong> {user.id} <br />
                            <strong>닉네임:</strong> {user.nickname}
                        </div>
                    </div>

                    {/* 기본 정보 */}
                    <section className={styles.formSection}>
                        <h4>기본 정보</h4>

                        <div className={styles.inputGroup}>
                            <strong>ID:</strong>
                            <input value={user.id} disabled className={styles.disabledInput} />
                        </div>

                        <div className={styles.inputGroup}>
                            <strong>닉네임:</strong>
                            <input value={user.nickname} disabled className={styles.disabledInput} />
                        </div>

                        {/* 등급 선택 */}
                        <div className={styles.gradeWrapper}>
                            <strong>등급:</strong>
                            <select
                                value={userGrade}
                                onChange={(e) => setUserGrade(e.target.value)}
                                className={styles.gradeSelect}
                            >
                                {Object.keys(gradeInfo).map(grade => (
                                    <option key={grade} value={grade}>{grade}</option>
                                ))}
                            </select>

                            {currentGradeData && (
                                <div className={styles.userSummary}>
                                    <img src={currentGradeData.img} alt={userGrade} className={styles.gradeImg} />
                                </div>
                            )}
                        </div>

                        <div className={styles.inputGroup}>
                            <strong>신고 점수:</strong>
                            <input type="number" value={user.reportScore} disabled className={styles.disabledInput} />
                        </div>

                        <div className={styles.inputGroup}>
                            <strong>가입일:</strong>
                            <input type="text" value={user.createdAt} disabled className={styles.disabledInput} />
                        </div>
                    </section>
                </div>

                <section className={styles.formSection}>
                    <strong>계정 상태:</strong>
                    <div className={styles.statusWrapper}>
                        <span className={`${styles.statusBadge} ${getStatusClass(user.status)}`}>
                            {user.status}
                        </span>
                    </div>
                </section>

                {/* 하단 버튼 */}
                <div className={styles.actionButtons }>
                    {/* 저장 버튼 */}
                    <button className={styles.primary} onClick={handleSave}>
                        저장
                    </button>

                    {/* 삭제 버튼 */}
                    <button
                        className={styles.danger}
                        onClick={() => {
                            if (window.confirm("사용자를 삭제하시겠습니까?")) {
                                alert(`샘플 데이터 시뮬레이션: ${user.id} 삭제`);
                            }
                        }}
                    >
                        삭제
                    </button>
                </div>

            </div>
        </div>

    );
};

export default UserDetailPage;
