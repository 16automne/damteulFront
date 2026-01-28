import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ChatList from 'components/chat/ChatList';
import './styles/chat.css';

const Chat = () => {
  // 전체 안읽음
  const [chatBtn,setChatBtn] = useState(0);
  

  return (
    <main className='chatPageWrap'>
      {/* 제목 */}
      <h2 className='title'>채팅</h2>


      {/* 전체/안읽음 버튼 */}
      <div className='btnContainer'>
        <button onClick={()=>setChatBtn(0)} className={chatBtn===0?'btnActive':''}>전체</button>
        <button onClick={()=>setChatBtn(1)} className={chatBtn===1?'btnActive':''}>안읽음</button>
      </div>
      
      {/* 채팅 목록 */}
      <ul className='chatList'>
        {chatBtn===0?(
          <>
            <ChatList />
            <ChatList />
            <ChatList />
            <ChatList />
            <ChatList />
            <ChatList />
          </>
        )
        :(
          <>
            <ChatList />
            <ChatList />
            <ChatList />
          </>
        )
        }
      </ul>
    </main>
  );
};

export default Chat;