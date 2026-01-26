import React from 'react';
import './styles/myProfileEdit.css';
import { useNavigate } from 'react-router-dom';

function MyProfileEdit(props) {
	const navigate = useNavigate();
	const handleSubmit = (e) =>{
		e.preventDefault();
		navigate(-1);
	}
	return (
		<main>
			<form className='myProfileEdit'
			onSubmit={handleSubmit}>
				<div className='editUser'>
					<img src={`${process.env.PUBLIC_URL}/images/defaultProfile.png`} alt='내 프로필'/>
					<label htmlFor='editProfile'
					className='fileWrapper'>
					<img src='https://placehold.co/30x30' alt='변경할 프로필 선택하기'/>
					<input type='file'
					id='editProfile'
					className='file'/>
					</label>
				</div>
				<p>
					<label htmlFor='username' className='userName'>닉네임</label>
					<input type='text'
					placeholder='사용할 닉네임을 입력해주세요'
					id='username'
					className='inputForm'
					required/>
				</p>
				
				{/* 동네 범위 재설정 보류 */}
				<hr style={{
					margin:'20px 0',
					marginLeft:'calc(-50vw + 50%)',
					width:'100vw',
					border:'none',
					borderTop:'1px solid #D7D7D7'
				}}></hr>

				{/* 사용자 정보표시영역 */}
				<div className='checkProfile myContainer'>
					<dl>
						<div className='checkProfileItem'>
						<dt>이름</dt>
						<dd>김담뜰</dd>
						</div>
						<div className='checkProfileItem'>
						<dt>전화번호</dt>
						<dd>010-1234-5678</dd>
						</div>
						<div className='checkProfileItem'>
						<dt>내 동네</dt>
						<dd>서울시 종로구</dd>
						</div>
					</dl>
				</div>
				<button type='submit'>변경 완료</button>
			</form>
		</main>
	);
}

export default MyProfileEdit;