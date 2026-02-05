import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import { AiFillTag } from "react-icons/ai";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { BiMessageSquareDetail } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";

// Swiper 스타일 (설치 필수: npm install swiper)
import 'swiper/css';
import 'swiper/css/pagination';
import './styles/commpost.scss';

const gradeIcons = {
  'level01': '/images/level01.png',
  'level02': '/images/level02.png',
  'level03': '/images/level03.png',
  'level04': '/images/level04.png',
  'level05': '/images/level05.png',
  'level06': '/images/level06.png'
};


const CommPost = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // 1. 데이터 받기 - 예시
  const post = location.state?.feedData || {
    id: 999,
    img: "https://placehold.co/180", // 예시 이미지
    heart: 683,
    chat: 15,
    tags: [
      { id: 1, x: 25, y: 35, name: "스트라이프 셔츠", price: "23,000" },
      { id: 2, x: 55, y: 25, name: "다홍 니트", price: "20,000" }
    ]
  };
  const writer = {
    nickname: "멘딩에해딩",
    grade: post.userGrade || "level03",
  };

  // 2. 상태 관리
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.heart);
  const [showTags, setShowTags] = useState(true); // 1번 기능: 태그 토글
  const [showMenu, setShowMenu] = useState(false); // 6번 기능: 수정/삭제 모달
  const [comments, setComments] = useState([
    { id: 1, user: '빛과부', text: '정보 궁금해요!', profile: 'https://placehold.co/40' },
    { id: 2, user: '마르고닳도록', text: '봄에 입으면 너무 예쁠 것 같아요. 봄에 입으면 너무 예쁠 것 같아요. 봄에 입으면 너무 예쁠 것 같아요. 봄에 입으면 너무 예쁠 것 같아요. ', profile: 'https://placehold.co/40' }
  ]);

  // 좋아요 핸들러 (4번 기능)
  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  // 열려있는 댓글 메뉴 ID
  const [activeCommentMenu, setActiveCommentMenu] = useState(null);
  // 메뉴 토글 함수
  const toggleCommentMenu = (id) => {
    setActiveCommentMenu(activeCommentMenu === id ? null : id);
  };
  // 댓글 삭제 함수
  const handleDeleteComment = (id) => {
    if (window.confirm("댓글을 삭제하시겠습니까?")) {
      setComments(comments.filter(c => c.id !== id));
      setActiveCommentMenu(null);
    }
  };

  return (
    <div className="commPostPage">
      {/* 6. 관리 메뉴 (수정하기/삭제하기) */}
      <header className="postHeader">
        <div className="userInfo">
          {/* 프로필 이미지도 public/images에 있다면 /images/파일명 */}
          <img src="/images/defaultProfile.png" alt="profile" /> 
          
          <div className="nameWrap">
            <span className="nickname">{writer.nickname}</span>
            
            {/* 등급 아이콘 동적 렌더링 */}
            <img 
              src={gradeIcons[writer.grade] || '/images/level03.png'} 
              alt={writer.grade} 
              className="gradeBadge" 
            />
          </div>
        </div>
        <div className="menuWrap">
          <BsThreeDotsVertical onClick={() => setShowMenu(!showMenu)} />
          {showMenu && (
            <div className="adminMenu">
              <button onClick={() => navigate('/community/write')}>수정하기</button>
              <button onClick={() => { alert('삭제되었습니다.'); navigate('/community'); }}>삭제하기</button>
            </div>
          )}
        </div>
      </header>

      {/* 1, 2. 이미지 스와이퍼 및 태그 표시 */}
      <div className="imageSection">
        <Swiper modules={[Pagination]} pagination={{ clickable: true }}>
          {/* 첫 번째 슬라이드 */}
          <SwiperSlide>
            <div className="imgWrap">
              <img src={post.img} alt="post" />
              <button className="tagToggleBtn" onClick={() => setShowTags(!showTags)}>
                <AiFillTag />
              </button>
              {showTags && post.tags?.map(tag => (
                <div key={tag.id} className="postTagMarker" style={{ left: `${tag.x}%`, top: `${tag.y}%` }}>
                  <div className="tagBox">
                    <span>{tag.name}</span>
                    <small>{tag.price}원</small>
                  </div>
                </div>
              ))}
            </div>
          </SwiperSlide>

          {/* 두 번째 슬라이드 (동일한 imgWrap 적용) */}
          <SwiperSlide>
            <div className="imgWrap">
              <img src="https://placehold.co/180" alt="slide2" />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      {/* 3. 사진 밑 태그 리스트 */}
      <div className="tagListRow">
        {post.tags?.map(tag => (
          <div key={tag.id} className="tagItemCard">
            <img src="https://placehold.co/50" alt="thumb" />
            <div className="txt">
              <p>{tag.name}</p>
              <span>{tag.price}원</span>
            </div>
          </div>
        ))}
      </div>

      {/* 4. 좋아요 및 댓글 수 */}
      <div className="interactionBar">
        <div className="iconItem" onClick={handleLike}>
          {isLiked ? <FaHeart /> : <FaRegHeart />}
          <span>{likeCount}</span>
        </div>
        <div className="iconItem">
          <BiMessageSquareDetail />
          <span>{comments.length}</span>
        </div>
      </div>

      {/* 5. 댓글 영역 */}
      <div className="commentSection">
        {comments.map(comment => (
          <div key={comment.id} className="commentItem">
            <img src={comment.profile} alt="p" />
            
            <div className="commTxt">
              <strong>{comment.user}</strong>
              <p>{comment.text}</p>
            </div>

            {/* 댓글 우측 점 세개 버튼 */}
            <div className="commentMenuBtn" onClick={(e) => {
              e.stopPropagation(); // 배경 클릭 이벤트 전파 방지
              toggleCommentMenu(comment.id);
            }}>
              <BsThreeDotsVertical />
            </div>

            {/* 댓글 개별 모달 */}
            {activeCommentMenu === comment.id && (
              <div className="commentModal">
                <button onClick={() => alert('대댓글 기능 준비 중!')}>댓글달기</button>
                <button onClick={() => handleDeleteComment(comment.id)}>삭제하기</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommPost;