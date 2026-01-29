import React from 'react';
import { useNavigate } from 'react-router-dom';

function NanumPost(props) {
	const navigate = useNavigate();
	return (
		<main>
			<section>
				<form className='writeForm'>
					<p>
						<label>제목</label>
						<input type='text'
						className='inputForm'
						placeholder='제목을 입력해주세요'
						required/>
					</p>
					<p>
						<label htmlFor=''>내용</label>
						<textarea  type='textarea'
						className='inputForm'
						placeholder='내용을 입력해주세요'
						maxLength='500'
						required>
						</textarea>
					</p>
					<label className='fileWrapper' 
						htmlFor='fileUpload'>
						<input type='file'
						id='fileUpload'
						className='file'
						required/>
							<img src='https://placehold.co/30x30' alt='선택한 이미지'/>
							n/10
					</label>
					<p style={{color:'6B6B6B',fontSize:'14px'}}>&middot;게시한 시점으로부터 12시간동안 응모가 진행됩니다.</p>
					<div className='bottomBtn'>
					<button onClick={()=>navigate(-1)}>취소하기</button>
					<button type='submit'>완료</button>
					</div>
					</form>
			</section>
		</main>
	);
}

export default NanumPost;