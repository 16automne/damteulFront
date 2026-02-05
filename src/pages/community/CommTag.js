import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { AiFillTag } from "react-icons/ai"; // 태그 아이콘
import './styles/commtag.scss';

const CommTag = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const currentImages = location.state?.currentImages || []; // 보따리 받기
  
  const imgUrl = location.state?.imgUrl || "https://via.placeholder.com/800";

  // 1. 상태 관리
  const [tags, setTags] = useState(location.state?.existingTags || []);  // 등록된 태그들, 없으면 빈 배열[]
  const [tempPos, setTempPos] = useState(null); // 방금 클릭한 좌표
  const [showModal, setShowModal] = useState(false); // 모달 표시 여부

  // 2. 샘플 데이터 (내 중고제품 리스트)
  // 데이터가 비어있으면 세 번째 사진(등록 제품 없음) 화면이 나옵니다.
  const [myGoods] = useState([
    { id: 1, name: "스트라이프 셔츠", price: "23,000", img: "https://via.placeholder.com/50" },
    { id: 2, name: "다홍 니트", price: "20,000", img: "https://via.placeholder.com/50" },
    { id: 3, name: "무지와이드 팬츠", price: "18,000", img: "https://via.placeholder.com/50" },
    { id: 4, name: "스프라이프 셔츠", price: "23,000", img: "https://via.placeholder.com/50" },
    { id: 5, name: "샘플 제품 5", price: "10,000", img: "https://via.placeholder.com/50" },
    { id: 6, name: "샘플 제품 6", price: "15,000", img: "https://via.placeholder.com/50" },
  ]);

  // 3. 사진 클릭 시 좌표 저장 및 모달 열기
  const handlePhotoClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setTempPos({ x: x.toFixed(2), y: y.toFixed(2) });
    setShowModal(true);
  };

  // 4. 상품 선택 시 태그 추가
  const selectProduct = (product) => {
    const newTag = {
      id: Date.now(),
      x: tempPos.x,
      y: tempPos.y,
      name: product.name,
      price: product.price
    };
    setTags([...tags, newTag]);
    setShowModal(false);
  };

  // 5. 완료 버튼 클릭시
  const handleComplete = () => {
    navigate('/community/write', { 
      state: { 
        updatedTag: {
          id: id,
          tags: tags // 새로 추가하거나 수정한 태그 리스트를 다시 보냄
        },
        currentImages: currentImages // 받은 사진 리스트를 그대로 다시 돌려줌
      } 
    });
  };

  // 6. 돌아가기 버튼 클릭시
  const handleGoBack = () => {
  if (tags.length !== (location.state?.existingTags?.length || 0)) {
    if (!window.confirm("변경 사항이 저장되지 않습니다. 정말 돌아가시겠어요?")) {
      return;
    }
  }
  navigate(-1);
};


  return (
    <div className="commTagPage">
      {/* 상단 안내 문구 (첫 번째 사진) */}
      <div className="tagInstruction">
        원하는 위치를 클릭하여<br />태그를 추가해 주세요.
      </div>

      <div className="tagImageContainer" onClick={handlePhotoClick}>
        <img src={imgUrl} alt="편집" className="fullImage" />
        
        {/* 태그 아이콘 (네 번째 사진) */}
        <div className="tagIconOverlay">
          <AiFillTag />
        </div>

        {/* 등록된 태그들 표시 */}
        {tags.map((tag) => (
          <div key={tag.id} className="addedTagMarker" style={{ left: `${tag.x}%`, top: `${tag.y}%` }}>
            <div className="tagLabel">
              <span className="name">{tag.name}</span>
              <span className="price">{tag.price} 원</span>
            </div>
          </div>
        ))}
      </div>

      {/* 하단 버튼 (첫 번째 사진) */}
      <footer className="tagFooter">
        <button className="backBtn" onClick={handleGoBack}>돌아가기</button>
        <button className="doneBtn" onClick={handleComplete}>완료</button>
      </footer>

      {/* 모달 섹션 */}
      {showModal && (
        <div className="modalOverlay" onClick={() => setShowModal(false)}>
          <div className="tagModalContent" onClick={(e) => e.stopPropagation()}>
            {myGoods.length > 0 ? (
              /* 두 번째 사진: 상품 리스트 모달 */
              <>
                <h3>등록할 상품을 정해주세요</h3>
                <div className="goodsListSwipe">
                  {myGoods.map((item) => (
                    <div key={item.id} className="goodsItem" onClick={() => selectProduct(item)}>
                      <img src={item.img} alt={item.name} />
                      <div className="info">
                        <p className="name">{item.name}</p>
                        <p className="price">{item.price}원</p>
                      </div>
                      <div className="radioCircle"></div>
                    </div>
                  ))}
                </div>
                <button className="registerActionBtn">등록하기</button>
              </>
            ) : (
              /* 세 번째 사진: 등록된 상품 없을 때 */
              <div className="noGoodsBox">
                <p>등록된 상품이 없습니다.</p>
                <button 
                  className="goTradeBtn" 
                  onClick={() => navigate('/goods/GoodsTrade')}
                >
                  제품 등록하러 가기 &rarr;
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CommTag;