import React from 'react';
// import {connect} from 'react-redux'
// import styles from './App.module.css'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Home from './home';
import MainHeader from './homecomponents/Header';
import Login from './authcomponents/login';
import SignUp from './authcomponents/signup';
import UserProfile from './profiles/userProfile';



const App = (props) =>{
 
  return (
    <div>
     <Router>
     <MainHeader></MainHeader>
      <Switch>
        <Route path='/login' component={Login} />
        <Route path='/signup' component={SignUp}/>
        <Route path='/userprofile'component={UserProfile} />
        <Route path='/' component={Home}/>
      </Switch>
    </Router>
    </div>
  )
}
export default App;
