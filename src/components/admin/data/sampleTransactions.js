/* -------------------------------------------------
   샘플 거래 데이터
   - 실제 API 연동 시 이 배열만 서버 데이터로 교체
------------------------------------------------- */
export const sampleTransactions = [
    {
        id: 120,
        product: '중고 아이패드',
        description: '생활 기스 약간 있으나 정상 작동',
        images: [
            'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04',
            'https://images.unsplash.com/photo-1542751110-97427bbecf20'
        ],
        buyer: 'user020',
        seller: 'userA',
        method: '직거래',
        date: '2026-01-23',
        price: 400000,
        completed: '완료'
    },
    {
        id: 119,
        product: '책상',
        description: '원목 책상, 사용감 있음',
        images: [
            'https://images.unsplash.com/photo-1519710164239-da123dc03ef4'
        ],
        buyer: 'user019',
        seller: 'userB',
        method: '택배거래',
        date: '2026-01-22',
        price: 50000,
        completed: '거래중'
    },
    {
        id: 118,
        product: '노트북',
        description: '배터리 교체 필요, 성능 양호',
        images: [
            'https://images.unsplash.com/photo-1517336714731-489689fd1ca8'
        ],
        buyer: 'user018',
        seller: 'userC',
        method: '직거래',
        date: '2026-01-21',
        price: 700000,
        completed: '완료'
    },
    {
        id: 117,
        product: '의자',
        description: '사무용 의자, 등받이 조절 가능',
        images: [
            'https://images.unsplash.com/photo-1582582429416-25c49e32c1d1'
        ],
        buyer: 'user017',
        seller: 'userD',
        method: '택배거래',
        date: '2026-01-20',
        price: 30000,
        completed: '완료'
    },
    {
        id: 116,
        product: '자전거',
        description: '기어 정상, 타이어 교체 완료',
        images: [
            'https://images.unsplash.com/photo-1509395176047-4a66953fd231'
        ],
        buyer: 'user016',
        seller: 'userE',
        method: '직거래',
        date: '2026-01-19',
        price: 150000,
        completed: '거래중'
    },
    {
        id: 115,
        product: '중고 핸드폰',
        description: '액정 미세 스크래치 있음',
        images: [
            'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9'
        ],
        buyer: 'user015',
        seller: 'userF',
        method: '택배거래',
        date: '2026-01-18',
        price: 250000,
        completed: '완료'
    },
    {
        id: 114,
        product: '책',
        description: '프로그래밍 입문서',
        images: [
            'https://images.unsplash.com/photo-1512820790803-83ca734da794'
        ],
        buyer: 'user014',
        seller: 'userG',
        method: '직거래',
        date: '2026-01-17',
        price: 10000,
        completed: '완료'
    },
    {
        id: 113,
        product: '냉장고',
        description: '1인 가구용, 작동 이상 없음',
        images: [
            'https://images.unsplash.com/photo-1586201375761-83865001e31c'
        ],
        buyer: 'user013',
        seller: 'userH',
        method: '택배거래',
        date: '2026-01-16',
        price: 300000,
        completed: '거래중'
    },
    {
        id: 112,
        product: 'TV',
        description: '40인치 LED TV',
        images: [
            'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1'
        ],
        buyer: 'user012',
        seller: 'userI',
        method: '직거래',
        date: '2026-01-15',
        price: 200000,
        completed: '완료'
    },
    {
        id: 111,
        product: '소파',
        description: '2인용 패브릭 소파',
        images: [
            'https://images.unsplash.com/photo-1586023492125-27b2c045efd7'
        ],
        buyer: 'user011',
        seller: 'userJ',
        method: '택배거래',
        date: '2026-01-14',
        price: 150000,
        completed: '완료'
    },
    {
        id: 110,
        product: '커피 머신',
        description: '캡슐형 커피 머신',
        images: [
            'https://images.unsplash.com/photo-1509042239860-f550ce710b93'
        ],
        buyer: 'user010',
        seller: 'userK',
        method: '직거래',
        date: '2026-01-13',
        price: 90000,
        completed: '거래중'
    },
    {
        id: 109,
        product: '전자레인지',
        description: '700W, 내부 깨끗함',
        images: [
            'https://images.unsplash.com/photo-1585659729253-66f8dcd6a3e8'
        ],
        buyer: 'user009',
        seller: 'userL',
        method: '택배거래',
        date: '2026-01-12',
        price: 60000,
        completed: '완료'
    },
    {
        id: 108,
        product: '헤드폰',
        description: '노이즈 캔슬링 지원',
        images: [
            'https://images.unsplash.com/photo-1518443895471-7f25f6f79d0d'
        ],
        buyer: 'user008',
        seller: 'userM',
        method: '직거래',
        date: '2026-01-11',
        price: 120000,
        completed: '완료'
    },
    {
        id: 107,
        product: '키보드',
        description: '기계식 키보드, 청축',
        images: [
            'https://images.unsplash.com/photo-1517336714731-489689fd1ca8'
        ],
        buyer: 'user007',
        seller: 'userN',
        method: '택배거래',
        date: '2026-01-10',
        price: 70000,
        completed: '거래중'
    },
    {
        id: 106,
        product: '마우스',
        description: '무선 마우스',
        images: [
            'https://images.unsplash.com/photo-1527814050087-3793815479db'
        ],
        buyer: 'user006',
        seller: 'userO',
        method: '직거래',
        date: '2026-01-09',
        price: 30000,
        completed: '완료'
    },
    {
        id: 105,
        product: '선풍기',
        description: '리모컨 포함',
        images: [
            'https://images.unsplash.com/photo-1598300053652-17b58c7cda6b'
        ],
        buyer: 'user005',
        seller: 'userP',
        method: '택배거래',
        date: '2026-01-08',
        price: 40000,
        completed: '완료'
    },
    {
        id: 104,
        product: '가방',
        description: '백팩, 수납공간 넉넉',
        images: [
            'https://images.unsplash.com/photo-1522199755839-a2bacb67c546'
        ],
        buyer: 'user004',
        seller: 'userQ',
        method: '직거래',
        date: '2026-01-07',
        price: 35000,
        completed: '거래중'
    },
    {
        id: 103,
        product: '운동화',
        description: '사이즈 270, 거의 새 제품',
        images: [
            'https://images.unsplash.com/photo-1528701800489-20be3c7b36fa'
        ],
        buyer: 'user003',
        seller: 'userR',
        method: '택배거래',
        date: '2026-01-06',
        price: 60000,
        completed: '완료'
    },
    {
        id: 102,
        product: '모니터',
        description: '27인치 QHD',
        images: [
            'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04'
        ],
        buyer: 'user002',
        seller: 'userS',
        method: '직거래',
        date: '2026-01-05',
        price: 180000,
        completed: '완료'
    },
    {
        id: 101,
        product: '책장',
        description: '5단 책장, 조립식',
        images: [
            'https://images.unsplash.com/photo-1519710164239-da123dc03ef4'
        ],
        buyer: 'user001',
        seller: 'userT',
        method: '택배거래',
        date: '2026-01-04',
        price: 80000,
        completed: '거래중'
    }
];

