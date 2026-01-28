import React from 'react';
import './styles/goodsTrade.css';

function GoodsTrade(props) {
	return (
		<main>
			<form className='writeForm'>
				<p>
					<label htmlFor='categorySelect'>카테고리</label>
					<select
					id='categorySelect'
					name='categorySelect'
					className='inputForm'
					required>
						<option value=''>카테고리를 선택해주세요</option>
						<option value=''>티켓/교환권</option>
						<option value=''>의류</option>
						<option value=''>뷰티/미용</option>
						<option value=''>유아용품</option>
					</select>
				</p>
				<p>
					<label>제품명</label>
					<input type='text'
					className='inputForm'
					placeholder='제품명을 입력해주세요'
					required/>
				</p>
				<p>
					<label>대화여부</label>
					<select className='inputForm'
					required>
						<option value='대화가능'>대화가능</option>
						<option value='대화불가'>대화불가</option>
					</select>
				</p>
				<p>
					<label htmlFor=''>자세한 설명</label>
					<textarea  type='textarea'
					className='inputForm'
					placeholder='자세한 설명을 입력해주세요'
					maxLength='500'
					required>
					</textarea>
				</p>
				<label className='fileWrapper' 
				htmlFor='fileUpload'>
					<input 
					type='file'
					id='fileUpload'
					className='file'
					required/>
						<img src='https://placehold.co/30x30' alt=''/>
						n/10
				</label>
				<p>
					<label>제품 상태</label>
					<select className='inputForm'
					required>
						<option>중고제품</option>
						<option>새제품</option>
					</select>
				</p>
				{/* 제품상태 - 중고제품 선택했을 때 나오는 영역 */}
				<div className='writeForm'>
					<label className='fileWrapper fileOrange' 
					htmlFor='fileUpload'>
					<input type='file'
					id='fileUpload'
					className='file'
					required/>
						<img src='https://placehold.co/30x30' alt=''/>
						n/5
				</label>
					<p>
					<label htmlFor=''>자세한 설명</label>
					<textarea  type='textarea'
					className='inputForm'
					placeholder='자세한 설명을 입력해주세요'
					maxLength='500'
					required>
					</textarea>
					</p>
				</div>
				<p>
					<label>거래 희망 장소</label>
					{/* 주소 api들어갈 자리 */}
				</p>
				<p>
					<label>금액</label>
					<div className='tradePrice'>
					<input type='number'
					className='inputForm'
					required/>
					<span>원</span>
					</div>
				</p>

				<div className='bottomBtn'>
				<button>취소하기</button>
				<button>완료</button>
				</div>
			</form>
		</main>
	);
}

export default GoodsTrade;