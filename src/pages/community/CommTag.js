import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { AiFillTag } from "react-icons/ai";
import App from 'app/api/axios';
import './styles/commtag.scss';

const CommTag = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const currentImages = location.state?.currentImages || [];
  
  const imgUrl = location.state?.imgUrl || "https://via.placeholder.com/800";

  const [tags, setTags] = useState(location.state?.existingTags || []);
  const [tempPos, setTempPos] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [myGoods, setMyGoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyGoods = async () => {
      try {
        const response = await App.get("/api/goods/my-list"); 
        setMyGoods(response.data);
      } catch (err) {
        console.error("상품 목록 로딩 실패:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyGoods();
  }, []);

  const handlePhotoClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setTempPos({ x: x.toFixed(2), y: y.toFixed(2) });
    setShowModal(true);
  };

  const selectProduct = (product) => {
    const newTag = {
      id: Date.now(),
      goods_id: product.id, // DB의 goods_id
      x: tempPos.x,
      y: tempPos.y,
      name: product.name,   // DB의 title
      price: product.price  // DB의 price
    };
    setTags([...tags, newTag]);
    setShowModal(false);
  };

  const handleComplete = () => {
    navigate('/community/write', { 
      state: { 
        updatedTag: {
          image_id: location.state?.image_id, 
          tags: tags 
        },
        currentImages: currentImages
      } 
    });
  };

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
      <div className="tagInstruction">
        원하는 위치를 클릭하여<br />태그를 추가해 주세요.
      </div>

      <div className="tagImageContainer" onClick={handlePhotoClick}>
        <img src={imgUrl} alt="편집" className="fullImage" />
        <div className="tagIconOverlay">
          <AiFillTag />
        </div>
        {tags.map((tag) => (
          <div key={tag.id} className="addedTagMarker" style={{ left: `${tag.x}%`, top: `${tag.y}%` }}>
            <div className="tagLabel">
              <span className="name">{tag.name}</span>
              <span className="price">{tag.price} 원</span>
            </div>
          </div>
        ))}
      </div>

      <footer className="tagFooter">
        <button className="backBtn" onClick={handleGoBack}>돌아가기</button>
        <button className="doneBtn" onClick={handleComplete}>완료</button>
      </footer>

      {showModal && (
        <div className="modalOverlay" onClick={() => setShowModal(false)}>
          <div className="tagModalContent" onClick={(e) => e.stopPropagation()}>
            {myGoods.length > 0 ? (
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
              <div className="noGoodsBox">
                <p>등록된 상품이 없습니다.</p>
                <button className="goTradeBtn" onClick={() => navigate('/goodstrade')}>
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