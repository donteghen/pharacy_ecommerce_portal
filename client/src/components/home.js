
import React from 'react';

import Slider from './homecomponents/Slider';
import CategoryWidget from './homecomponents/CategoryWidget'
import SectionHeader from './homecomponents/SectionHeader';
import FeaturedWidget from './homecomponents/FeaturedWidget';
import PharmaWidget from './homecomponents/PharmaWidget';

const Home = (props)=>{
    const sectionHeaderText = {
        first:{mainHeader:'Med by category', subHeader:'A highly efficient slip-ring scanner for today\'s diagnostic requirements.', btnText:'View all products'},
        second:{mainHeader:'Featured', subHeader:'Other products we thought you would love. Check them out.', btnText:'View more'},
        third:{mainHeader:'Best Seller', subHeader:'Our customers are rushing and reviewing these amazing products. Give it a try and tell us what you think.', btnText:'View all best seller'},
        forth:{mainHeader:'Shop by Pharmacy', subHeader:'Cjeckout our most hot selling pharmacies, offering prommos and free shipping.', btnText:'View more pharmacies'},
    }
   return (      
            <div >
                <div style={{margin:'10px 0'}}><Slider></Slider></div>
                <div className='container'>
                    <div><SectionHeader first={sectionHeaderText.first}/></div>
                    <div><CategoryWidget/></div>
                </div>
                <div style={{margin:'10px 0', padding:'40px 0'}}>
                    <div className='container' >
                        <div style={{backgroundColor:'#f8f8f8'}}><SectionHeader first={sectionHeaderText.second}/></div> 
                        <div><FeaturedWidget/></div>
                    </div>
                </div>
                <div style={{margin:'10px 0', padding:'40px 0'}}>
                    <div className='container' >
                        <div style={{backgroundColor:'#f8f8f8'}}><SectionHeader first={sectionHeaderText.third}/></div> 
                        <div><FeaturedWidget/></div>
                    </div>
                </div>
                <div style={{margin:'10px 0', padding:'40px 0'}}>
                    <div className='container' >
                        <div style={{backgroundColor:'#f8f8f8'}}><SectionHeader first={sectionHeaderText.forth}/></div> 
                        <div><PharmaWidget/></div>
                    </div>
                </div>
            </div>
       ) 
}
export default Home;