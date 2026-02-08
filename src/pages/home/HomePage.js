import React, { useEffect, useMemo, useState } from 'react';
import api from 'app/api/axios';
import './styles/main.css';
import WriteBtn from 'components/writeBtn/WriteBtn';
import GoodsList from 'components/GoodsList/GoodsList';
import { useLocation } from 'react-router-dom';
import SearchBar from 'components/SearchBar/SearchBar';

const LOGIN_WELCOME_KEY = 'loginWelcomeShown';

<<<<<<< HEAD
const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
=======
const HomePage = () => {
	// 주소에 같이 오는 state값 가져오기 위한 location
	const location = useLocation();;

	// 로그인,회원가입에서 home 방문시 로그인완료 뜨게하기
	const [loginSuccess, setLoginSuccess] = useState(false);

	// 천천히 사라지게
	const [fadeOut, setFadeOut] = useState(false);

	useEffect(()=>{
		if(location.state?.showWelcome){
			setLoginSuccess(true);
			setFadeOut(false);

			// 2초후 -> 서서히 사라지기 시작
			const fadeTimer = setTimeout(()=>{
				setFadeOut(true);
			},2000)

			const removeTimer = setTimeout(()=>{
				setLoginSuccess(false);
			},2500);

			// 타이머 지우기
			return () => {
				clearTimeout(fadeTimer);
				clearTimeout(removeTimer);
			};
		}
	},[location.state?.showWelcome]);

	// 전체/최신글 상태변수
	const [filter, setFilter] = useState('all');

	// DB데이터 상태변수
	const [list, setList] = useState([]);

	// 서버에서 데이터 가져오기
	useEffect(()=>{
		const fetchGoods = async()=>{
			try{
				const res = await api.get('/api/goods');
				if(res.data.ok){
					setList(res.data.list);
				}
			}catch(err){
				console.error("목록 로드 실패 : ", err);
			}
		};
		fetchGoods();
	},[]);

	const filteredList = filter === 'all'
	? [...list].sort(()=> Math.random()- 0.5)
	:list;

	return (
		<main>
			{/* 로그인 성공시 나오는 메시지 */}
			{loginSuccess && (
				<p className={`loginMessage ${fadeOut ? 'fadeOut' : ''}`}>
					로그인 성공
				</p>
			)}

			<section className='homePage'>
					<SearchBar />
					<div className='btnContainer'>
						<button className={filter === 'all'?'btnActive':''}
						onClick={()=>setFilter('all')}>전체</button>
						<button className={filter === 'latest'?'btnActive':''}
						onClick={()=>setFilter('latest')}>최신글</button>
					</div>
					{/* GoodsList */}
					{filteredList.length > 0 ?(
						filteredList.map((item)=>(
							<GoodsList key={item.goods_id}
							title={item.title}
							status={item.condition_type === '0'?'중고상품':'새상품'}
							price={item.price.toLocaleString()}
							linkTo={`/goodsdetail/${item.goods_id}`}
							likeCount={item.like_count}
							/>
						))
					):(
						<p style={{textAlign: 'center', marginTop: '20px'}}>등록된 매물이 없습니다.</p>
					)}
					
						{/* 글쓰기 버튼 */}
            <WriteBtn />			
			</section>
		</main>
	);
>>>>>>> f1fa4163a3e82255153fdc2dd390dcd18b585b81
};

const HomePage = () => {
  const location = useLocation();

  const [loginSuccess, setLoginSuccess] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  // ✅ 로그인 성공 메시지: 1회성(새로고침해도 다시 안 뜸)
  useEffect(() => {
    const alreadyShown = localStorage.getItem(LOGIN_WELCOME_KEY);
    if (alreadyShown) return;

    if (location.state?.showWelcome) {
      setLoginSuccess(true);
      setFadeOut(false);

      const fadeTimer = setTimeout(() => setFadeOut(true), 2000);

      const removeTimer = setTimeout(() => {
        setLoginSuccess(false);
        localStorage.setItem(LOGIN_WELCOME_KEY, 'true');
      }, 2500);

      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(removeTimer);
      };
    }
  }, [location.state?.showWelcome]);

  // 전체/최신글 상태변수
  const [filter, setFilter] = useState('all');

  // DB데이터 상태변수
  const [list, setList] = useState([]);
  const [shuffledList, setShuffledList] = useState([]); // ✅ 랜덤 결과 저장

  useEffect(() => {
    const fetchGoods = async () => {
      try {
        const res = await api.get('/api/goods');
        if (res.data.ok) setList(res.data.list);
      } catch (err) {
        console.error("목록 로드 실패 : ", err);
      }
    };
    fetchGoods();
  }, []);

  // ✅ list가 바뀔 때(=처음 로드/데이터 갱신)만 1회 섞기
  useEffect(() => {
    setShuffledList(shuffle(list));
  }, [list]);

  // ✅ 최신글은 "랜덤"이 아니라 "정렬"로 고정
  const latestList = useMemo(() => {
    // created_at 같은 컬럼이 있으면 그걸로 정렬하는 게 베스트
    // 없으면 goods_id 기준으로 내림차순(대체)
    return [...list].sort((a, b) => (b.goods_id ?? 0) - (a.goods_id ?? 0));
  }, [list]);

  const viewList = filter === 'all' ? shuffledList : latestList;

  return (
    <main>
      {loginSuccess && (
        <p className={`loginMessage ${fadeOut ? 'fadeOut' : ''}`}>
          로그인 성공
        </p>
      )}

      <section className='homePage'>
        <SearchBar />
        <div className='btnContainer'>
          <button
            className={filter === 'all' ? 'btnActive' : ''}
            onClick={() => setFilter('all')}
          >
            전체
          </button>
          <button
            className={filter === 'latest' ? 'btnActive' : ''}
            onClick={() => setFilter('latest')}
          >
            최신글
          </button>
        </div>

        {viewList.length > 0 ? (
          viewList.map((item) => (
            <GoodsList
              key={item.goods_id}
              title={item.title}
              status={item.condition_type === '0' ? '중고상품' : '새상품'}
              price={Number(item.price).toLocaleString()}
              linkTo={`/goodsdetail/${item.goods_id}`}
            />
          ))
        ) : (
          <p style={{ textAlign: 'center', marginTop: '20px' }}>
            등록된 매물이 없습니다.
          </p>
        )}

        <WriteBtn />
      </section>
    </main>
  );
};

export default HomePage;
