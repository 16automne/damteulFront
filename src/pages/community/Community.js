import React from 'react';
import { NavLink } from 'react-router-dom';
import './styles/community.css';

import { HiOutlineTicket, HiTicket } from "react-icons/hi2";
import { TbShirt, TbShirtFilled } from "react-icons/tb";
import { IoDiamondOutline, IoDiamond, IoBookOutline, IoBookSharp } from "react-icons/io5";
import { PiBaby ,PiBabyFill, PiMonitor, PiMonitorFill } from "react-icons/pi";
import { CiDumbbell } from "react-icons/ci";
import { FaDumbbell } from "react-icons/fa6";
import { IoMdHeart } from "react-icons/io";
import { PiChatCircleTextFill } from "react-icons/pi";

const Community = () => {

  // 카테고리 메뉴들 배열화
  const commCatea = [
    { to: "/ticket", label: "티켓/교환권",
      icon: <HiOutlineTicket />, activeIcon: <HiTicket /> },
    { to: "/clothes", label: "의류",
      icon: <TbShirt />, activeIcon: <TbShirtFilled /> },
    { to: "/beauty", label: "뷰티/미용",
      icon: <IoDiamondOutline />, activeIcon: <IoDiamond /> },
    { to: "/baby", label: "유아용품",
      icon: <PiBaby />, activeIcon: <PiBabyFill /> },
    { to: "/book", label: "도서",
      icon: <IoBookOutline />, activeIcon: <IoBookSharp /> },
    { to: "/sports", label: "스포츠/레저",
      icon: <CiDumbbell />, activeIcon: <FaDumbbell /> },
    { to: "/digit", label: "디지털기기",
      icon: <PiMonitor />, activeIcon: <PiMonitorFill /> }
  ];

  return (
    <main className="commMain">
      <section className="commRecSection">
        <h2><span>OOO님</span>에게 추천드리는 커뮤니티</h2>
      </section>

      {/* 카테고리 메뉴 */}
      <nav className='commCateList'>
        {commCatea.map((item) => ( //navItems(홈, 커뮤, 나눔, 대화, 내정보)를 하나씩 반복
        <NavLink //누르면 해당 장소로 이동
          key={item.to} //이름표
          to={item.to} //클릭시 도착할 목적지
          className={({ isActive }) => isActive ? "commCate active" : "commCate"}
        >
          {({ isActive }) => (
            <div className='commCateWrap'>
              <div className="commCateIcon"> {/* 아이콘 */}
                {/* 내가 선택한 메뉴에 있다면 fillicon보여주고 아니면 그냥icon */}
                {isActive ? item.activeIcon : item.icon}
              </div>
              <span className="commCateLabel">{item.label}</span> {/* 탭 이름 */}
            </div>
          )}
        </NavLink>
      ))}
      </nav>

      {/* 게시물 사진 리스트 */}
      <section className="comFeedSection">
        <h3 className="comTitle">커뮤니티</h3>
        <div className="comFeedWrap">
          <article className="comFeedItem">
            <div className="imgBox">
              <img src='https://placehold.co/180' alt='이미지1' />
              <div className="feedInfo"> {/* 이미지 위 하트, 댓글 수 */}
                <span><IoMdHeart /> 683</span>
                <span><PiChatCircleTextFill /> 15</span>
              </div>
            </div>
          </article>
          
          <article className="comFeedItem">
            <div className="imgBox">
              <img src='https://placehold.co/180' alt='이미지2' />
              <div className="feedInfo">
                <span><IoMdHeart /> 351</span>
                <span><PiChatCircleTextFill /> 10</span>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* 글쓰기 버튼 */}
    </main>
  );
};

export default Community;