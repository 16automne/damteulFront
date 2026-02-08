import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import api from 'app/api/axios';

function NanumPost(props) {

	const [form, setForm] =useState({
		title:'',
		content:''
	})
	const handleChange =(e)=>{
		const {name, value} = e.target;
		setForm({
			...form,
			[name]:value
		});
	};
	const handleSubmit= async(e)=>{
		e.preventDefault();

				// 유저 ID가져오기
		// 임의로 12번추가 추후 로그인로직 정상작동하면 삭제예정
		const storeUserId = localStorage.getItem('user_id') || 12


		const postData = {
			user_id:storeUserId,
			title:form.title,
			content:form.content,
			status:0
		};
		try{
			const response = await api.post('/api/nanum',postData);
			if(response.status === 200){
				// 나눔글 번호 추출
				const {nanum_id} = response.data;
				alert('등록 완료');
				navigate(`/nanumdetail/${nanum_id}`)
			}
		}catch(err){
			console.error(err);
		}
	};
	const navigate = useNavigate();
	return (
		<main>
			<section>
				<form className='writeForm' onSubmit={handleSubmit}>
					<p>
						<label htmlFor='title'>제목</label>
						<input type='text'
						className='inputForm'
						placeholder='제목을 입력해주세요'
						name='title'
						id='title'
						value={form.title}
						onChange={handleChange}
						required/>
					</p>
					<p>
						<label htmlFor='content'>내용</label>
						<textarea  type='textarea'
						className='inputForm'
						placeholder='내용을 입력해주세요'
						maxLength='500'
						id='content'
						name='content'
						value={form.content}
						onChange={handleChange}
						required>
						</textarea>
					</p>
					<label className='fileWrapper' 
						htmlFor='fileUpload'>
						<input type='file'
						id='fileUpload'
						className='file'
						/>
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