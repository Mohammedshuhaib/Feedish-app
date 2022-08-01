import React from 'react';
import BottomMenu from '../components/BottomMenu/BottomMenu';
import Header from '../components/Header/Header';
import Home from '../components/Home/Home';

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
