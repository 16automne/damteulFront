import React from 'react';
import './styles/community.css';

const Community = () => {
  return (
    <main className="commMain">
      <section className="commRecSection">
        <h2><b>OOO님</b>에게 추천드리는 커뮤니티</h2>
      </section>

      {/* 카테고리 메뉴 */}
      <section className="comCateSection">
        <h3 className="comTitle">카테고리 선택</h3>
        <div className="comCateWrap">
          <div className="comCateItem">티켓/교환권</div>
          <div className="comCateItem">의류</div>
          <div className="comCateItem">뷰티/미용</div>
          <div className="comCateItem">유아용품</div>
        </div>
      </section>

      {/* 게시물 사진 리스트 */}
      <section className="comFeedSection">
        <h3 className="comTitle">커뮤니티</h3>
        <div className="comFeedWrap">
          <article className="comFeedItem">
            <div className="comFeedImg">이미지</div>
            <div className="comFeedBox">게시글 정보</div>
          </article>
        </div>
      </section>

      {/* 글쓰기 버튼 */}
      <button className="write-btn">+</button>
    </main>
  );
};

export default Community;