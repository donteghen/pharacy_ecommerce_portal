
import React from 'react';

import Slider from './homecomponents/Slider';
import CategoryWidget from './homecomponents/CategoryWidget'
import SectionHeader from './homecomponents/SectionHeader';
import FeaturedWidget from './homecomponents/FeaturedWidget';

const Home = (props)=>{
    const sectionHeaderText = {
        first:{mainHeader:'Med by category', subHeader:'A highly efficient slip-ring scanner for today\'s diagnostic requirements.', btnText:'View all products'},
        second:{mainHeader:'Featured', subHeader:'Other products we thought you would love. Check them out.', btnText:'View more'}
    }
   return (      
            <div >
                <div style={{margin:'10px 0'}}><Slider></Slider></div>
                <div className='container'>
                    <div><SectionHeader first={sectionHeaderText.first}/></div>
                    <div><CategoryWidget/></div>
                </div>
                <div style={{margin:'10px 0'}}>
                    <div className='container' >
                        <div><SectionHeader first={sectionHeaderText.second}/></div> 
                        <div><FeaturedWidget/></div>
                    </div>
                </div>
            </div>
       ) 
}
export default Home;