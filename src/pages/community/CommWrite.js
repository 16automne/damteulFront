import React from 'react';
import './styles/commwrite.css';
import { TiPlus } from "react-icons/ti";

const CommWrite = () => {

  return (
    <main className="commWriteContainer">
      {/* 1. 이미지 삽입 영역 */}
      <section className="imageUploadSection">
        <div className="uploadPlace">
          <label htmlFor="fileUpload"><TiPlus /></label>
          <input id="fileUpload" type="file" multiple accept="image/*"  />
        </div>
      </section>

      {/* 2. 상세 내용 기입 영역 */}
      <section className="contentInputSection">
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
        <label>제목</label>
        <input type="text" placeholder="제목을 입력하세요" className="writeTitle" />
        <label>내용</label>
        <textarea placeholder="내용을 입력하세요" className="writeContent"></textarea>
      </section>

      {/* 3. 하단 버튼 영역 */}
      <div className="writeBtnGroup">
        <button type="button" className="commCancleBtn">취소</button>
        <button type="button" className="commAcceptBtn">완료</button>
      </div>
    </main>
  );
};

export default CommWrite;