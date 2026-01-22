import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import './styles/writeBtn.css';

function WriteBtn(props) {

	const [isOpen, setIsOpen] = useState(false);
	
	return (
		<>
			<div className='writeBtn'
			onClick={()=>setIsOpen(!isOpen)}>
				<FontAwesomeIcon icon={faPlus} className='plusIcon'/>
			</div>
			{isOpen &&(
				<div className='writeCategory'>
				<Link to='/goodstrade'>중고거래</Link>
				<Link>나눔</Link>
				<Link>커뮤니티</Link>
				</div>
			)}	
		</>
	);
}

export default WriteBtn;