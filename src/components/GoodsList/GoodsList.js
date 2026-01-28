import React from 'react';
import { Link } from 'react-router-dom';
// CSS 서식
import './style/goodsList.css';
import { FaRegComment } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";
import { FaRegCalendarCheck } from "react-icons/fa6";




function GoodsList({linkTo, title, status, price,timer, soldout }) {
	return (
		<div>
			<Link 
			to={linkTo}
			className='goodsList'>
							{/* 상품이미지 영역 */}
							<img src='https://placehold.co/130x130' alt='product'/>
							<div className='goodsListArea'>
								{/* 텍스트 영역 */}
								<div className='goodsListInfo'>
								{/* MyBuynSell에서 sold out 시 h3서식 */}
								<h3
								style={soldout?
								{textDecoration:'line-through',
								color:'#6B6B6B'
								}:{}}>{title}</h3>
								<span>{status}</span>
								{/* sold out에선 price원이 아닌 '거래완료'텍스트 배치 */}
								{price&&<p>{price}원</p>}
								{soldout && <p
								style={{fontSize:'18px',
												fontWeight:'bold',
								}}>거래완료</p>}
								{/* 나눔페이지에서 나올 영역 */}
								{timer&&<p>
								<FaRegCalendarCheck />
								{timer}</p>}
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