import { StarBorderPurple500 } from '@mui/icons-material'
import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination } from "swiper";

function TopHotels() {
  return (
    <div className='topHotelContainer'>
      <div className='topHotelHeading'>
        <h1 className='headingText'>Trending Hotels</h1>
        <hr className='headingWidth' />
      </div>
      <div className='slide-container'>
        <Swiper
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 80,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 100,
          },
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination]}
         className='slide-content'>
          <SwiperSlide className='card-wrapper'>
            <div className='card'>
              <div className='image-content'>
                <span className='overlay'></span>
                <div className='card-image'>
                  <img src={require("../../../images/Hotel1.jpg")} alt="" />
                </div>
              </div>
              <div className="card-content">
                <h2 className="name">Hotel Nehdi</h2>
                <p className="rating">Rating: 5<StarBorderPurple500 className='starLogo'/></p>
                <button>make an order</button>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className='card-wrapper'>
            <div className='card'>
              <div className='image-content'>
                <span className='overlay'></span>
                <div className='card-image'>
                  <img src={require("../../../images/Hotel2.jpg")} alt="" />
                </div>
              </div>
              <div className="card-content">
                <h2 className="name">Hotel farsa</h2>
                <p className="rating">Rating: 4<StarBorderPurple500 className='starLogo'/></p>
                <button>make an order</button>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className='card-wrapper'>
            <div className='card'>
              <div className='image-content'>
                <span className='overlay'></span>
                <div className='card-image'>
                  <img src={require("../../../images/Hotel2.jpg")} alt="" />
                </div>
              </div>
              <div className="card-content">
                <h2 className="name">Hotel farsa</h2>
                <p className="rating">Rating: 4<StarBorderPurple500 className='starLogo'/></p>
                <button>make an order</button>
              </div>
            </div>
          </SwiperSlide>
          

        </Swiper>
      </div>
    </div>
  )
}

export default TopHotels
