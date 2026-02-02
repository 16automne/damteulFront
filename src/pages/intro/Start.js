import React from 'react'; 
import "./css/Start.css";

const Start = () => {
  return (
     <>
    <main className='splashScreen'>
        <div className='logo_container'>
        <img src={`${process.env.PUBLIC_URL}/images/logo3.png`} alt='메인로고3' />
    </div>
    </main>
          </>
  );
};

export default Start;