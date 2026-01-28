import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
const Chat = () => {
  // 전체 안읽음
  const [chatBtn,setChatBtn] = useState(false);
  

  return (
    <main className='chatPageWrap'>
      {/* 제목 */}
      <h1>채팅</h1>
      {/* 전체/안읽음 버튼 */}
      <div className='btnContainer'>
        <button onClick={()=>setChatBtn(false)} className={!chatBtn&&'btnActive'}>전체</button>
        <button onClick={()=>setChatBtn(true)} className={chatBtn&&'btnActive'}>안읽음</button>
      </div>
      
      {/* 채팅 목록 */}
      <ul>
        <li>
          <Link to=''>
            {/* 이미지 */}
            <div>
              <img src='' alt='' />
            </div>
            {/* 채팅명 */}
            <div>

            </div>

            {/* 채팅 알림 */}
            <div></div>
          </Link>
        </li>
      </ul>


    </main>
  );
};

export default Chat;