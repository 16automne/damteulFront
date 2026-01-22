import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './css/auth.css';
import api from 'app/api/axios';

export default function Register() {
  const navigate = useNavigate();

  // 에러를 개별 상태가 아닌 하나의 객체로 관리하여 동시 업데이트 용이하게 처리
  const [errors, setErrors] = useState({
    user_name: '',
    user_nickname: '',
    user_phone: '',
    server: ''
  });

  const [registerForm, setRegisterForm] = useState({
    user_name: '',
    user_nickname: '',
    user_phone: ''
  });

  const onChangeRegister = (e) => {
    const { name, value } = e.target;
    setRegisterForm(prev => ({ ...prev, [name]: value }));
    // 입력 시 해당 필드의 에러 메세지 초기화
    setErrors(prev => ({ ...prev, [name]: '', server: '' }));
  };

  // 공통 텍스트 검증 (이름, 닉네임)
  const validateText = (text, label) => {
    const v = text.trim();
    if (v.length === 0) return `* ${label}을 입력해주세요.`;
    if (/\s/.test(text)) return `* ${label}에 공백(띄어쓰기)을 포함할 수 없습니다.`;

    const koreanRegex = /^[가-힣]+$/;
    const englishRegex = /^[A-Za-z]+$/;

    if (koreanRegex.test(v)) {
      if (v.length > 25) return '* 한글은 최대 25자까지 가능합니다.';
      return '';
    }
    if (englishRegex.test(v)) {
      if (v.length > 50) return '* 영어는 최대 50자까지 가능합니다.';
      return '';
    }
    return `* ${label}은 한글 또는 영어만 입력 가능합니다 (혼합 불가).`;
  };

  const validatePhone = (phone) => {
    if (phone.length === 0) return '* 전화번호를 입력해주세요.';
    if (/\s/.test(phone)) return '* 전화번호에 공백을 포함할 수 없습니다.';
    if (!/^\d+$/.test(phone)) return '* 숫자만 입력해주세요.';
    if (phone.length < 10 || phone.length > 11) return '* 10~11자리여야 합니다.';
    return '';
  };

  const onSubmitRegister = async (e) => {
    e.preventDefault();

    // 1. 프론트엔드 1차 유효성 검사
    const newErrors = {
      user_name: validateText(registerForm.user_name, '이름'),
      user_nickname: validateText(registerForm.user_nickname, '닉네임'),
      user_phone: validatePhone(registerForm.user_phone, '전화번호'),
      server: ''
    };

    setErrors(newErrors);

    // 프론트 에러가 있으면 중단 (필요하다면 이 부분을 주석 처리하여 서버로 강제 전송 가능)
    if (newErrors.user_name || newErrors.user_nickname || newErrors.user_phone) return;

    try {
      const { data } = await api.post('/api/user/register', registerForm);
      if (data?.ok) navigate('/login');
    } catch (err) {
      if (!err.response) {
        setErrors(prev => ({ ...prev, server: '* 서버와 통신할 수 없습니다.' }));
        return;
      }

      const { status, data } = err.response;
      // 2. 서버에서 온 다중 에러 처리 (중복 등)
      if ((status === 409 || status === 400) && data.errors) {
        setErrors(prev => ({
          ...prev,
          ...data.errors // 서버에서 온 에러들을 기존 에러 객체에 덮어씌움
        }));
      } else {
        setErrors(prev => ({ ...prev, server: '* 알 수 없는 오류가 발생했습니다.' }));
      }
    }
  };

  return (
    <main>
      <form className='authForm' onSubmit={onSubmitRegister}>
        <legend>회원가입폼</legend>
        <fieldset>
          <div className="formTextWrapper">
            <label htmlFor="regUserName">이름</label>
            <input type='text' id='regUserName' name='user_name' onChange={onChangeRegister} value={registerForm.user_name} />
            {errors.user_name && <p className='errMassage'>{errors.user_name}</p>}
          </div>

          <div className="formTextWrapper">
            <label htmlFor="regNickName">닉네임</label>
            <input type='text' id='regNickName' name='user_nickname' onChange={onChangeRegister} value={registerForm.user_nickname} />
            {errors.user_nickname && <p className='errMassage'>{errors.user_nickname}</p>}
          </div>

          <div className="formTextWrapper">
            <label htmlFor="regUserPhone">전화번호</label>
            <input type='tel' id='regUserPhone' name='user_phone' onChange={onChangeRegister} value={registerForm.user_phone} />
            {errors.user_phone && <p className='errMassage'>{errors.user_phone}</p>}
          </div>

          {errors.server && <p className='errMassage' style={{ textAlign: 'center' }}>{errors.server}</p>}

          <div className="formButtonWrapper">
            <Link to='/intro'>처음으로</Link>
            <input type="submit" value="완료" />
          </div>
        </fieldset>
      </form>
    </main>
  );
}