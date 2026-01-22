import React from 'react';
import { NavLink } from 'react-router-dom';
import './styles/nav.css';

import { GoHome, GoHomeFill } from "react-icons/go";
import { PiNoteDuotone, PiNoteFill } from "react-icons/pi";
import { IoGiftOutline, IoGift  } from "react-icons/io5";
import { PiChatTeardropText, PiChatTeardropTextFill  } from "react-icons/pi";
import { PiUser,PiUserFill } from "react-icons/pi";


const HaveNavi = () => {
  // 메뉴들을 배열화 해주기
  const navItems = [
    { to: "/", label: "홈", 
      icon: <GoHome />, activeIcon: <GoHomeFill /> },
    { to: "/community", label: "커뮤니티", 
      icon: <PiNoteDuotone />, activeIcon: <PiNoteFill /> },
    { to: "/share", label: "나눔/이벤트", 
      icon: <IoGiftOutline />, activeIcon: <IoGift /> },
    { to: "/chat", label: "대화", 
      icon: <PiChatTeardropText />, activeIcon: <PiChatTeardropTextFill /> },
    { to: "/mypage", label: "내 정보", 
      icon: <PiUser />, activeIcon: <PiUserFill /> },
  ];

  return (
    <nav className="naviContainer">
      {navItems.map((item) => (
        <NavLink 
          key={item.to} 
          to={item.to} 
          className={({ isActive }) => isActive ? "navItem active" : "navItem"}
        >
          {({ isActive }) => (
            <div className='naviWrap'>
              <div className="navIcon">
                {isActive ? item.activeIcon : item.icon}
              </div>
              <span className="navLabel">{item.label}</span>
            </div>
          )}
        </NavLink>
      ))}
    </nav>
  );
};

export default HaveNavi;