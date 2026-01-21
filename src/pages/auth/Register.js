import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './css/auth.css';
export default function Register(){

  const [registerForm, setRegisterForm] = useState({
    user_name: '',
    user_nikname:'',
    user_phone:''
  });

  const onRegister=(e)=>{
    const { name, value } = e.target;
    setRegisterForm((prev)=>({
      ...prev,
      [name]:value
    }));
  }

  return(
    <main>
      <form className='authForm'>
        <legend>회원가입폼</legend>
        <fieldset>
          {/* 이름 */}
          <div className="formTextWrapper">
            <label htmlFor="regUserName">이름</label>
            <input type='text' id='regUserName' name='user_name' value={registerForm.user_name} onChange={onRegister} placeholder="이름을 입력해주세요" />
          </div>

          {/* 닉네임 */}
          <div className="formTextWrapper">
            <label htmlFor="regNickName">닉네임</label>
            <input type='text' id='regNickName' name='user_nickname' value={registerForm.user_nickname} onChange={onRegister} placeholder="사용할 닉네임을 입력해주세요" />
          </div>

          {/* 전화번호 */}
          <div className="formTextWrapper">
            <label htmlFor="regUserPhone">전화번호</label>
            <input type='tel' inputMode="numeric" pattern="[0-9]*"  maxLength="11" id='regUserPhone' name='user_phone' value={registerForm.user_phone} onChange={onRegister} placeholder="'-'없이 번호만 입력해주세요" />
          </div>

          <div className="formButtonWrapper">
            <Link to='/intro' title='처음으로 돌아가기'>
              처음으로
            </Link>
            <input type="submit" value="완료" />
          </div>

        </fieldset>
      </form>
    </main>
  );
};