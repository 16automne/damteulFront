import React from 'react';
import './styles/myProfile.css';
import { CiCircleInfo } from "react-icons/ci";
import { Link } from 'react-router-dom';


function MyProfile(props) {
	// 더미데이터 추후삭제예정
	const dummyData = [
  { id: 1, name: '빈티지 체어', price: '35,000원', img: 'https://placehold.co/600x400' },
  { id: 2, name: '중고 게이밍 키보드', price: '42,000원', img: 'https://placehold.co/600x400' },
  { id: 3, name: '감성 캠핑 랜턴', price: '18,500원', img: 'https://placehold.co/600x400' },
  { id: 4, name: '미개봉 무선 이어폰', price: '89,000원', img: 'https://placehold.co/600x400' },
  { id: 5, name: '원목 독서대', price: '12,000원', img: 'https://placehold.co/600x400' },
  { id: 6, name: '스마트 워치 스트랩', price: '5,500원', img: 'https://placehold.co/600x400' },
	];

	return (
		<main>
			<section className='myProfile'>
				<div className='myProfileCheck myContainer'>
					<h3>
            <img src={`${process.env.PUBLIC_URL}/images/defaultProfile.png`} alt='사용자 이미지'/>
          </h3>
					<div className='myProfileCheckAlign'>
            <p>닉네임</p>
            <img src={`${process.env.PUBLIC_URL}/images/level02.png`} alt='사용등급'/>
					</div>
					<p>0000년00월 00일 가입</p>
					<Link to='/myprofileedit' title='프로필 수정페이지로 이동'
					>프로필 수정</Link>
				</div>
				{/* 유저 사용등급 영역 */}
				<div className='myUserClass myContainer'>
					{/* 말풍선 영역 */}
					<div></div>
					<CiCircleInfo />
					<img src={`${process.env.PUBLIC_URL}/images/level02.png`} alt='사용자 이미지'/>
					<p>ㅇㅇㅇ님은 <span>준비된 이웃</span> 입니다</p>
				</div>
				{/* 판매물품 영역 */}
				<div className='myContainer mySell'>
					<h3>판매물품</h3>
					<div className='mySwipeContainer'>
						{dummyData.map((item)=>(
							<div className='mySwipeItem'
							key={item.id}>
							<img src={item.img} alt={item.name}/>
							<p>{item.name}</p>
							<p>{item.price}</p>
						</div>
						))}
						
					</div>
				</div>
				<div className='userReviewWrapper'>
					<h3>거래후기</h3>
					{/* CLASS userReview MAP */}
					<div className='userReview'>
						<img src='https://placehold.co/600x400' alt='리뷰어 이미지'/>
						<div className='userReviewContent'>
							<h4>유저네임</h4>
							<span>구매자</span>
							<p>온라인 티켓구매가 처음이었는데. 자세히 설명해주셔서 감사했어요.</p>
						</div>
					</div>
					<div className='userReview'>
						<img src='https://placehold.co/600x400' alt='리뷰어 이미지'/>
						<div className='userReviewContent'>
							<h4>유저네임</h4>
							<span>구매자</span>
							<p>온라인 티켓구매가 처음이었는데. 자세히 설명해주셔서 감사했어요.</p>
						</div>
					</div>
				</div>
			</section>
		</main>
	);
}

export default MyProfile;