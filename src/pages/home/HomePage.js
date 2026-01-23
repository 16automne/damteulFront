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
	const loginMessageStyle={
		position:'fixed',
		bottom:'150px',
		left:'50%',
		transform:'translateX(-50%)',
		background: 'rgb(26, 28, 25)',
		padding: '5px 10px',
		borderRadius: '30px',
		fontSize: '12px',
		color: '#fff'
	};

	useEffect(()=>{
		if(location.state?.showWelcome){
			setLoginSuccess(true);

			const timer = setTimeout(()=>{
				setLoginSuccess(false);
			},2000);

			return () => clearTimeout(timer);
		}
	},[location.state?.showWelcome]);


	return (
		<main>
			{loginSuccess && <p style={loginMessageStyle}>로그인 성공</p>}

			<section>
					<div className='btnContainer'>
						<button className='btnActive'>전체</button>
						<button>최신글</button>
					</div>
          {/* 상품목록 (map필요)*/}
          <GoodsList />
						
						
						{/* 글쓰기 버튼 */}
            <WriteBtn />
						
			</section>
		</main>
	);
};

export default HomePage;