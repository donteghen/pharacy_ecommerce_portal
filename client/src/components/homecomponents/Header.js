import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux'
import styles from './Header.module.css'
import * as actions from '../../actions'
const MainHeader = (props) =>{
  if(localStorage.getItem('user_token')){
    console.log(props.getUser())
  }
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
          <Link to='/login' ><i className="material-icons">account_circle</i></Link>
          <Link to='/' ><i className="material-icons">shopping_cart</i></Link>
        </span>
      </div>
  )
}
export default connect(({auth})=>({auth}), actions)(MainHeader);