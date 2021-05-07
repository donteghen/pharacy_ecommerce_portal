import React from 'react'
import styles from './FeaturedWidget.module.css';
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {Pagination} from 'swiper/core';
// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";

SwiperCore.use([Pagination]);
const featuredProd =[{name:'Parazytamol', cat:'Antibiotic', price:41, img:'http://dermanalmanya.com/wp-content/uploads/2021/04/Antihyp-bei-Bluthochdruck.png'},
       {name:'benzin', cat:'Antibiotic', price:3, img:'http://dermanalmanya.com/wp-content/uploads/2021/04/ANGOCIN-Anti-Infekt-N-bei-Blasenentzundung.png'}, {name:'anphitamine', cat:'Antibiotic', price:78, img:'http://dermanalmanya.com/wp-content/uploads/2021/04/skid.png'}, {name:'codeine', cat:'Antibiotic', price:10, img:'http://dermanalmanya.com/wp-content/uploads/2021/04/Aknemycin.png'},
       {name:'putanyl', cat:'Antibiotic', price:48, img:'http://dermanalmanya.com/wp-content/uploads/2021/04/Talcid-Kautabletten.png'},{name:'andophine', cat:'Antibiotic', price:25,img:'http://dermanalmanya.com/wp-content/uploads/2021/04/Fluomizin.png'}, {name:'ositisine', cat:'Antibiotic', price:45,img:'http://dermanalmanya.com/wp-content/uploads/2021/04/ANGOCIN-Anti-Infekt-N-bei-Blasenentzundung.png'}]

const FeaturedWidget = (props) =>{

    const renderagain = () => featuredProd.map((prod, index) => {
        return <SwiperSlide key={index}>
        <div>
          <div className={styles.top_text}>
              {prod.price <= 25 ? (<><span className={styles.discount}>Offer </span> <span className={styles.discount}>30%</span></>) : (<><span className={styles.hot}>Hot </span><span className={styles.hot}>80%</span></>)}
          </div>
          <div className={styles.img_container} ><img src={prod.img} alt='2'/></div>
          <div className={styles.bottom_text}>
            <p className={styles.cat}>{prod.cat}</p>
            <p className={styles.name}>{prod.name}</p>
            <p className={styles.price}>$ {prod.price}  <span >$ {prod.price+(prod.price*0.3)}</span></p>
          </div>
        </div>
        </SwiperSlide>
      })
    return(
        <Swiper   
    pagination={{"clickable": true}}
    
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
export default FeaturedWidget
