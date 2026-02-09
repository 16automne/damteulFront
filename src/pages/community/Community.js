import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import App from 'app/api/axios';
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

const IMAGE_BASE_URL = "http://localhost:9070/uploads/community/";

const Community = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('/ticket');
  const [feeds, setFeeds] = useState([]);
  const listRef = useRef(null);

  const categoryMap = {
    "/ticket": "1",
    "/clothes": "2",
    "/beauty": "3",
    "/baby": "4",
    "/book": "5",
    "/sports": "6",
    "/digit": "7"
  };

  const fetchFeeds = () => {
    App.get("/api/community")
      .then((res) => setFeeds(res.data))
      .catch((err) => console.error("데이터 로딩 실패:", err));
  };

  useEffect(() => {
    fetchFeeds();
  }, []);

  const handleFeedClick = (feed) => {
    console.log("클릭한 피드 데이터:", feed); // 데이터에 id가 들어오는지 확인용
    if (feed.id) {
      navigate(`/community/post/${feed.id}`); 
    } else {
      console.error("게시글 ID가 없습니다. 백엔드 쿼리의 'AS id'를 확인하세요.");
    }
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

  const filteredFeeds = feeds.filter(feed => String(feed.cate) === categoryMap[selectedCategory]);
  

  return (
    <main className="communityContainer">
      <div className="commBaseLayout">
        <section className="commRecSection">
          <h2><span style={{fontWeight:'bold'}}>사용자</span>님에게 추천드리는 커뮤니티</h2>
        </section>
        
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

      <section className="comFeedSection" ref={listRef}>
        <ul className="comFeedWrap">
          {filteredFeeds.map(feed => (
            <li 
              key={feed.id} 
              className="comFeedItem" 
              onClick={() => handleFeedClick(feed)}
              style={{ cursor: 'pointer' }}
            >
              <div className="imgBox">
                <img 
                  src={`${IMAGE_BASE_URL}${feed.image_url}`}
                  alt={feed.title} 
                />
                
                {/* 1. 더보기 아이콘 (상단 우측) */}
                <div className="moreIcon">
                  <span><IoMdMore /></span>
                </div>

                {/* 2. 피드 정보 (하트 및 댓글 개수 - 하단) */}
                <div className="feedInfo">
                  {/* 하트와 댓글은 현재 DB에서 안 가져오므로 임시로 0 또는 feed 속성 연결 */}
                  <span><IoMdHeart /> {feed.heart || 0}</span>
                  <span><PiChatCircleTextFill /> {feed.chat || 0}</span>
                </div>
              </div>
            </li>
))}
        </ul>
      </section>
      <WriteBtn />
    </main>
  );
};

export default Community;