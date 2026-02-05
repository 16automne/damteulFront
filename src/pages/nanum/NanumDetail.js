import React,{useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { IoIosMore } from 'react-icons/io';
import { FaUser } from "react-icons/fa";
import './styles/nanumDetail.css';

function NanumDetail(props) {

		// 더보기버튼 상태변수
		const [isOpen, setIsOpen] = useState(false);
		// 응모완료 상태변수
		const [clearIsOpen, setClearIsOpen] = useState(false);

		const {nanum_id} = useParams();
		const [post, setPost] = useState(null);

		//응모 남은 시간 상태변수
		const [timeLeft, setTimeLeft] = useState("");
		//남은 시간 갱신
		useEffect(() => {
			if (!post) return;

			// 1초마다 타이머 갱신
			const timer = setInterval(() => {
				setTimeLeft(getRemainingTimer(post.end_nanum));
			}, 1000);

			return () => clearInterval(timer); // 언마운트 시 정리
		}, [post]);

		useEffect(()=>{
			const getDetail = async()=>{
				try{
					const response = await axios.get(`http://localhost:9070/api/nanum/${nanum_id}`);
					setPost(response.data);
				}catch(err){
					console.error("데이터 로드 실패 : ", err);
				}
			};
			getDetail();
		},[nanum_id, setPost]);
		if(!post) return <div>로딩중...</div>;

		//게시 시간 타이머
		const getTimeDiff = (date) => {
		const start = new Date(date);
		const now = new Date();
		const diff = (now - start) / 1000 / 60; // 분 단위 차이

		if (diff < 60) {
			return `${Math.floor(diff)}분 전`;
		} else {
			return `${Math.floor(diff / 60)}시간 전`;
		}
	};

	// 남은 시간 타이머
	const getRemainingTimer = (endTime) => {
  const total = new Date(endTime) - new Date();
  
  if (total <= 0) return "00:00:00";

  // 시, 분, 초 계산
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)));

  // 두 자릿수 유지 (padStart 사용)
  const h = String(hours).padStart(2, '0');
  const m = String(minutes).padStart(2, '0');
  const s = String(seconds).padStart(2, '0');

  return `${h}:${m}:${s}`;
	};

	// 응모 처리 함수 추가
	const handleApply = async () => {
  try {
    const user_id = "11"; // 로그인 세션에서 가져오거나 임시 ID 사용
    const response = await axios.post("http://localhost:9070/api/nanum/apply", {
      nanum_id: nanum_id,
      user_id: user_id
    });

    if (response.status === 200) {
      setClearIsOpen(true); // 성공 시 모달 오픈
    }
  } catch (err) {
    console.error("응모 실패 : ", err);
    alert("이미 응모했거나 응모 처리 중 오류가 발생했습니다.");
  }
	};



	return (
		<main>
			{/* 응모완료 모달 */}
			{clearIsOpen&&
				<div className='clearedModalWrapper'>
					<div className='clearedModal'>
						<p>응모가 완료되었습니다!</p>
						<button onClick={()=>setClearIsOpen(false)}>확인</button>
					</div>
				</div>
			}
				
			<section className='nanumDetail'>
				{/* 게시자 정보 영역 */}
				<div className='postUser'>
					<img src='https://placehold.co/100x100' alt='사용자 프로필'/>
					<p>{post.user_nickname}</p>
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
					<h3>{post.title}</h3>
					<p>{getTimeDiff(post.created_at)} &#10072; 이벤트</p>
					<p>{timeLeft}</p>
					{/* 좋아요/댓글 */}
					<div className='reaction'>
						<p>
						<FaUser />nnn
						</p>
					</div>
				</div>

				<div className='usedInfo'>
					<p>
						{post.content}
					</p>
				</div>

				<div className='bottomBtn nanumBtnCustom'>
					<button onClick={handleApply}>응모하기</button>
					</div>

				
			</section>
		</main>
	);
}

export default NanumDetail;