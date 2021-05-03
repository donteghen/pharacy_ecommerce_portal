import React from 'react';
import Slider from "react-slick";
import styles from './CategoryWidget.module.css';
import {RightOutlined} from '@ant-design/icons'
import {Button} from 'antd'
const CategoryWidget = () =>{
    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      };  
      const cats =[{name:'cat1', item:41}, {name:'cat1', item:25}, {name:'cat1', item:7},
       {name:'cat1', item:3}, {name:'cat1', item:78}, {name:'cat1', item:10},
       {name:'cat1', item:48},{name:'cat1', item:25}, {name:'cat1', item:45}]
    return (
    <div>
        <div className={`row ${styles.cat_wrapper_title}`}>
                <span className='col s12 l8'>
                    <h4 style={{fontStyle:'italic', fontWeight:'bold'}}>Shop by Category</h4>
                    <p>A highly efficient slip-ring scanner for today's diagnostic requirements.</p> 
                </span>
                <span className='col s12 l4'> <Button shape="round" size='large'
                className={styles.btn_viewAll}>View all products</Button>
                </span>
            </div>
        <div className={`row ${styles.cat_wrapper}`}>
            <Slider {...settings}>
            {cats.map(c => <div key='c.name' className={`col s12 m6 l4 ${styles.cat_img_mixer}`}>
                <span style={{float:'left'}}>
                    <p>{c.name}</p>
                    <p><Button type='primary' shape="round" size='small' >{c.item} items {<RightOutlined />}</Button></p>
                </span>
                <span><img src='https://source.unsplash.com/random' alt='11' 
                style={{float:'right', height:'100px', width:'60%'}}/></span>
            </div>)}
            </Slider>
            <div style={{width:'100%', backgroundColor:'lightcyan', height:'400px', marginTop:'20px'}}>
                hdhdhdhdh
            </div>
        </div>
    </div>
    );

}
export default CategoryWidget;