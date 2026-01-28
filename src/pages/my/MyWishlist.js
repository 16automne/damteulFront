import React, {useState} from 'react';
import { useLocation } from 'react-router-dom';
import './styles/myWishlist.css';
import GoodsList from 'components/GoodsList/GoodsList';

function MyWishlist(props) {
	const location =useLocation();
	const [type, setType] = useState(location.state?.activeTab ||'wishlist');
	const [toggle, setToggle] = useState('community');


	return (
		<main>
			<section className='myWishlist'>
				<ul className='tabMenu'>
					<li className={type === 'wishlist'?'active':''}
					onClick={()=>setType('wishlist')}>관심 목록</li>
					<li className={type === 'recent'?'active':''}
					onClick={()=>setType('recent')}>최근 본 글</li>
				</ul>
				{type === 'wishlist' &&
					<div className='btnContainer'>
					<button className={toggle === 'community'?'btnActive':''}
					onClick={()=>setToggle('community')}>커뮤니티</button>
					<button className={toggle === 'usedgoods'?'btnActive':''}
					onClick={()=>setToggle('usedgoods')}>중고장터</button>
					</div>
				}
				
				<GoodsList />
				<GoodsList />
				<GoodsList />
			</section>
		</main>
	);
}

export default MyWishlist;