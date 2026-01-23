import React, { useEffect, useState } from 'react';
import './styles/main.css';
// 글쓰기버튼
import WriteBtn from 'components/writeBtn/WriteBtn';
// 상품목록
import GoodsList from 'components/GoodsList/GoodsList';
import { useLocation, useNavigate } from 'react-router-dom';


const HomePage = () => {
	// 주소에 같이 오는 state값 가져오기 위한 location
	const location = useLocation();

	const navigate = useNavigate();

	// 로그인,회원가입에서 home 방문시 로그인완료 뜨게하기
	const [loginSuccess, setLoginSuccess] = useState(false);

	// 천천히 사라지게
	const [fadeOut, setFadeOut] = useState(false);

	useEffect(()=>{
		if(location.state?.showWelcome){
			setLoginSuccess(true);
			setFadeOut(false);

			// 2초후 -> 서서히 사라지기 시작
			const fadeTimer = setTimeout(()=>{
				setFadeOut(true);
			},2000)

			const removeTimer = setTimeout(()=>{
				setLoginSuccess(false);
			},2500);

			// 타이머 지우기
			return () => {
				clearTimeout(fadeTimer);
				clearTimeout(removeTimer);
			};
		}
	},[location.state?.showWelcome]);


	return (
		<main>
			{/* 로그인 성공시 나오는 메시지 */}
			{loginSuccess && (
				<p className={`loginMessage ${fadeOut ? 'fadeOut' : ''}`}>
					로그인 성공
				</p>
			)}

			<section>
					<div className='btnContainer'>
						<button className='btnActive'>전체</button>
						<button>최신글</button>
					</div>
          {/* 상품목록 (map필요)*/}
          <GoodsList />
          <GoodsList />
          <GoodsList />


						
						
						{/* 글쓰기 버튼 */}
            <WriteBtn />
						
			</section>
		</main>
	);
};

export default HomePage;