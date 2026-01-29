import React from 'react';
import './styles/deleteAccount.css';

function DeleteAccount(props) {
	return (
		<main>
			<form className='DeleteAccount'>
				<p>안전한 탈퇴를 위해 본인 확인이 필요합니다</p>
				<p>
					<label>이름</label>
					<input type='text'
					placeholder='이름을 입력해주세요'
					required/>
				</p>
				<p>
					<label>전화번호</label>
					<input type='number'
					placeholder="'~'없이 번호만 입력해주세요"
					required/>
				</p>
				<p>
					<label>탈퇴사유</label>
					<select>
						<option value=''></option>
						<option value=''></option>
						<option value=''></option>
						<option value=''></option>
						<option value=''></option>
					</select>
				</p>
			</form>
		</main>
	);
}

export default DeleteAccount;