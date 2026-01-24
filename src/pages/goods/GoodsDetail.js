import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import './styles/goodsDetail.css';
// 더보기버튼
import { IoIosMore } from "react-icons/io";
// 좋아요
import { FaRegHeart } from "react-icons/fa";
// 댓글
import { FaRegComment } from "react-icons/fa";




function GoodsDetail(props) {

	// 더보기버튼 상태변수
	const [isOpen, setIsOpen] = useState(false);

	return (
		<main>
			<section className='goodsDetail'>

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
					<p>00,000원</p>
					{/* 좋아요/댓글 */}
					<div className='reaction'>
						<p>
						<FaRegHeart /><span>nnn</span>
						</p>
						<p>
							<FaRegComment /><span>nnn</span>
						</p>
					</div>
					<button className='favorite'>
					<FaRegHeart />
					</button>
				</div>
					<p>새제품 정보</p>
				{/* 중고상품일시 표시될 영역 */}
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

				{/* 관련상품 표시영역 */}
				<div className='relevance'>
				<h3>관련상품</h3>
				{/* 상품 이미지/정보표시영역 */}
				<div className='relevanceGrid'>
					<div className='relevanceItem'>
						<img src='https://placehold.co/390x430' alt='제품상세이미지'/>
						<h3>Title</h3>
						<p>txttxt원</p>
					</div>
					<div className='relevanceItem'>
						<img src='https://placehold.co/390x430' alt='제품상세이미지'/>
						<h3>Title</h3>
						<p>txttxt원</p>
					</div>
					<div className='relevanceItem'>
						<img src='https://placehold.co/390x430' alt='제품상세이미지'/>
						<h3>Title</h3>
						<p>txttxt원</p>
					</div>
					

				</div>
				</div>
			</section>
		</main>
	);
}

export default GoodsDetail;