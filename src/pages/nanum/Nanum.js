import GoodsList from 'components/GoodsList/GoodsList';
import WriteBtn from 'components/writeBtn/WriteBtn';
import React, {useState} from 'react';

const Nanum = () => {

  // 확인용 더미데이터 추후삭제예정
  const dummyData = [
  {
    id: 1,
    path: "/nanumdetail",
    title: "한정판 피규어",
    status: "진행중",
    timer: "02:15:30"
  },
  {
    id: 2,
    path: "/nanumdetail",
    title: "미개봉 나눔 이벤트",
    status: "종료임박",
    timer: "00:45:12"
  },
  {
    id: 3,
    path: "/nanumdetail",
    title: "중고 노트북",
    status: "진행중",
    timer: "11:20:05"
  }
];

  const [filter, setFilter] = useState('nanum');

  return (
    <main>
      <section style={{marginTop:'60px', marginBottom:'80px'}}>
          <div className='btnContainer'>
						<button className={filter === 'nanum'?'btnActive':''}
            onClick={()=>setFilter('nanum')}>나눔</button>
						<button className={filter === 'event'?'btnActive':''}
            onClick={()=>setFilter('event')}>이벤트</button>
					</div>
          {dummyData.map((item)=>(
            <GoodsList key={item.id}
            linkTo={item.path}
            title={item.title}
            status={item.status}
            timer={item.timer}/>
          ))}
          <WriteBtn />
      </section>
    </main>
  );
};

export default Nanum;