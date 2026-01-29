import React from 'react';
import { Link } from 'react-router-dom';
const ChatList = () => {
  return (
    <>
      {/* 여기서부터 컴포넌트 */}
      <li>
        <Link to='chatroom' title='채팅바로가기'>
          {/* 제일 최상위 */}
          <div className='chatParent'>
            {/* 채팅 컨텐츠 */}
            <div className='chatContWrap'>
              <div className='chatCont'>
                {/* 이미지 */}
                <div className='chatImg'>
                  <img src='https://www.dummyimage.com/60x60/000/fff' alt='사용자프로필' />
                </div>

                {/* 채팅명 */}
                <div className='chatTxt'>
                  {/* 채팅 제목 */}
                  <div>
                    <h3>채팅방명</h3>
                    <span>10분전</span>
                  </div>

                  {/* 최근 채팅 내용 */}
                  <p>
                    나에게 그 물건을 넘겨라 닝겐 아님말고
                  </p>
                </div>
              </div>
              {/* 채팅 알림 뱃지 */}
              <span className='chatBadge'>1</span>
            </div>
          </div>
        </Link>
      </li>
    </>
  );
};

export default ChatList;