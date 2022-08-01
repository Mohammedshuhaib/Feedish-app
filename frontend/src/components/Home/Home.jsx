import { MyLocationRounded, PlusOneRounded } from '@mui/icons-material';
import React from 'react';
import TopHotels from './TopHotels';

function Home() {
  return (
    <main>
      <div className="mainContainer">
        <div className="bannerContainer">
          <img
            src={require('../../images/Banner.jpg')}
            className="banner"
            alt=""
          />
          <div className="bannerSlogan">
            <h1 className="mainSlogan">FEEDISH</h1>
            <h5 className="subSlogan">Delivering happiness</h5>
          </div>
          <div className="searchLocation">
            <MyLocationRounded className="locationIcon" />
            <select class="minimal">
              <option>Detect your location</option>
              <option><PlusOneRounded/> Add Location</option>
              <option>Makkaraparamba</option>
            </select>
            <input type="text" placeholder="Search items" />
          </div>
        </div>
      </div>
      <TopHotels/>
    </main>
   
  );

}

export default Home;
