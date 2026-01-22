import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './css/auth.css';

// axios
import api from 'app/api/axios';

export default function Register(){
  // navigate
  const navigate = useNavigate();

  // 에러 발생시 나오게할 상태값 (phone, name, nick)
  const [phoneError,setPhoneError] = useState('');
  const [nameError, setNameError] = useState('');
  const [nickError, setNickError] = useState('');

  // 연결 실패 에러 상태값
  const [regError, setRegError] = useState('');

  // 회원가입 폼 상태값
  const [registerForm, setRegisterForm] = useState({
    user_name: '',
    user_nickname:'',
    user_phone:''
  });

  // 회원가입 폼 변환 상태값
  const onChangeRegister=(e)=>{
    const { name, value } = e.target;
    setRegisterForm((prev)=>({
      ...prev,
      [name]:value
    }));
  }

  // 전화번호 검증 함수
  const validatePhone = (phone) =>{
    if (phone.length===0){
      return '* 전화번호를 입력해주세요';
    }
    // 숫자만인지
    if (!/^\d+$/.test(phone)) {
      return '* 전화번호는 숫자만 입력해주세요.';
    }
    // 11자리인지
    if (phone.length < 10 || phone.length > 11) {
      return '* 전화번호는 10~11자리여야 합니다.';
    }
    return '';
  };

  // 이름, 닉네임 검증 함수
  const validateText = (text,label) =>{
    const v = text.trim();
    if (v.length===0) return `* ${label}을 입력해주세요`;

    // 한글만
    const koreanRegex = /^[가-힣]+$/;
    // 영어만
    const englishRegex = /^[A-Za-z]+$/;

    // 한글 이름
    if (koreanRegex.test(v)) {
      if (v.length > 25) return '* 한글은 최대 25자까지 입력 가능합니다';
      return '';
    }

    // 영어 이름
    if (englishRegex.test(v)) {
      if (v.length > 50) return '* 영어은 최대 50자까지 입력 가능합니다';
      return '';
    }
    return `* ${label}은 한글만 또는 영어만 입력 가능합니다 (혼합 불가)`;
  }
  
  // 회원가입 눌렀을때
  const onSubmitRegister=async(e)=>{
    e.preventDefault();

    // 유효성및 작성 검사
    const phoneErr = validatePhone(registerForm.user_phone);
    const nameErr  = validateText(registerForm.user_name, '이름');
    const nickErr  = validateText(registerForm.user_nickname, '닉네임');
    setPhoneError(phoneErr);
    setNameError(nameErr);
    setNickError(nickErr);

    // 하나라도 있으면
    if (phoneErr||nameErr||nickErr){
      return;
    }

    try{
      const { data } = await api.post('/api/user/register', registerForm);

      if (data?.ok) {
        // 성공 처리
        navigate('/login');
      }
    }catch(err){
      // 서버 통신 자체가 실패
      if(!err.response){
        setRegError('* 서버 통신에 실패했습니다. 잠시 후 다시 시도해주세요');
        return;
      }
      const { status, data } = err.response;
      
      // DB에 중복 데이터가 있을경우
      if (status === 409) {
        // 전화번호 중복
        if(data?.code === 'DUPLICATE_PHONE'){
          setPhoneError('* 이미 사용 중인 전화번호 입니다.');
          return;
        }
        // 닉네임 중복
        if (data?.code === 'DUPLICATE_NICKNAME'){
          setNickError('* 이미 사용 중인 닉네임 입니다.');
          return;
        }
        // 기타 중복(최종 방어선 느낌)
        setNickError('* 이미 사용 중인 값이 있습니다.');
        return;
      }
      // 그 외 서버 오류
      setPhoneError('* 서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요');
    }
  }
  
  return(
    <main>
      <form className='authForm' onSubmit={onSubmitRegister}>
        <legend>회원가입폼</legend>
        <fieldset>
          {/* 이름 */}
          <div className="formTextWrapper">
            <label htmlFor="regUserName">이름</label>
            <input type='text' id='regUserName' name='user_name' value={registerForm.user_name} onChange={onChangeRegister} placeholder="이름을 입력해주세요" maxLength='50' />
            {nameError&&(<p className='errMassage'>{nameError}</p>)}
          </div>

          {/* 닉네임 */}
          <div className="formTextWrapper">
            <label htmlFor="regNickName">닉네임</label>
            <input type='text' id='regNickName' name='user_nickname' value={registerForm.user_nickname} onChange={onChangeRegister} placeholder="사용할 닉네임을 입력해주세요" maxLength='50' />
            {nickError&&(<p className='errMassage'>{nickError}</p>)}
          </div>

          {/* 전화번호 */}
          <div className="formTextWrapper">
            <label htmlFor="regUserPhone">전화번호</label>
            <input type='tel' inputMode="numeric" maxLength="11" id='regUserPhone' name='user_phone' value={registerForm.user_phone} onChange={onChangeRegister} placeholder="'-'없이 번호만 입력해주세요" />
            {phoneError&&(<p className='errMassage'>{phoneError}</p>)}
          </div>
          {regError&&<p className='errMassage' style={{textAlign:'center'}}>{regError}</p>}

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