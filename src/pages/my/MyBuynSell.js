import React from 'react';
import './styles/myBuynSell.css';
import GoodsList from 'components/GoodsList/GoodsList';
import { Link, useParams } from 'react-router-dom';
function MyBuynSell(props) {
	
	const {type} = useParams();
	return (
		<main>
			<section>
				<ul className='myTabMenu'>
					<li className={type === 'selling'?'active':''}>
						<Link to='/buynsell/selling' title='판매중인 상품'>판매중</Link>
					</li>
					<li className={type === 'buy'?'active':''}>
						<Link to='/buynsell/buy' title='구매한 상품'>구매</Link>
					</li>
					<li className={type === 'soldout'?'active':''}>
						<Link to='/buynsell/soldout' title='판매완료'>거래 완료</Link>
					</li>
					
				</ul>
				<GoodsList type={type}/>
			</section>
		</main>
	);
}

export default MyBuynSell;