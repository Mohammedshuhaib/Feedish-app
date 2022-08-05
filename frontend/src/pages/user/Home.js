import React from 'react';
import BottomMenu from '../../components/user/BottomMenu/BottomMenu';
import Header from '../../components/user/Header/Header';
import Home from '../../components/user/Home/Home';

function HomePage() {
  return (
    <div>
      <Header />
      <Home />
      <BottomMenu/>
    </div>
  );
}

export default HomePage;
