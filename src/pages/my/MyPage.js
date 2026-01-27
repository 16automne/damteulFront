import React from 'react';
import { Link } from 'react-router-dom';
import { GrShop } from "react-icons/gr";
import { TfiReceipt } from "react-icons/tfi";
import { ImBooks } from "react-icons/im";
import { MdOutlineInsertComment } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa";
import { IoMdHeadset } from "react-icons/io";
import { MdOutlineSettings } from "react-icons/md";
import { FaAngleRight } from "react-icons/fa6";





import './styles/myPage.css';



const MyPage = () => {
  return (
    <main>
      <section className='myPage'>
        {/* 사용자 정보영역 */}
        <div className='myPageUserWrapper'>
          <div className='myPageUser'>
            <h3>
            <img src={`${process.env.PUBLIC_URL}/images/defaultProfile.png`} alt='사용자 이미지'/>
          </h3>
          <Link to='/myprofile' title='내 프로필'>
            <div className='profileCheck'>
            <p>닉네임</p>
            <img src={`${process.env.PUBLIC_URL}/images/level02.png`} alt='사용등급'/>
            <FaAngleRight />
            </div>
          </Link>
          </div>
          
          <hr/>
          <Link to='' title='담뜰페이'>
          <div className='myWallet'>
            <p>담뜰페이</p>
            <div className='myWalletAlign'>
            <p>1,000원</p>
            <FaAngleRight />
            </div>
          </div>
          </Link>
            <button>충전</button>
            <button>송금</button>
          
          
          
        </div>
        {/* 사용자 메뉴영역 */}
        <div className='myPageGrid'>
          <div className='myPageMenu'>
            <Link to='/mypage/mybuynsell' title='판매내역'>
            <GrShop />
            <p>판매내역</p>
            </Link>
          </div>
          <div className='myPageMenu'>
            <Link to='/mypage/mybuynsell' title='구매내역'
            state={{activeTab:'buy'}}>
            <TfiReceipt />
            <p>구매내역</p>
            </Link>
          </div>
          <div className='myPageMenu'>
            <Link to='/mypage/myhistory' title='작성글'>
            <ImBooks />
            <p>작성글</p>
            </Link>
          </div>
          <div className='myPageMenu'>
            <Link to='/mypage/myhistory' title='작성댓글'
            state={{activeTab:'mycomment'}}>
            <MdOutlineInsertComment />
            <p>작성댓글</p>
            </Link>
          </div>
          <div className='myPageMenu'>
            <Link to='' title='관심목록'>
            <FaRegHeart />
            <p>관심목록</p>
            </Link>
          </div>
          <div className='myPageMenu'>
            <Link to='' title='최근 본 글'>
            <FaRegClock />
            <p>최근 본 글</p>
            </Link>
          </div>
          <div className='myPageMenu'>
            <Link to='' title='문의'>
            <IoMdHeadset />
            <p>문의</p>
            </Link>
          </div>
          <div className='myPageMenu'>
            <Link to='' title='앱 설정'>
            <MdOutlineSettings />
            <p>앱 설정</p>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default MyPage;