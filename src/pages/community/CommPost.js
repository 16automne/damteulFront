import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import App from 'app/api/axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { getUserId } from 'components/getUserId/getUserId';

import { IoIosMore } from 'react-icons/io';
import { AiFillTag } from "react-icons/ai";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { BiMessageSquareDetail } from "react-icons/bi";

import 'swiper/css';
import 'swiper/css/pagination';
import './styles/commpost.scss';

const gradeIcons = {
  '1': '/images/level01.png', '2': '/images/level02.png', '3': '/images/level03.png',
  '4': '/images/level04.png', '5': '/images/level05.png'
};

const IMAGE_BASE_URL = "http://localhost:9070/uploads/community/";

const CommPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const userId = getUserId() ? Number(getUserId()) : null;

  // --- [1] 모든 State 선언 ---
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [showTags, setShowTags] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  // --- [2] 모든 Hook 선언 (반드시 Early Return 위에 위치) ---

  // 댓글 목록 조회
  const fetchComments = useCallback(() => {
    App.get(`/api/community/${id}/comments`)
      .then(res => setComments(res.data || []))
      .catch(err => console.error("댓글 로드 실패", err));
  }, [id]);

  // 좋아요 상태 조회
  const fetchLikeStatus = useCallback(() => {
    if (!userId || !id) return;
    App.get(`/api/community/${id}/likes`, { params: { user_id: userId } })
      .then(res => setIsLiked(res.data.isLiked || false))
      .catch(err => console.error("좋아요 확인 실패", err));
  }, [id, userId]);

  // 게시글 상세 조회
  const fetchPostDetail = useCallback(() => {
    setLoading(true);
    App.get(`/api/community/${id}`)
      .then(res => {
        if (res.data && res.data.post) {
          if (!res.data.images || res.data.images.length === 0) {
            alert("유효하지 않은 게시글입니다.");
            navigate('/community');
            return;
          }
          setDetail(res.data);
          setLikeCount(res.data.post.initial_like_count || 0);
        }
      })
      .catch(() => navigate('/community'))
      .finally(() => setLoading(false));
  }, [id, navigate]);

  useEffect(() => {
    fetchPostDetail();
    fetchComments();
    fetchLikeStatus();
  }, [fetchPostDetail, fetchComments, fetchLikeStatus]);

  // --- [3] 이벤트 핸들러 ---

  // 댓글 등록
  const handleCommentSubmit = () => {
    if (!userId) return alert("로그인이 필요합니다.");
    if (!newComment.trim()) return;

    App.post('/api/community/comments', { post_id: id, user_id: userId, content: newComment })
      .then(() => {
        setNewComment("");
        fetchComments(); // ✅ 즉시 갱신
      })
      .catch(() => alert("댓글 등록 실패"));
  };

  // ✅ 댓글 삭제 기능 추가
  const handleCommentDelete = (commentId) => {
    if (window.confirm("댓글을 삭제하시겠습니까?")) {
      App.delete(`/api/community/comments/${commentId}`)
        .then(() => fetchComments()) // ✅ 삭제 후 즉시 갱신
        .catch(() => alert("삭제 실패"));
    }
  };

  const handleLikeToggle = () => {
    if (!userId) return alert("로그인이 필요합니다.");
    App.post(`/api/community/likes/toggle`, { post_id: id, user_id: userId })
      .then(() => {
        fetchPostDetail();
        fetchLikeStatus();
      });
  };

  const handleReport = () => {
    if (!userId) return alert("로그인이 필요합니다.");
    if (window.confirm("이 게시글을 신고하시겠습니까?")) {
      alert("신고 접수가 완료되었습니다.");
      setIsOpen(false);
    }
  };

  // --- [4] 조건부 렌더링 (Hook 아래에 위치) ---
  if (loading) return <div className="loading">데이터를 불러오는 중...</div>;
  if (!detail || !detail.post) return <div className="loading">데이터가 없습니다.</div>;

  const { post, images } = detail;

  return (
    <div className="bodyParent">
      <main className="commPostPage">
        {/* 사용자 헤더 */}
        <header className="postHeader">
          <div className="userInfo">
            <img src={post.profile || "/images/defaultProfile.png"} alt="profile" onError={(e) => { e.target.src = "/images/defaultProfile.png"; }} />
            <div className="nameWrap">
              <span className="nickname">{post.user_nickname}</span>
              <img src={gradeIcons[String(post.level_code)] || gradeIcons['1']} alt="lv" className="gradeBadge" />
            </div>
          </div>
          <div className="menuWrap">
            <IoIosMore onClick={() => setIsOpen(!isOpen)} />
            {isOpen && (
              <div className="adminMenu">
                {post.user_id === userId ? (
                  <>
                    <button onClick={() => navigate(`/community/write`, { state: { editData: detail } })}>수정하기</button>
                    <button className="deleteText" onClick={() => { if (window.confirm("정말 삭제하시겠습니까?")) App.put(`/api/community/delete/${id}`).then(() => navigate('/community')); }}>삭제하기</button>
                  </>
                ) : (
                  <button onClick={handleReport}>신고하기</button>
                )}
              </div>
            )}
          </div>
        </header>

        {/* 이미지 및 태그 */}
        <section className="imageSection">
          <Swiper modules={[Pagination]} pagination={{ clickable: true }}>
            {images.map((img, idx) => (
              <SwiperSlide key={img.image_id || idx}>
                <div className="imgWrap">
                  <img src={`${IMAGE_BASE_URL}${img.image_url}`} alt="post" />
                  <button className="tagToggleBtn" onClick={() => setShowTags(!showTags)}><AiFillTag /></button>
                  {showTags && img.tags?.map((tag, tIdx) => (
                    <div
                      key={tag.tag_id || tIdx}
                      className="postTagMarker"
                      style={{ left: `${tag.x_pos || tag.x}%`, top: `${tag.y_pos || tag.y}%` }}
                      onClick={() => navigate(`/goodsdetail/${tag.goods_id}`)}
                    >
                      <div className="tagBox">
                        <span>{tag.name}</span>
                        <small>{Number(tag.price).toLocaleString()}원</small>
                      </div>
                    </div>
                  ))}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>

        {/* 본문 정보 */}
        <div className='goodsInfo'>
          <div className='interactionBar'>
            <div className='iconItem' onClick={handleLikeToggle} style={{ cursor: 'pointer' }}>
              {isLiked ? <FaHeart className="active" /> : <FaRegHeart />}
              <span>{likeCount}</span>
            </div>
            <div className='iconItem'>
              <BiMessageSquareDetail />
              <span>{comments.length}</span>
            </div>
          </div>
          <h3>{post.title}</h3>
          <div className='postMainText'><p>{post.content}</p></div>
        </div>

        {/* 댓글 리스트 섹션 */}
        <section className="commentListSection">
          {comments.map((comment) => (
            <div key={comment.comment_id} className="commentItem">
              <div className="commentHeader">
                <span className="commentUser">{comment.user_nickname}</span>
                {/* 본인 댓글일 때만 삭제 버튼 노출 */}
                {comment.user_id === userId && (
                  <button className="commDelBtn" onClick={() => handleCommentDelete(comment.comment_id)}>삭제</button>
                )}
              </div>
              <p className="commentText">{comment.content}</p>
            </div>
          ))}
        </section>

        {/* 하단 댓글 입력바 */}
        <div className="bottomInteractionBar">
          <div className="bottomInner">
            <input
              type="text"
              className="commentInput"
              placeholder="댓글을 남겨보세요"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleCommentSubmit()}
            />
            <button className="sendBtn" onClick={handleCommentSubmit} disabled={!newComment.trim()}>등록</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CommPost;