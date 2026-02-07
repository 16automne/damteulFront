import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import api from 'app/api/axios';
import { getUserId } from 'components/getUserId/getUserId';
import './styles/goodsDetail.css';
// 더보기버튼
import { IoIosMore } from "react-icons/io";
// 좋아요
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

// 댓글
import { FaRegComment } from "react-icons/fa";




function GoodsDetail(props) {
	const userId = getUserId();

	// 더보기버튼 상태변수
	const [isOpen, setIsOpen] = useState(false);
	// 좋아요버튼 상태변수
	const [like, setLike] = useState(false);

	// URL의 :goods_id값
	const {goods_id} = useParams();
	const [goods, setGoods] = useState(null);
	// 관련 상품 상태변수
	const [relevance, setRelevance] = useState([]);

	// 1. 게시 시간 계산 함수 추가
  const getTimeDiff = (date) => {
    if (!date) return "시간 정보 없음";
    const start = new Date(date);
    const now = new Date();
    const diff = (now - start) / 1000 / 60; // 분 단위

    if (diff < 60) {
      return `${Math.floor(Math.max(0, diff))}분 전`;
    } else if (diff < 1440) {
      return `${Math.floor(diff / 60)}시간 전`;
    }else{
			return `${Math.floor(diff / 1440)}일 전`;
		}
  };

	useEffect(() => {
    // 2. 해당 ID의 상세 데이터 요청
    const fetchDetail = async () => {
      try {
        const res = await api.get(`/api/goods/${goods_id}?user_id=${userId}`);
        if (res.data.ok) {
          setGoods(res.data.data);
					setLike(res.data.data.like_status === 1);
					setRelevance(res.data.relevance || []);
        }
      } catch (err) {
        console.error("상세 정보 로드 실패:", err);
      }
    };
    fetchDetail();
  }, [goods_id, userId]);

	// 작성글 삭제하기
	const handleDelete = async () => {
		if (!window.confirm("정말로 이 게시글을 삭제하시겠습니까?")) return;

		try {
			const res = await api.delete(`/api/goods/${goods_id}`);
			if (res.data.ok) {
				alert("삭제되었습니다.");
				window.location.href = "/"; // 삭제 후 메인으로 이동
			}
		} catch (err) {
			console.error("삭제 실패:", err);
			alert("삭제 중 오류가 발생했습니다.");
		}
	};

	// 좋아요 토글 함수
	const handleLikeClick = async() => {
		const userId = getUserId();
		try{
			const res = await api.post('/api/goods/like',{
				goods_id:goods.goods_id,
				user_id:userId
			});
			if(res.data.ok){
				// 서버 status가 1이면 true, 0 false
				const isLiked = res.data.status === 1;
				setLike(isLiked);
				// like_count상태 업데이트
				setGoods(prev =>({
					...prev,
					like_count : isLiked
					?(prev.like_count || 0) +1
					:Math.max(0,(prev.like_count || 0) - 1)
				}));
			}
		}catch(err){
			console.error("좋아요 처리 실패 : ", err);
		}
	};
	const categoryMap ={
		1:"티켓/교환권",
		2:"의류",
		3:"뷰티/미용",
		4:"유아용품",
		5:"도서",
		6:"스포츠/레저",
		7:"디지털기기"
	}

  if (!goods) return <p>로딩 중...</p>;
	return (
		<main>
			<section className='goodsDetail'>

				{/* 게시자 정보 영역 */}
				<div className='postUser'>
					<img src='https://placehold.co/100x100' alt='사용자 프로필'/>
					<p>{goods.user_nickname}</p>
					<img src='https://placehold.co/100x100' alt='회원등급'/>
					<IoIosMore className='moreBtn'
					onClick={()=>{setIsOpen(!isOpen)}}/>
					{isOpen && 
					<div className='moreAction'>
					<p>관심없음</p>
					<span></span>
					<Link to='' title='신고페이지로 이동'>신고하기</Link>
				</div>
					}
				</div>


				{/* 스와이퍼 이미지 영역 */}
				<div className='mainImg swipeContainer'>
					<div className='goodsItem'>
						<img src='https://placehold.co/390x430' alt=''/>
					</div>
					<div className='goodsItem'>
						<img src='https://placehold.co/390x430' alt=''/>
					</div>
					<div className='goodsItem'>
						<img src='https://placehold.co/390x430' alt=''/>
					</div>
				</div>

				{/* 제품상세정보 텍스트 영역 */}
				<div className='goodsInfo'>
					<h3>{goods.title}</h3>
					<p>{getTimeDiff(goods.created_at)} &#10072; {categoryMap[goods?.category_id]||"기타"}</p>
					<p>{goods?.price?.toLocaleString()}원</p>
					{/* 좋아요/댓글 */}
					<div className='reaction'>
						<p>
						<FaRegHeart /><span>{goods.like_count || 0}</span>
						</p>
						{goods.conversation_type === 1 &&
							<p>
							<FaRegComment /><span>nnn</span>
							</p>
						}
						
					</div>
					<button className='favorite' onClick={handleLikeClick}>
						{like === true?(<FaHeart />):(<FaRegHeart />)}
					
					</button>
				</div>
					<p>{goods.content}</p>
				{/* 중고상품일시 표시될 영역 */}
				{goods.condition_type === 0 &&
				<div className='usedInfo'>
					<h4>특이 사항</h4>
					<p>중고상품일시 표시되는 영역으로 퍼블리싱 끝나면 데이터 받아올 자리입니다
						
						중고상품일시 표시되는 영역으로 퍼블리싱 끝나면 데이터 받아올 자리입니다
					</p>
					<div className='usedItem'> 
						<img src='https://placehold.co/390x430' alt='제품상세이미지'/>
						<img src='https://placehold.co/390x430' alt='제품상세이미지'/>
						<img src='https://placehold.co/390x430' alt='제품상세이미지'/>
						<img src='https://placehold.co/390x430' alt='제품상세이미지'/>
						<img src='https://placehold.co/390x430' alt='제품상세이미지'/>
						<img src='https://placehold.co/390x430' alt='제품상세이미지'/>
					</div>
				</div>
				}
				

				{/* 관련상품 표시영역 */}
				<div className='relevance'>
				<h3>관련상품</h3>
				{/* 상품 이미지/정보표시영역 */}
				<div className='relevanceGrid'>
					{relevance && relevance.length > 0?(
						relevance.map((item)=>(
						<Link to={`/goods${item.goods_id}`}
						key={item.goods_id}
						className='relevanceItem'>
							<img src='https://placehold.co/390x430' alt='제품상세이미지'/>
							<h3>{item.title}</h3>
							<p>{item.price?.toLocaleString()}원</p>
						</Link>
					))
					):(
						<p>등록된 관련 상품이 없습니다.</p>
					)}
					
				</div>
				</div>
				<div className='bottomBtn'>
					{Number(userId) === Number(goods.user_id)?(
						<>
						<button onClick={handleDelete}>삭제하기</button>
						<button>수정하기</button>
						</>
					):(
						<>
						{goods.conversation_type === 0?(
							<Link>채팅불가</Link>
						):(
							<Link>채팅하기</Link>
						)}
						
						<Link to={`/payment/${goods.goods_id}`} state={{goods:goods}}>결제하기</Link>
							</>
						)}
					
				</div>
			</section>
		</main>
	);
}

export default GoodsDetail;