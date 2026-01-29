import React, { useEffect, useState } from 'react';
// 보내기 아이콘
import { IoIosSend } from "react-icons/io";
// 더보기 아이콘
import { FaPlus } from "react-icons/fa6";
import './styles/chatroom.css';

const ChatRoom = () => {
  const [messages, setMessages] = useState([]);

  // 한국시간 Date 객체 만들기
  function toKST(dateStr) {
    const d = new Date(dateStr);
    return new Date(d.getTime() + 9 * 60 * 60 * 1000);
  }

  // 한국시간 기준 같은 날짜인지 확인
  function isSameKSTDate(prevAt, currAt) {
    const prev = toKST(prevAt);
    const curr = toKST(currAt);

    return (
      prev.getFullYear() === curr.getFullYear() &&
      prev.getMonth() === curr.getMonth() &&
      prev.getDate() === curr.getDate()
    );
  }

  // 같은 분인지 확인
  function isSameMinute(prevAt, currAt) {
    const prev = new Date(prevAt);
    const curr = new Date(currAt);

    return (
      prev.getFullYear() === curr.getFullYear() &&
      prev.getMonth() === curr.getMonth() &&
      prev.getDate() === curr.getDate() &&
      prev.getHours() === curr.getHours() &&
      prev.getMinutes() === curr.getMinutes()
    );
  }

  // false 반환시 프로필 안나오게
  // true 반환시 프로필 나오게
  function isNewGroup(prev, curr) {
    // 없는 값이면 반환
    if (!prev) return true;

    // 1) 사람이 바뀌면 무조건 새 그룹
    if (prev.user_id !== curr.user_id) return true;

    // 2) 같은 사람이더라도 "분이 바뀌면" 새 그룹
    if (!isSameMinute(prev.createdAt, curr.createdAt)) return true;

    return false;
  }

  // 현재 년/월/일 출력
  function formatKSTDateLabel(dateStr) {
    const d = toKST(dateStr);

    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");

    return `${y}년 ${m}월 ${day}일`;
  }

  // 현재 시:분 출력
  const nowTime = (time) => {
    const d = toKST(time);
    
    const h = String(d.getHours()).padStart(2, "0");
    const m = String(d.getMinutes()).padStart(2, "0");
    
    return `${h}:${m}`;
  }

  // 사용자 user_id (수정해야함)
  const myUserId = 20;

  useEffect(()=>{
    // 예시 값
    setMessages([
      ...messages,
      { id: 1, user_id: 10, text: "안녕", createdAt: "2026-01-29T10:01:10" },
      { id: 2, user_id: 10, text: "지금 뭐해?", createdAt: "2026-01-29T10:01:40" },
      { id: 3, user_id: 20, text: "나 밥먹는중", createdAt: "2026-01-29T10:02:05" },
      { id: 4, user_id: 20, text: "나 밥먹는중인데", createdAt: "2026-01-29T10:02:05" },
      { id: 5, user_id: 10, text: "오 좋다", createdAt: "2026-01-29T10:02:30" },
      { id: 6, user_id: 10, text: "응 아니야", createdAt: "2026-01-30T10:02:30" },
      { id: 7, user_id: 10, text: "아님 말고", createdAt: "2026-01-31T10:02:30" },
      { id: 8, user_id: 20, text: "ㅇ", createdAt: "2026-02-01T10:02:30" },
      { id: 9, user_id: 20, text: "ㅇ", createdAt: "2026-02-01T10:02:30" },
      { id: 10, user_id: 20, text: "ㅇ", createdAt: "2026-02-01T10:02:30" },
      { id: 11, user_id: 10, text: "ㅇ", createdAt: "2026-02-01T10:02:30" },
      { id: 12, user_id: 20, text: "ㅇ", createdAt: "2026-02-01T10:02:30" },
      { id: 13, user_id: 10, text: "ㅇ", createdAt: "2026-02-01T10:02:30" },
      { id: 14, user_id: 20, text: "ㅇ", createdAt: "2026-02-01T10:02:30" },
    ]);
  },[]);



  return (
    <main className='chatRoomWrap'>
      <div className='chatRoomOut'>
        <div className='chatRoomIn'>
          {
            messages.map((msg, idx) => {
              const prev = messages[idx - 1];

              // 상대방일 경우와 새그룹일때만(값이 true일때만) 프로필 출력
              const showProfile = msg.user_id !== myUserId && isNewGroup(prev, msg); // 상대방 + 새그룹일 때만
              const isMine = msg.user_id === myUserId;

              // 채팅방에 대화가 없었을때이거나 그당일의 첫 대화일때 날짜 출력
              const showDate = !prev || !isSameKSTDate(prev.createdAt, msg.createdAt);
              return(
                <React.Fragment key={msg.id}>
                  {/* 날짜 조건 */}
                  {showDate &&(
                  <p className='chatDate'>
                    <span>{formatKSTDateLabel(msg.createdAt)}</span>
                  </p>
                  )}
                  {/* 판매자 */}
                  <div className={isMine ? "chatBuyer" : "chatSeller"}>
                    {/* 프로필 */}
                    {!isMine && showProfile && (
                      <div className='profile'>
                        <img src={`${process.env.PUBLIC_URL}/images/defaultProfile.png`} alt='프로필' />
                      </div>
                    )}
                    {/* 시간(구매자 입장) */}
                    {isMine && !showProfile &&
                    <p className='time'>
                      {nowTime(msg.createdAt)}
                    </p>
                    }

                    {/* 메세지 */}
                    {!isMine && !showProfile && <div className="profilePlaceholder" />}

                    <div className='messageBox'>
                      <p>{msg.text}</p>
                    </div>

                    {/* 시간(판매자 입장) */}
                    {!isMine && showProfile &&
                    <p className='time'>
                      {nowTime(msg.createdAt)}
                    </p>
                    }
                  </div>
                </React.Fragment>
              );
            })
          }

          <form className='chatingBox'>
            <div className='chatingBoxOuter'>
              <div className='chatingBoxInner'>
                {/* 더하기 아이콘 */}
                <button><FaPlus /></button>
                <label htmlFor='chatBar'>채팅바</label>
                {/* value onChange추가 */}
                <input type='text' id='chatBar' name='message' />
                {/* 메시지 보내기 아이콘 */}
                <button type='submit'><IoIosSend /></button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default ChatRoom;