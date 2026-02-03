import React, {useState} from 'react';
import './styles/goodsTrade.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// 서버에 전송할 함수
const createPost = async(formData, file) =>{
	// 로그인 들어오면 주석풀기
	// const token = localStorage.getItem('userToken');
	// 이미지는 file로 따로 전송
	const data = new FormData();

	// 일반 텍스트 데이터 추가
	Object.keys(formData).forEach(key =>{
		data.append(key, formData[key]);
	});

	// 이미지 파일 데이터 추가
	if(file && file.length>0){
		file.forEach(f =>{
			data.append('fileUpload',f);
		})
	}
	const response = await axios.post('http://localhost:9070/api/goods',data,{
		headers:{'Content-Type':'multipart/form-data'}
	});
	return response.data;

}

function GoodsTrade(props) {
	const navigate = useNavigate();
	const [file,setFile] = useState([]);

	// 폼 입력값 상태변수 생성
	const [formData, setFormData] = useState({
		user_id:'5',
		category_id:'',
		title:'',
		conversation_type:'0',
		content:'',
		condition_type:'0',
		defect_note:'',
		price:'',
		status:'0',
	})

	// 입력값 맞춰서 상태 업데이트
	const handleChange = (e) =>{
		const {name, value} = e.target;
		setFormData({
			...formData,
			[name]:value
		});
	}

	// 이미지 선택 함수
	const handleFileChange = (e) =>{
		setFile(Array.from(e.target.files))
	};

	// 폼 제출 시 실행될 함수
	const handleSubmit = async(e)=>{
		e.preventDefault();

		// 유저 ID가져오기
		// 임의로 12번추가 추후 로그인로직 정상작동하면 삭제예정
		const storeUserId = localStorage.getItem('user_id') || 12
		try{
			// API 전송(JSON형태로)
			const result = await createPost({
				...formData,
				user_id:storeUserId //ID 전송
			}, file);
			alert('글이 정상적으로 등록되었습니다.');
			navigate(`/goodsdetail/${result.id}`);// 성공 시 상세 페이지로
		}catch(error){
			alert('등록에 실패했습니다.');
		}
	};
	return (
		<main>
			<form className='writeForm'
			onSubmit={handleSubmit}>
				<p>
					<label htmlFor='category_id'>카테고리</label>
					<select
					className='inputForm'
					id='category_id'
					name='category_id'
					value={formData.category_id}
					onChange={handleChange}
					required>
						<option value=''>카테고리를 선택해주세요</option>
						<option value='1'>티켓/교환권</option>
						<option value='2'>의류</option>
						<option value='3'>뷰티/미용</option>
						<option value='4'>유아용품</option>
					</select>
				</p>
				<p>
					<label htmlFor='title'>제품명</label>
					<input type='text'
					className='inputForm'
					placeholder='제품명을 입력해주세요'
					name='title'
					id='title'
					value={formData.title}
					onChange={handleChange}
					required/>
				</p>
				<p>
					<label htmlFor='conversation_type'>대화여부</label>
					<select className='inputForm'
					id='conversation_type'
					name='conversation_type'
					value={formData.conversation_type}
					onChange={handleChange}
					required>
						<option value='0'>대화불가</option>
						<option value='1'>대화가능</option>
					</select>
				</p>
				<p>
					<label htmlFor='content'>자세한 설명</label>
					<textarea  type='textarea'
					id='content'
					name='content'
					className='inputForm'
					placeholder='자세한 설명을 입력해주세요'
					maxLength='500'
					value={formData.content}
					onChange={handleChange}
					>
					</textarea>
				</p>
				<label className='fileWrapper' 
				htmlFor='fileUpload'>
					<input 
					type='file'
					id='fileUpload'
					name='fileUpload'
					onChange={handleFileChange}
					className='file'
					multiple
					/>
						<img src='https://placehold.co/30x30' alt=''/>
						n/10
				</label>
				<p>
					<label htmlFor='condition_type'>제품 상태</label>
					<select className='inputForm'
					name='condition_type'
					id='condition_type'
					onChange={handleChange}
					required>
						<option value='0'>중고제품</option>
						<option value='1'>새상품</option>
					</select>
				</p>
				{/* 제품상태 - 중고제품 선택했을 때 나오는 영역 */}
				<div className='writeForm'>
					{/* <label className='fileWrapper fileOrange' 
					htmlFor='fileUpload'>
					<input type='file'
					id='fileUpload'
					className='file'
					required/>
						<img src='https://placehold.co/30x30' alt=''/>
						n/5
				</label> */}
					<p>
					<label htmlFor='defect_note'>자세한 설명</label>
					<textarea  type='textarea'
					className='inputForm'
					name='defect_note'
					id='defect_note'
					value={formData.defect_note}
					onChange={handleChange}
					placeholder='자세한 설명을 입력해주세요'
					maxLength='500'
					>
					</textarea>
					</p>
				</div>
				<p>
					<label>거래 희망 장소</label>
					{/* 주소 api들어갈 자리 */}
				</p>
				<p>
					<label htmlFor='price'>금액</label>
					<div className='tradePrice'>
					<input type='number'
					className='inputForm'
					id='price'
					name='price'
					value={formData.price}
					onChange={handleChange}
					required/>
					<span>원</span>
					</div>
				</p>

				<div className='bottomBtn'>
				<button onClick={()=>navigate(-1)}>취소하기</button>
				<button type='submit'>완료</button>
				</div>
			</form>
		</main>
	);
}

export default GoodsTrade;