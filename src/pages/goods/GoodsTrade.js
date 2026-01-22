import React from 'react';
import './styles/goodsTrade.scss';

function GoodsTrade(props) {
	return (
		<main>
			<section>
				<form className='writeForm'>
					<p>
						<label htmlFor='categorySelect'>카테고리</label>
						<select
						id='categorySelect'
						name='categorySelect'>
							<option value=''>카테고리를 선택해주세요</option>
							<option value=''>티켓/교환권</option>
							<option value=''>의류</option>
							<option value=''>뷰티/미용</option>
							<option value=''>유아용품</option>
						</select>
					</p>
					<p>
						<label>제품명</label>
						<input type='text'/>
					</p>
					<p>
						<label>대화여부</label>
						<select>
							<option value='대화가능'>대화가능</option>
							<option value='대화불가'>대화불가</option>
						</select>
					</p>
					<p>
						<label>자세한 설명</label>
						<input type='textarea'/>
					</p>
					<div className='fileWrapper'>
						<input 
						type='file'
						id='fileUpload'
						className='file'/>
							<img src='https://placehold.co/30x30' alt=''/>
						<label 
						htmlFor='fileUpload'
						className='uploadBtn'>
							n/10</label>
					</div>
					<p>
						<label>제품 상태</label>
						<select>
							<option>중고제품</option>
							<option>새제품</option>
						</select>
					</p>
					{/* 제품상태 - 중고제품 선택했을 때 나오는 영역 */}
					<div>
						<input type='file'/>
						<p>
						<label>자세한 설명</label>
						<input type='textarea'/>
						</p>
					</div>
					<p>
						<label>거래 희망 장소</label>
						{/* 주소 api들어갈 자리 */}
					</p>
					<p>
						<label>금액</label>
						<input type='number'/>원
					</p>

				</form>
			</section>
		</main>
	);
}

export default GoodsTrade;