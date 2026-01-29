import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/commwrite.css';
import { TiPlus } from "react-icons/ti";

const CommWrite = () => {
  const navigate = useNavigate();

  return (
    <main className="commWritePage"> {/* main을 최상위로 배치 */}
      <div className="commWriteContainer">
        
        {/* 1. 이미지 삽입 */}
        <section className="imageUploadSection swipeContainer">
          {/* 첫 번째 업로드 버튼 */}
          <div className="uploadPlaceWrap">
            <label htmlFor="fileUpload" className="uploadPlace">
              <TiPlus />
              <input id="fileUpload" type="file" multiple accept="image/*" />
            </label>
          </div>
          {/* 이미지가 추가될 때마다 uploadPlaceWrap 조각들이 옆으로 나열 */}
          <div className="uploadPlaceWrap dummy">
            <TiPlus />
          </div>
        </section>

        {/* 2. 상세 내용 */}
        <section className="contentInputSection">
          <p>
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
          </p>

          <p>
            <label>제목</label>
            <input type="text" placeholder="제목을 입력하세요" className="writeTitle" />
          </p>

          <p>
            <label>내용</label>
            <textarea placeholder="내용을 입력하세요" className="writeContent"></textarea>
          </p>
        </section>
      </div>

      {/* 하단 버튼 영역 */}
      <div className="bottomBtn">
        <button type="button" className="commCancleBtn" onClick={() => navigate(-1)}>취소</button>
        <button type="button" className="commAcceptBtn">완료</button>
      </div>
    </main>
  );
};


export default CommWrite;