import React from 'react';
import Slider from "react-slick";
import styles from'./Slider.module.css'
const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 800,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1
};

const HomeSlider = (props) =>{
    return (
        <div className={styles.slider_wrapper}>
           <div className={styles.slider_wrapper_center}>
                <Slider {...settings}>
                    <div>
                        <img src='https://source.unsplash.com/random' alt='1' />
                    </div>
                    <div>
                        <img src='https://source.unsplash.com/daily' alt='2' />
                    </div>
                    <div>
                        <img src='https://source.unsplash.com/user/erondu/daily' alt='2'/>
                    </div>
                    <div>
                        <img src='https://source.unsplash.com/weekly?water' alt='4'/>
                    </div>
                </Slider>
           </div>
        </div>
    )
}
export default HomeSlider

