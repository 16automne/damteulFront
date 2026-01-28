import React, { useState } from 'react';
import { Link } from 'react-router-dom';
const Chat = () => {
  // 전체 안읽음
  const [chatBtn,setChatBtn] = useState(0);
  

  return (
    <main className='chatPageWrap'>
      {/* 제목 */}
      <div className='title3'>
        <h2>채팅</h2>
      </div>



    </main>
  );
};

export default Chat;