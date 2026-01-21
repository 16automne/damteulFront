import React, { useState } from "react";
import { Link } from "react-router-dom"
export default function Login(){

  // 로그인 상택값
  const [loginForm, setLoginForm] = useState({
    user_name:'',
    user_phone:''
  });

  // input value값 업데이트
  const onLogin = (e) =>{
    const {name,value} = e.target;
    setLoginForm((prev)=>({
      ...prev,
      [name]:value
    }));
  };
  
  return(
    <>
      {/* 로그인 입력란 */}
      <form>
        <caption>로그인폼</caption>
        <fieldset>
          {/* 이름 */}
          <div>
            <label htmlFor="loginUserName">이름</label>
            <input type='text' id='loginUserName' name='user_name' value={loginForm.user_name} onChange={onLogin} />
          </div>

          {/* 전화번호 */}
          <div>
            <label htmlFor="loginUserPhone">전화번호</label>
            <input type='tel' inputMode="numeric" pattern="[0-9]*"  maxlength="11" id='loginUserPhone' name='user_phone' value={loginForm.user_phone} onChange={onLogin} />
          </div>

          <div>
            <Link to='/intro' title='처음으로 돌아가기'>
              처음으로
            </Link>
            <input type="submit" value="시작하기" />
          </div>
        </fieldset>
      </form>
    </>
  );
};