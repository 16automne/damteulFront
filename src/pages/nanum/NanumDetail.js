import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import { IoIosMore } from 'react-icons/io';
import { FaUser } from "react-icons/fa";
import './styles/nanumDetail.css';

function NanumDetail(props) {

		// 더보기버튼 상태변수
		const [isOpen, setIsOpen] = useState(false);
	return (
		<main>
			<section>
				{/* 게시자 정보 영역 */}
				<div className='postUser'>
					<img src='https://placehold.co/100x100' alt='사용자 프로필'/>
					<p>닉네임영역asdasdasda</p>
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
					<h3>Title</h3>
					<p>00분전 &#10072; cate</p>
					<p>00:00:00</p>
					{/* 좋아요/댓글 */}
					<div className='reaction'>
						<p>
						<FaUser />nnn
						</p>
					</div>
				</div>

				<div className='usedInfo'>
					<p>중고상품일시 표시되는 영역으로 퍼블리싱 끝나면 데이터 받아올 자리입니다
						
						중고상품일시 표시되는 영역으로 퍼블리싱 끝나면 데이터 받아올 자리입니다
					</p>
				</div>

				<div className='bottomBtn nanumBtnCustom'>
					<button>취소하기</button>
					</div>
			</section>
		</main>
	);
}

export default NanumDetail;