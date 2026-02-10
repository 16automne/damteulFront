import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import App from 'app/api/axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { getUserId } from 'components/getUserId/getUserId';

import { IoIosMore } from 'react-icons/io'; 
import { AiFillTag } from "react-icons/ai";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { BiMessageSquareDetail } from "react-icons/bi";
import { API_ORIGIN } from 'app/api/apiOrigin';

import 'swiper/css';
import 'swiper/css/pagination';
import './styles/commpost.scss';

// 사용자 등급 아이콘 매핑 (DB의 level_code 또는 userGrade 기준)
const gradeIcons = {
  '1': '/images/level01.png',
  '2': '/images/level02.png',
  '3': '/images/level03.png',
  '4': '/images/level04.png',
  '5': '/images/level05.png'
};

const CommPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const IMAGE_BASE_URL = "http://localhost:9070/uploads/community/";

  const [detail, setDetail] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [showTags, setShowTags] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [comments, setComments] = useState([]);

  const fetchPostDetail = () => {
    App.get(`/api/community/${id}`)
      .then(res => {
        // 백엔드 commDetail 응답: { post: {...}, images: [...] }
        if (res.data && res.data.post) {
          setDetail(res.data);
        }
      })
      .catch(() => navigate('/community'));
  };
    useEffect(() => {
    fetchPostDetail();
  }, [id]);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  if (!detail) return <div className="loading">로딩 중...</div>;

  const { post, images } = detail;

  return (
    <div className='bodyParent'>
      <div className='bodyChild'>
        <main className="commPostPage">
          <header className="postHeader">
            <div className="userInfo">
              {/* 유저 프로필 이미지가 DB에 있다면 post.profile 사용 */}
              <img src={post.profile || "/images/defaultProfile.png"} alt="profile" /> 
              <div className="nameWrap">
                {/* DB의 user_nickname 필드 연결 */}
                <span className="nickname">{post.user_nickname || "익명"}</span>
                <img 
                  src={gradeIcons[post.level_code] || gradeIcons['1']} 
                  alt="grade" 
                  className="gradeBadge" 
                />
              </div>
            </div>
            <div className="menuWrap">
              <IoIosMore onClick={() => setIsOpen(!isOpen)} />
              {isOpen && (
                <div className="adminMenu">
                  <button onClick={() => navigate(`/community/edit/${id}`)}>수정하기</button>
                  <button className="deleteText" onClick={() => alert('삭제 기능 준비중')}>삭제하기</button>
                </div>
              )}
            </div>
          </header>

          <div className='imageSection'>
            <Swiper modules={[Pagination]} pagination={{ clickable: true }}>
              {detail.images && images.map((img, idx) => (
                <SwiperSlide key={img.image_id || idx}>
                  <div className="imgWrap">
                    <img 
                      src={`${IMAGE_BASE_URL}${img.image_url}`} 
                      alt={`post-${idx}`} 
                    />
                    
                    <button className="tagToggleBtn" onClick={() => setShowTags(!showTags)}>
                      <AiFillTag />
                    </button>

                    {showTags && img.tags?.map((tag) => (
                      <div 
                        key={tag.tag_id} 
                        className="postTagMarker" 
                        style={{ left: `${tag.x}%`, top: `${tag.y}%` }}
                        onClick={() => navigate(`/goods/detail/${tag.goods_id}`)}
                      >
                        <div className="tagBox">
                          {/* DB JOIN을 통해 가져온 상품명과 가격 표시 */}
                          <span>{tag.name}</span>
                          <small>{Number(tag.price).toLocaleString()}원</small>
                        </div>
                      </div>
                    ))}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className='goodsInfo'>
            <h3>{post.title}</h3>
            <p className="meta">{new Date(post.created_at).toLocaleDateString()} &#10072; 커뮤니티</p>
            
            <div className='postMainText'>
              <p>{post.content}</p>
            </div>

            <div className='interactionBar'>
              <div className='iconItem' onClick={handleLike}>
                {isLiked ? <FaHeart className="active" /> : <FaRegHeart />}
                <span>{likeCount}</span>
              </div>
              <div className='iconItem'>
                <BiMessageSquareDetail />
                <span>{comments.length}</span>
              </div>
            </div>
          </div>
          
          {/* 댓글 입력 영역 */}
          <div className='bottomInteractionBar'>
            <div className="bottomInner">
              <div className='commentInputPlaceholder' onClick={() => alert('댓글 작성 페이지로 이동')}>
                <img src="/images/defaultProfile.png" alt="me" />
                <span>따뜻한 댓글을 남겨주세요...</span>
              </div>
              <button className='sendBtn'>등록</button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CommPost;