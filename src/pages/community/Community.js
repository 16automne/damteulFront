import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/community.css';
import WriteBtn from '../../components/writeBtn/WriteBtn';

import { HiOutlineTicket, HiTicket } from "react-icons/hi2";
import { TbShirt, TbShirtFilled } from "react-icons/tb";
import { IoDiamondOutline, IoDiamond, IoBookOutline, IoBookSharp } from "react-icons/io5";
import { PiBaby ,PiBabyFill, PiMonitor, PiMonitorFill } from "react-icons/pi";
import { CiDumbbell } from "react-icons/ci";
import { FaDumbbell } from "react-icons/fa6";
import { IoMdHeart, IoMdMore } from "react-icons/io";
import { PiChatCircleTextFill } from "react-icons/pi";

const Community = () => {
  // navigate 함수 정의 추가
  const navigate = useNavigate(); 
  // 현재 선택된 카테고리 상태 관리 (기본값: 'ticket')
  const [selectedCategory, setSelectedCategory] = useState('/ticket');
  const listRef = useRef(null);

  // 3. 피드 클릭 시 상세 페이지로 이동
  const handleFeedClick = (feed) => {
    navigate('/community/post', { state: { feedData: feed } });
  };

  const commCatea = [
    { to: "/ticket", label: "티켓/교환권", icon: <HiOutlineTicket />, activeIcon: <HiTicket /> },
    { to: "/clothes", label: "의류", icon: <TbShirt />, activeIcon: <TbShirtFilled /> },
    { to: "/beauty", label: "뷰티/미용", icon: <IoDiamondOutline />, activeIcon: <IoDiamond /> },
    { to: "/baby", label: "유아용품", icon: <PiBaby />, activeIcon: <PiBabyFill /> },
    { to: "/book", label: "도서", icon: <IoBookOutline />, activeIcon: <IoBookSharp /> },
    { to: "/sports", label: "스포츠/레저", icon: <CiDumbbell />, activeIcon: <FaDumbbell /> },
    { to: "/digit", label: "디지털기기", icon: <PiMonitor />, activeIcon: <PiMonitorFill /> }
  ];

  // 임시 데이터
  const allFeeds = [
    { id: 1, category: "/ticket", img: "https://placehold.co/180", heart: 683, chat: 15 },
    { id: 2, category: "/ticket", img: "https://placehold.co/180", heart: 683, chat: 15 },
    { id: 3, category: "/ticket", img: "https://placehold.co/180", heart: 683, chat: 15 },
    { id: 4, category: "/ticket", img: "https://placehold.co/180", heart: 683, chat: 15 },
    { id: 5, category: "/ticket", img: "https://placehold.co/180", heart: 683, chat: 15 },

    { id: 6, category: "/clothes", img: "https://placehold.co/180", heart: 351, chat: 10 },
    { id: 7, category: "/clothes", img: "https://placehold.co/180", heart: 351, chat: 10 },
    { id: 8, category: "/clothes", img: "https://placehold.co/180", heart: 351, chat: 10 },

    { id: 9, category: "/beauty", img: "https://placehold.co/180", heart: 351, chat: 10 },
    { id: 10, category: "/beauty", img: "https://placehold.co/180", heart: 351, chat: 10 },
    { id: 11, category: "/beauty", img: "https://placehold.co/180", heart: 351, chat: 10 },

    { id: 12, category: "/baby", img: "https://placehold.co/180", heart: 351, chat: 10 },
    { id: 13, category: "/baby", img: "https://placehold.co/180", heart: 351, chat: 10 },
    { id: 14, category: "/baby", img: "https://placehold.co/180", heart: 351, chat: 10 },
    
    { id: 15, category: "/book", img: "https://placehold.co/180", heart: 351, chat: 10 },
    { id: 16, category: "/book", img: "https://placehold.co/180", heart: 351, chat: 10 },
    { id: 17, category: "/book", img: "https://placehold.co/180", heart: 351, chat: 10 },
    
    { id: 18, category: "/sports", img: "https://placehold.co/180", heart: 351, chat: 10 },
    { id: 19, category: "/sports", img: "https://placehold.co/180", heart: 351, chat: 10 },
    { id: 20, category: "/sports", img: "https://placehold.co/180", heart: 351, chat: 10 },
    
    { id: 21, category: "/digit", img: "https://placehold.co/180", heart: 351, chat: 10 },
    { id: 22, category: "/digit", img: "https://placehold.co/180", heart: 351, chat: 10 },
    { id: 23, category: "/digit", img: "https://placehold.co/180", heart: 351, chat: 10 },
  ];


  // 선택된 카테고리에 맞는 데이터만 필터링
  const filteredFeeds = allFeeds.filter(feed => feed.category === selectedCategory);
  console.log("선택된 카테고리:", selectedCategory);
  console.log("필터링된 데이터 개수:", filteredFeeds.length);

  return (
    <main className="communityContainer">
      <div className="commBaseLayout">
        {/* 1. 추천 */}
        <section className="commRecSection">
          <h2><span>OOO님</span>에게 추천드리는 커뮤니티</h2>
        </section>
        
        {/* 2. 카테고리 메뉴 */}
        <nav className='commCateList'>
          {commCatea.map((item) => (
            <div 
              key={item.to} 
              className={`commCate ${selectedCategory === item.to ? "active" : ""}`}
              onClick={() => setSelectedCategory(item.to)}
            >
              <div className='commCateWrap'>
                <div className="commCateIcon">
                  {selectedCategory === item.to ? item.activeIcon : item.icon}
                </div>
                <span className="commCateLabel">{item.label}</span>
              </div>
            </div>
          ))}
        </nav>
      </div>

      {/* 3. 이미지 피드 */}
      <section className="comFeedSection" ref={listRef}>
        {/* ref={listRef}를 통해 나중에 스크롤 위치를 조절하거나 높이를 계산할 수 있도록 이름표를 달아둔 것 */}
        <ul className="comFeedWrap">
          {filteredFeeds.map(feed => ( //데이터 매칭
            <li 
              key={feed.id} 
              className="comFeedItem" 
              onClick={() => handleFeedClick(feed)}
              style={{ cursor: 'pointer' }}
            >
              <div className="imgBox">
                <img src={feed.img} alt={`피드 ${feed.id}`} />
                <div className="moreIcon">
                  <span><IoMdMore /></span>
                </div>
                <div className="feedInfo">
                  <span><IoMdHeart /> {feed.heart}</span>
                  <span><PiChatCircleTextFill /> {feed.chat}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* 글쓰기 버튼 */}
      <WriteBtn />
    </main>
  );
};

export default Community;