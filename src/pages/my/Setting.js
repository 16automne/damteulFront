import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

// 내부서식은 supportList에서 가져옴
function Setting(props) {
	const [searchParams, setSearchParams] = useSearchParams();
	const navigate = useNavigate();

	// 현재 URL에서 menu가져오기
	const currentMenu = searchParams.get('menu') || 'main';


	return (
		<main>
			<section className='supportList'>
				<ul>
					{currentMenu === 'main' &&(
						<>
					<li
					onClick={()=>setSearchParams({menu:'alarm'})}>
						<hr/>
						<div className='question'>
							<span>알림 설정</span>
								<FaAngleRight />
						</div>
						<hr/>
					</li>
					<li
					onClick={()=>setSearchParams({menu:'other'})}>
						<hr/>
						<div className='question'>
							<span>기타 설정</span>
								<FaAngleRight />
						</div>
						<hr/>
					</li>
					</>
					)}

					{/* 알림 설정 클릭 시 로딩될 구간 */}
					{currentMenu === 'alarm' &&(
						<>
					<li>
						<hr/>
						<div className='question'>
							<p>캐시 데이터 삭제</p>
						</div>
						<hr/>
					</li>
					<li>
						<hr/>
						<div className='question'>
							<p>최신버전 업데이트</p>
						</div>
						<hr/>
					</li>
					<li>
						<hr/>
						<div className='question'>
							<p>로그아웃</p>
						</div>
						<hr/>
					</li>
					<li>
						<hr/>
						<div className='question'>
							<p>탈퇴하기</p>
						</div>
						<hr/>
					</li>
					</>
					)}
					{/* 기타 설정 클릭 시 로딩될 구간 */}
					{currentMenu === 'other' &&(
					<>
					<li>
						<hr/>
						<div className='question'>
							<p>캐시 데이터 삭제</p>
						</div>
						<hr/>
					</li>
					<li>
						<hr/>
						<div className='question'>
							<div className='setting'>
							<p>최신버전 업데이트</p>
							<p>최신버전 0.2.2</p>
							</div>
							<div className='setting'>
							<span>0.1.8</span>
							</div>
						</div>
						<hr/>
					</li>
					<li>
						<hr/>
						<div className='question'>
							<p>로그아웃</p>
						</div>
						<hr/>
					</li>
					<li>
						<hr/>
						<div className='question'>
							<p>탈퇴하기</p>
						</div>
						<hr/>
					</li>
					</>
					)}
					
				</ul>
				{/* 뒤로가기 버튼 */}
				{currentMenu !== 'main' &&(
					<div
					style={{
						width:'35px',height:'35px',
						background:'#F2F5F2',
						position:'fixed',
						zIndex:'99999',
						top:'1%',left:'1rem'
					}}>
						<FaAngleLeft
						onClick={()=>navigate(-1)}
						style={{
						fontSize:'1.5rem',
						}}/>
					</div>
					
				)}
			</section>
		</main>
	);
}

export default Setting;