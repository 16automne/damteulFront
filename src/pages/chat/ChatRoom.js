import React from 'react';
// 보내기 아이콘
import { IoIosSend } from "react-icons/io";
// 더보기 아이콘
import { FaPlus } from "react-icons/fa6";
import './styles/chatroom.css';

const ChatRoom = () => {
  return (
    <main className='chatRoomWrap'>
      <div className='chatRoomOut'>
        <div className='chatRoomIn'>
          {/* 날짜 */}
          <p className='chatDate'>2026년 00월 00일</p>

          {/* 판매자 */}
          <div className='chatSeller'>
            {/* 이미지 */}
            <div className='profile'>
              <img src={`${process.env.PUBLIC_URL}/defaultProfile.png`} alt='프로필' />
            </div>
            {/* 메세지 */}
            <div className='messageBox'>
              <p>안녕하세요</p>
            </div>
            {/* 시간 */}
            <p className='time'>
              00:00
            </p>
          </div>

          {/* 구매자 */}
          <div className='chatBuyer'>
            {/* 메세지 */}
            <div className='message'>
              <p>안녕하세요</p>
            </div>
            {/* 시간 */}
            <p className='time'>
              00:00
            </p>
          </div>

          <form>
            {/* 더하기 아이콘 */}
            <FaPlus />
            <label htmlFor='chatBar'>채팅바</label>
            {/* value onChange추가 */}
            <input type='text' id='chatBar' name='message' />
            {/* 메시지 보내기 아이콘 */}
            <button type='submit'><IoIosSend /></button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default ChatRoom;