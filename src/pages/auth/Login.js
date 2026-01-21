import React, { useState } from "react";
import { Link } from "react-router-dom"
import './css/auth.css';
export default function Login() {

  // 로그인 상택값
  const [loginForm, setLoginForm] = useState({
    user_name: '',
    user_phone: '',
  });

  // input value값 업데이트
  const onLogin = (e) => {
    const { name, value } = e.target;
    setLoginForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <main>
      {/* 로그인 입력란 */}
      <form className="authForm">
        <legend>로그인폼</legend>
        <fieldset>
          {/* 이름 */}
          <div className="formTextWrapper">
            <label htmlFor="loginUserName">이름</label>
            <input type='text' id='loginUserName' name='user_name' value={loginForm.user_name} onChange={onLogin} placeholder="이름을 입력해주세요" />
          </div>

          {/* 전화번호 */}
          <div className="formTextWrapper">
            <label htmlFor="loginUserPhone">전화번호</label>
            <input type='tel' inputMode="numeric" pattern="[0-9]*" maxLength="11" id='loginUserPhone' name='user_phone' value={loginForm.user_phone} onChange={onLogin} placeholder="'-'없이 번호만 입력해주세요" />
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