import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import App from 'app/api/axios';
import './styles/commwrite.css';

import { TiPlus } from "react-icons/ti";
import { IoCloseCircle } from "react-icons/io5";

const CommWrite = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedCate, setSelectedCate] = useState(""); 

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (images.length + files.length > 10) {
      alert("사진은 최대 10장까지 등록 가능합니다.");
      return;
    }

    const newImages = files.map((file) => ({
      id: Date.now() + Math.random(),
      url: URL.createObjectURL(file),
      file: file
    }));

    setImages((prev) => [...prev, ...newImages]);
  };

  const deleteImage =(id)=> {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  const goToTagPage = (img) => {
    navigate(`/community/tag/${img.id}`, { 
      state: { 
        imgUrl: img.url,
        existingTags: img.tags || [], 
        currentImages: images 
      } 
    });
  };

  useEffect(() => {
    if (location.state?.updatedTag) {
      const { id, tags } = location.state.updatedTag;
      setImages((prev) => {
        const baseImages = prev.length > 0 ? prev : (location.state?.currentImages || []);
        return baseImages.map((img) => 
          img.id === Number(id) ? { ...img, tags: tags } : img
        );
      });
    } 
  }, [location.state]);

  const handleRegister = () => {
    if (images.length === 0) return alert("최소 1장의 사진을 등록해야 합니다.");
    if (!selectedCate) return alert("카테고리를 선택해 주세요.");
    if (!title.trim()) return alert("제목을 입력해 주세요.");
    if (!content.trim()) return alert("내용을 작성해 주세요.");

    const formData = new FormData();
    formData.append('user_id', 1); 
    formData.append('title', title);
    formData.append('content', content);
    formData.append('cate', selectedCate);

    images.forEach((img) => {
      formData.append('files', img.file);
    });

    const tagData = images.map((img) => img.tags || []);
    formData.append('tags', JSON.stringify(tagData)); 

    App.post("/api/community", formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    .then((res) => {
      alert("게시글이 등록되었습니다!");
      navigate('/community');
    })
    .catch((err) => {
      console.error("전송 에러:", err);
      if (err.response) {
        alert(`서버 에러: ${err.response.data.message || "저장 실패"}`);
      } else {
        alert("서버 연결 실패");
      }
    });
  };
  
  return (
    <main className="commWritePage">
      <div className="commWriteContainer">
        <section className="imageUploadSection swipeContainer">
          <div className="uploadBtnBox">
            <label htmlFor="fileUpload" className="uploadLabel">
              <TiPlus />
              <p><span>{images.length}</span>/10</p>
              <input id="fileUpload" type="file" multiple accept="image/*" onChange={handleImageChange} />
            </label>
          </div>
          {images.map((img, index) => (
            <div className="previewItem" key={img.id}>
              <img src={img.url} alt="미리보기" onClick={() => goToTagPage(img)} />
              {index === 0 && <div className="representativeBadge">대표 사진</div>}
              <button type="button" className="deleteBtn" onClick={() => deleteImage(img.id)}>
                <IoCloseCircle />
              </button>
            </div>
          ))}
        </section>

        <section className="contentInputSection">
          <div className="inputGroup">
            <label>카테고리</label>
            <select value={selectedCate} onChange={(e) => setSelectedCate(e.target.value)}>
              <option value="" disabled>카테고리를 선택해주세요.</option>
              <option value="1">티켓/교환권</option>
              <option value="2">의류</option>
              <option value="3">뷰티/미용</option>
              <option value="4">유아용품</option>
              <option value="5">도서</option>
              <option value="6">스포츠/레저</option>
              <option value="7">디지털기기</option>
            </select>
          </div>

          <div className="inputGroup">
            <label>제목</label>
            <input type="text" placeholder="글 제목" className="writeTitle" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>

          <div className="inputGroup">
            <label>자세한 설명</label>
            <textarea placeholder="게시글 내용을 작성해 주세요." className="writeContent" value={content} onChange={(e) => setContent(e.target.value)}></textarea>
          </div>
        </section>
      </div>

      <div className="bottomBtn">
        <button type="button" className="commCancelBtn" onClick={() => navigate('/community')}>취소</button>
        <button type="button" className="commAcceptBtn" onClick={handleRegister}>완료</button>
      </div>
    </main>
  );
};

export default CommWrite;