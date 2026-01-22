import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
// CSS 서식
import './style/goodsList.scss';

function GoodsList(props) {
	return (
		<div>
			<Link className='goodsList'>
							{/* 상품이미지 영역 */}
							<img src='https://placehold.co/130x130' alt='product'/>
							<div className='goodsArea'>
								{/* 텍스트 영역 */}
								<div className='goodsInfo'>
								<h3>Title</h3>
								<span>cate | 새제품</span>
								<p>00,000</p>
								</div>
								{/* 좋아요 / 댓글 */}
								<div className='goodsReaction'>
									<p><FontAwesomeIcon icon={faComment}/>n</p>
									<p><FontAwesomeIcon icon={faHeart}/>n</p>
								</div>
							</div>
						</Link>
		</div>
	);
}

export default GoodsList;