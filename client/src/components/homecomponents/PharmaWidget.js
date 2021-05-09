import React from 'react'
import styles from './FeaturedWidget.module.css';
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {Pagination} from 'swiper/core';
// Import Swiper styles
import "swiper/swiper.min.css";
import image1 from '../../images/bio_zen.png';
import image2 from '../../images/caravus.png';
import image3 from '../../images/health_care.png';
import image4 from '../../images/life_omic.png';
import image5 from '../../images/medcare.png';
import image6 from '../../images/page_med.png';
import image7 from '../../images/search_lab.png';
import image8 from '../../images/stomach_care.png';
const PharmaWidget = (props) =>{
const pharmacies = [image1, image2, image3, image4, image5, image6, image7, image8]
    const renderagain = () => pharmacies.map((pharma, index) => {
        return <SwiperSlide key={index}>
        <div style={{textAlign:'center'}}>
           <img style={{width:'90%', height:'100px'}} src={pharma} alt='2'/>
        </div>
        </SwiperSlide>
      })
    return(
        <Swiper   
    
    
breakpoints={{
  "640": {
    "slidesPerView": 2,
    "spaceBetween": 20
  },
  "768": {
    "slidesPerView": 4,
    "spaceBetween": 40
  },
  "1024": {
    "slidesPerView": 5,
    "spaceBetween": 50
  }
}} className="mySwiper">
  {renderagain()}
  </Swiper>
    )
}
export default PharmaWidget