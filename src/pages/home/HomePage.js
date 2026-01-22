import React from 'react';
import './styles/main.scss';
// 글쓰기버튼
import WriteBtn from 'components/writeBtn/WriteBtn';
// 상품목록
import GoodsList from 'components/GoodsList/GoodsList';


const HomePage = () => {	
	
	return (
		<main>
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