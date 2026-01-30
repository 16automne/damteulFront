import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/commwrite.css';


import { TiPlus } from "react-icons/ti";
import { IoCloseCircle } from "react-icons/io5";

const CommWrite = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);

  // 이미지 추가 핸들러
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (images.length + files.length > 10) {
      alert("사진은 최대 10장까지 등록 가능합니다.");
      return;
    }

    const newImages = files.map((file) => ({
      id: Date.now() + Math.random(), // 고유 ID
      url: URL.createObjectURL(file),
      file: file
    }));

    setImages((prev) => [...prev, ...newImages]);
  };

  // 이미지 삭제 핸들러
  const deleteImage =(id)=> {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  // 이미지 클릭 시 태그 페이지 이동
  const goToTagPage =(img)=> {
    navigate(`/community/tag/${img.id}`, { 
      state: { imgUrl: img.url } // 이미지 주소도 보따리에 넣기
    }); // 이미지를 클릭하면 해당 이미지의 ID를 가지고 태그 편집 페이지로 이동
  };

  return (
    <main className="commWritePage">
      <div className="commWriteContainer">
        
        {/* 1. 이미지 영역 */}
        <section className="imageUploadSection swipeContainer">
          
          {/* 등록 버튼 */}
          <div className="uploadBtnBox">
            <label htmlFor="fileUpload" className="uploadLabel"> {/* fileUpload */}
              <TiPlus />
              <p><span>{images.length}</span>/10</p>
              <input id="fileUpload" type="file" multiple accept="image/*" 
              onChange={handleImageChange} />
            </label>
          </div>
          {/* 추가된 이미지들 */}
          {images.map((img, index) => (
            <div className="previewItem" key={img.id}>
              <img src={img.url} alt="미리보기" 
                onClick={() => goToTagPage(img)} />
              {index === 0 && <div className="representativeBadge">대표 사진</div>}
              <button type="button" className="deleteBtn" 
                onClick={() => deleteImage(img.id)}>
                <IoCloseCircle />
              </button>
            </div>
          ))}
        </section>

        {/* 2. 상세 내용 영역 */}
        <section className="contentInputSection">
          <div className="inputGroup">
            <label>카테고리</label>
            <select defaultValue="">
              <option value="" disabled>카테고리를 선택해주세요.</option>
              <option value="ticket">티켓/교환권</option>
              <option value="clothes">의류</option>
              <option value="beauty">뷰티/미용</option>
              <option value="baby">유아용품</option>
              <option value="book">도서</option>
              <option value="sports">스포츠/레저</option>
              <option value="digit">디지털기기</option>
            </select>
          </div>

          <div className="inputGroup">
            <label>제목</label>
            <input type="text" placeholder="글 제목" className="writeTitle" />
          </div>

          <div className="inputGroup">
            <label>자세한 설명</label>
            <textarea placeholder="게시글 내용을 작성해 주세요. (판매 금지 물품은 게시가 제한될 수 있어요.)" className="writeContent"></textarea>
          </div>
        </section>
      </div>

      <div className="bottomBtn">
        <button type="button" className="commCancelBtn" 
        onClick={() => navigate(-1)}>취소</button>
        <button type="button" className="commAcceptBtn">완료</button>
      </div>
    </main>
  );
};

export default CommWrite;