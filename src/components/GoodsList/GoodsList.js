import React from 'react';
import { Link } from 'react-router-dom';
// CSS 서식
import './style/goodsList.css';
import { FaRegComment } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";



function GoodsList(props) {
	return (
		<div>
			<Link 
			to='/goodsdetail'
			className='goodsList'>
							{/* 상품이미지 영역 */}
							<img src='https://placehold.co/130x130' alt='product'/>
							<div className='goodsListArea'>
								{/* 텍스트 영역 */}
								<div className='goodsListInfo'>
								<h3>Title</h3>
								<span>cate | 새제품</span>
								<p>00,000</p>
								</div>
								{/* 좋아요 / 댓글 */}
								<div className='goodsReaction'>
									<p><FaRegComment /><span>n</span></p>
									<p><FaRegHeart /><span>n</span></p>
								</div>
							</div>
						</Link>
		</div>
	);
}

export default GoodsList;