import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './styles/commtag.css';

const CommTag =()=> {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [tags, setTags] = useState([]); // 전체 태그 리스트
  const [isInputMode, setIsInputMode] = useState(false); // 입력창 활성화 여부
  const [tempTag, setTempTag] = useState(null); // 방금 찍은 태그 위치 정보
  const [tagName, setTagName] = useState(""); // 입력 중인 태그 이름

  // 1. 이미지 클릭 시 태그 위치 잡기
  const handleImageClick = (e) => {
    if (isInputMode) return; // 이미 입력 중이면 중복 클릭 방지

    const rect = e.target.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setTempTag({ x: x.toFixed(2), y: y.toFixed(2) });
    setIsInputMode(true);
    setTagName(""); // 입력창 초기화
  };

  // 2. 태그 이름 입력 완료 (확인 버튼)
  const handleSaveTag = () => {
    if (!tagName.trim()) {
      alert("상품 이름을 입력해주세요!");
      return;
    }

    const newTag = {
      id: Date.now(),
      x: tempTag.x,
      y: tempTag.y,
      name: tagName
    };

    setTags([...tags, newTag]);
    setIsInputMode(false);
    setTempTag(null);
  };

  // 3. 태그 삭제하기 (태그 마커를 클릭하면 삭제)
  const deleteTag = (e, tagId) => {
    e.stopPropagation(); // 이미지 클릭 이벤트가 중복 발생하지 않게 방지
    if (window.confirm("이 태그를 삭제할까요?")) {
      setTags(tags.filter(tag => tag.id !== tagId));
    }
  };

  return (
    <div className="commTagPage">
      <div>{id}번 사진을 편집 중이에요</div>
      
      <header className="tagHeader">
        <button onClick={() => navigate(-1)}>취소</button>
        <span className="title">태그 달기</span>
        <button className="doneBtn" onClick={() => navigate(-1)}>완료</button>
      </header>

      <div className="tagImageContainer" onClick={handleImageClick}>
        {/* 실제로는 images 배열에서 id가 일치하는 url을 가져와서 사용하세요 */}
        <img src="https://via.placeholder.com/600x800" alt="태그할 이미지" className="fullImage" />
        
        {/* 기존에 찍힌 태그들 */}
        {tags.map((tag) => (
          <div 
            key={tag.id} 
            className="tagMarker" 
            style={{ left: `${tag.x}%`, top: `${tag.y}%` }}
            onClick={(e) => deleteTag(e, tag.id)}
          >
            <div className="dot"></div>
            <span className="tagName">{tag.name}</span>
          </div>
        ))}

        {/* 현재 입력 중인 임시 태그와 인풋창 */}
        {isInputMode && (
          <div className="tagInputBox" style={{ left: `${tempTag.x}%`, top: `${tempTag.y}%` }}>
            <div className="dot"></div>
            <div className="inputPop">
              <input 
                type="text" 
                value={tagName} 
                onChange={(e) => setTagName(e.target.value)}
                placeholder="상품명 입력"
                autoFocus
              />
              <button onClick={handleSaveTag}>확인</button>
            </div>
          </div>
        )}
      </div>
      
      <p className="guideText">
        {isInputMode ? "이름을 입력하고 확인을 눌러주세요." : "사진을 터치해 태그를 달아보세요. 태그를 누르면 삭제됩니다."}
      </p>
    </div>
  );
};

export default CommTag;