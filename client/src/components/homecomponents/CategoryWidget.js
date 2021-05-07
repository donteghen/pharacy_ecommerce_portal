import React from 'react';
import SwiperCore, { Navigation, Pagination, Autoplay} from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import 'swiper/components/navigation/navigation.min.css';
import styles from './CategoryWidget.module.css';


const cats =[{name:'cat4', item:41, img:'https://source.unsplash.com/user/erondu/daily'}, {name:'cat2', item:25, img:'https://source.unsplash.com/weekly?water'}, {name:'cat2', item:7, img:'https://source.unsplash.com/daily'},
       {name:'cat1', item:3, img:'https://source.unsplash.com/random'}, {name:'cat5', item:78, img:'https://source.unsplash.com/daily'}, {name:'cat12', item:10, img:'https://source.unsplash.com/user/erondu/daily'},
       {name:'cat7', item:48, img:'https://source.unsplash.com/weekly?water'},{name:'cat6', item:25,img:'https://source.unsplash.com/random'}, {name:'cat9', item:45,img:'https://source.unsplash.com/daily'}]

SwiperCore.use([Pagination, Navigation, Autoplay]);
const CategoryWidget = () =>{
    
      const renderCats = () =>{
           return cats.map((cat, index)=> <SwiperSlide key={index}>
                  <div className={styles.displaycard}>
                        <div className={styles.displaycard_item_left}><h4>{cat.name}</h4><button>{cat.item} items</button></div>
                        <div className={styles.displaycard_item_right}><img className={styles.cat_Slider_img} src={cat.img} alt='' /></div>
                  </div>
            </SwiperSlide>)
      }
    return (
          <div>
                <Swiper slidesPerView={1} spaceBetween={20} autoplay={{'display':2000}} pagination={{"clickable": true}} navigation={{"clickable": true}} loop={true}
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
                  }} className={styles.mycontainer}>
                  {renderCats()}
                  </Swiper>
          </div>
    )

}
export default CategoryWidget;
