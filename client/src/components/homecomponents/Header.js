import React, { useEffect } from 'react';
import {Link, useHistory} from 'react-router-dom';
import {connect} from 'react-redux'
import styles from './Header.module.css'
import * as actions from '../../actions'

const MainHeader = (props) =>{
  //console.log(props)
  const history = useHistory();
  useEffect(()=>{
    if(localStorage.getItem('user_token')){
      const token = localStorage.getItem('user_token');
      props.getUser(token);
    }
    //console.log(props)
  })
  return (
      <div className={styles.wrapper}>
        <Link to='/' className={styles.header_logo}>LOGO</Link>
        <span className={styles.header_center}>
          <Link to='/menshealth' className={styles.header_center_link}>Men's Health</Link>
          <Link to='/womenshealth' className={styles.header_center_link}>Men's Health</Link>
          <Link to='/general' className={styles.header_center_link}>General</Link>
        </span>
        <span className={styles.header_right}>
          <Link to='/' ><i className="material-icons">search</i></Link>
         {!props.auth ?  (<Link to='/login'><i className="material-icons">account_circle</i></Link>):
         (<span style={{cursor:'pointer'}} onClick={()=> props.logoutUser(history)}><i className="material-icons">eject</i></span>)}
          <Link to='/' ><i className="material-icons">shopping_cart</i></Link>
        </span>
      </div>
  )
}
export default connect(({auth})=>({auth}), actions)(MainHeader);