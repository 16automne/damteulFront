import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import './styles/writeBtn.css';
import { FaPlus } from "react-icons/fa6";


function WriteBtn(props) {

	const [isOpen, setIsOpen] = useState(false);
	
	return (
		<>
			<div className='writeBtn'
			onClick={()=>setIsOpen(!isOpen)}>
				<FaPlus fill='#fff'/>
			</div>
			{isOpen &&(
				<div className='writeCategory'>
				<Link to='/goodstrade'>중고거래</Link>
				<Link>나눔</Link>
				<Link to='/community/write'>커뮤니티</Link>
				</div>
			)}	
		</>
	);
}

export default WriteBtn;