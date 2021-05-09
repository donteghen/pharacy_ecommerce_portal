import React from 'react';
// import {connect} from 'react-redux'
import { ArrowUpOutlined } from '@ant-design/icons';
import styles from './App.module.css'
import {BackTop} from 'antd';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Home from './home';
import MainHeader from './homecomponents/Header';
import Login from './authcomponents/login';
import SignUp from './authcomponents/signup';
import UserProfile from './profiles/userProfile';
import Footer from './footer';



const App = (props) =>{
 
  return (
    <div>
     <Router>
     <MainHeader></MainHeader>
      <Switch>
        <Route path='/login' component={Login} />
        <Route path='/signup' component={SignUp}/>
        <Route path='/userprofile'component={UserProfile} />
        <Route path='/menshealth'component={UserProfile} />
        <Route path='/' component={Home}/>
      </Switch>
      <Footer/>
    </Router>
    <BackTop>
      <div className={styles.back_up_style}><ArrowUpOutlined /></div>
    </BackTop>
    </div>
  )
}
export default App;
