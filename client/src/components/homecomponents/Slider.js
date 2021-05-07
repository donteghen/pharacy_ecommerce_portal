import React from 'react';
import styles from './Slider.module.css'
import SwiperCore, {Pagination, Autoplay} from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";


const images = ['https://source.unsplash.com/random', 'https://source.unsplash.com/daily', 'https://source.unsplash.com/user/erondu/daily', 'https://source.unsplash.com/weekly?water']

const HomeSlider = (props) =>{
    SwiperCore.use([Pagination, Autoplay]);
    return (
        <Swiper 
        centeredSlides={true} 
        autoplay={{"delay": 3000,"disableOnInteraction": false, }}
        parallax={{'enabled':true}}
        pagination={{ clickable: true }} >
             {images.map((x, index )=> <SwiperSlide key={index}><img className={styles.main_slider_img} src={x} alt={index} /></SwiperSlide>)}
        </Swiper>
    )
}
export default HomeSlider

