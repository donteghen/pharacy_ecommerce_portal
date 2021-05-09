import React, { useState } from 'react'
import { MedicineBoxFilled  } from '@ant-design/icons';
import {Link} from 'react-router-dom';
const styles = {
    logo_image:{
        fontSize:'90px', color:'#0275d8'
    }, wrapper_container:{
        margin:'10px 0', padding:'40px 0', backgroundColor:'#f8f8f8'
    },
    sub_btn : {
        height:'40px', width:'50%', borderRadius:'35% 5%', border:'none', backgroundColor:'#0275d8', color:'white'
    }
}
const Footer = (props) => {
    const [email, setEmail] = useState('')
    return (
        <div style={styles.wrapper_container}>
            <div className='container'>
                <div className='row'>
                    <div className='col s12 m6 l3'>
                        <div style={{textAlign:'center'}}><MedicineBoxFilled style={styles.logo_image}/></div>
                        <p>Call us : </p>
                        <h5>+90 536 480 2141</h5>
                        <h6>Nihat Sk, Ataşehir İstanbul</h6>
                        <p>donaldteghen@gmail.com</p>
                    </div>
                    <div className='col s12 m6 l3'>
                        <h5>Services</h5>
                        <p style={{fontStyle:'italic', fontSize:'16px'}}><Link to='/'>Consultation</Link></p>
                        <p style={{fontStyle:'italic', fontSize:'16px'}}><Link to='/'>Return policy</Link></p>
                        <p style={{fontStyle:'italic', fontSize:'16px'}}><Link to='/'>Shipping</Link></p>
                        <p style={{fontStyle:'italic', fontSize:'16px'}}><Link to='/'>Delivery</Link></p>
                    </div>
                    <div className='col s12 m6 l3'>
                        <h5>Our Company</h5>
                        <p style={{fontStyle:'italic', fontSize:'16px'}}><Link to='/'>About Us</Link></p>
                        <p style={{fontStyle:'italic', fontSize:'16px'}}><Link to='/'>Contact</Link></p>
                        <p style={{fontStyle:'italic', fontSize:'16px'}}><Link to='/'>Private Policy</Link></p>
                        <p style={{fontStyle:'italic', fontSize:'16px'}}><Link to='/'>Terms of user</Link></p>
                    </div>
                    <div className='col s12 m6 l3'>
                        <h5>Sign Up for Our Newsletter</h5>
                        <p style={{ fontSize:'14px'}}>Leave your email to get all hot deals & news which benefit you most!</p>
                        <div >
                            <form onSubmit={(e) => {e.preventDefault(); console.log(email); setEmail(''); }}>
                                <input placeholder='Enter Email' value={email} type='email' onChange={(e) => setEmail(e.target.value)}/>
                                <button style={styles.sub_btn}>Subscribe</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Footer