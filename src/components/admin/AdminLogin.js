import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "app/api/axios";

export default function AdminLogin() {
  const [admin, setAdmin] = useState({
    admin_id: '',
    admin_pw: ''
  });
  const STORAGE_KEY = "saved_admin_id";
  useEffect(() => {
    const savedId = localStorage.getItem('saved_admin_id');
    if (savedId) {
      setAdmin(prev => ({
        ...prev,
        admin_id: savedId
      }));
      setRememberId(true);
    }
  }, []);


  const navigate = useNavigate();


  const [rememberId, setRememberId] = useState(false);

  // 폼변경
  const adminChange = (e) => {
    const { name, value } = e.target;
    setAdmin(prev => ({
      ...prev,
      [name]: value
    }));
    if (rememberId && name === "admin_id") {
      const v = value.trim();
      if (v) localStorage.setItem(STORAGE_KEY, v);
      else localStorage.removeItem(STORAGE_KEY);
    }
  }

  // 아이디 저장 변경
  const remberChange = (e) => {
    const { checked } = e.target;
    setRememberId(checked);

    if (checked) {
      // 현재 입력된 userId를 저장(비어있으면 저장 안 하도록 해도 됨)
      if (admin.admin_id.trim()) localStorage.setItem(STORAGE_KEY, admin.admin_id.trim());
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  // 로그인
  const adminSubmit = async (e) => {
    e.preventDefault();
    if (!admin.admin_id.trim()) {
      alert("아이디를 입력해주세요.");
      return;
    }

    if (!admin.admin_pw.trim()) {
      alert("비밀번호를 입력해주세요.");
      return;
    }

    // 로그인 요청 예시(너의 api 코드에 맞춰 바꾸면 됨)
    try {
      const { data } = await api.post("/api/admin/auth/login", admin);
      if (!data?.success) {
        alert(data?.message || "로그인에 실패했습니다.");
        return;
      }

      if (data.token) {
        localStorage.setItem("admin_token", data.token);
      }

      if (data.admin) {
        localStorage.setItem("admin_info", JSON.stringify(data.admin));
      }
      // 4) 로그인 성공 시점에 확정 저장(원하면 이 방식만 써도 됨)
      if (rememberId && admin.admin_id.trim()) {
        localStorage.setItem(STORAGE_KEY, admin.admin_id.trim());
      }
      if (!rememberId) {
        localStorage.removeItem(STORAGE_KEY);
      }
      alert('로그인 성공');
      navigate('/admin', { replace: true });
    } catch (err) {
      console.error("관리자 로그인 오류:", err);

      // 5. 에러 타입별 메시지 분기
      if (err.response) {
        // 서버가 응답을 준 경우 (401, 403, 500 등)
        alert(err.response.data?.message || "아이디 또는 비밀번호가 올바르지 않습니다.");
      } else if (err.request) {
        // 요청은 갔는데 응답이 없는 경우
        alert("서버에 연결할 수 없습니다. 잠시 후 다시 시도해주세요.");
      } else {
        // 그 외 JS 에러
        alert("알 수 없는 오류가 발생했습니다.");
      }
    }

  }

  return (
    <>
      <div className="adminFormWrap">
        <Link to='/' title='메인페이지'>
          <h1>
            <img src={`${process.env.PUBLIC_URL}/images/logo1.png`} alt='메인로고' />
          </h1>
        </Link>
        <form onSubmit={adminSubmit}>
          <div className="adminForm">
            <label htmlFor="admin_id">로그인</label>
            <input type='text' id='admin_id' name='admin_id' value={admin.admin_id} onChange={adminChange} placeholder="아이디를 입력해주세요" />
          </div>

          <div className="adminForm">
            <label htmlFor="admin_pw">비밀번호</label>
            <input type='password' id='admin_pw' name='admin_pw' value={admin.admin_pw} onChange={adminChange} placeholder="비밀번호를 입력해주세요" />
          </div>

          <label className="adminCheck" htmlFor="rememberId">
            <input type='checkbox' checked={rememberId} id='rememberId' onChange={remberChange} />
            아이디 저장
          </label>

          <div className="adminFormBtn">
            <button type="submit">로그인</button>
          </div>
        </form>
      </div>
    </>
  );
};