import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import App from 'app/api/axios';
import './styles/commwrite.css';
import { getUserId } from '../../components/getUserId/getUserId';
import { uploadMultiImages } from '../../components/uploadImage/uploadMultiImages';

import { TiPlus } from "react-icons/ti";
import { IoCloseCircle } from "react-icons/io5";

const CommWrite = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedCate, setSelectedCate] = useState(""); 
  
  // getUserId를 통해 실제 로그인된 사용자의 ID를 가져옵니다.
  const userId = getUserId();

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (images.length + files.length > 10) {
      alert("사진은 최대 10장까지 등록 가능합니다.");
      return;
    }

    const newImages = files.map((file) => ({
      id: Date.now() + Math.random(),
      url: URL.createObjectURL(file),
      file: file,
      tags: [] 
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
    // 태그 페이지(CommTag)에서 돌아왔을 때 태그 정보를 업데이트합니다.
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
    // 1. 유효성 검사 및 로그인 체크
    // if (!userId) {
    //   return alert("로그인이 필요한 서비스입니다. 다시 로그인 후 시도해 주세요.");
    // }
    console.log(userId);
    if (images.length === 0) return alert("최소 1장의 사진을 등록해야 합니다.");
    if (!selectedCate) return alert("카테고리를 선택해 주세요.");
    if (!title.trim()) return alert("제목을 입력해 주세요.");
    if (!content.trim()) return alert("내용을 작성해 주세요.");

    const imageFiles = images.map(img => img.file);

    // 2. 이미지 다중 업로드 실행
    uploadMultiImages(imageFiles, "community")
      .then((uploadedFiles) => {
        // 3. 이미지 업로드 성공 후 savedName 배열을 추출하여 게시글 정보와 함께 전송
        const postData = {
          user_id: Number(userId), // 토큰에서 가져온 내 진짜 ID (예: 2번)
          title: title,
          content: content,
          cate: selectedCate,
          image_urls: uploadedFiles.map(f => f.savedName),
          tags: JSON.stringify(images.map(img => img.tags || []))
        };

        // 4. 게시글 본문 및 태그 정보 저장
        App.post("/api/community", postData)
          .then((res) => {
            alert("게시글이 등록되었습니다!");
            navigate('/community');
          })
          .catch((err) => {
            console.error("게시글 저장 실패:", err);
            alert("서버 오류로 인해 게시글을 저장하지 못했습니다.");
          });
      })
      .catch((err) => {
        console.error("이미지 업로드 에러:", err);
        alert("이미지 전송 중 오류가 발생했습니다.");
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
            <input 
              type="text" 
              placeholder="글 제목" 
              className="writeTitle" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
            />
          </div>

          <div className="inputGroup">
            <label>자세한 설명</label>
            <textarea 
              placeholder="게시글 내용을 작성해 주세요." 
              className="writeContent" 
              value={content} 
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
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