
import { Divider } from 'antd';
import React, { useState } from 'react';
import {useHistory} from 'react-router-dom';
import { validateLogin } from '../../utils/validateLogin';
import {connect} from 'react-redux';
import * as actions from '../../actions'

const Login = (props) =>{
    const history = useHistory()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({}) 
    
    const handleClick = () =>{
        history.push('/signup')
    }
    const handleSubmit = (e) =>{
      e.preventDefault();
      const errors = validateLogin({email, password})
      if(Object.keys(errors).length === 0) {
        props.loginUser(email, password, history) 
      }
      else{
        setErrors({errors})
      }
    }
    return (
      
        <div className="container" style={{padding:'40px 0'}}>
        <div style={{textAlign:'center'}}>
        <Divider style={{ borderWidth: 5, borderColor: '#2bbbad',fontSize:'30px', fontStyle:'italic'  }}>Sign In</Divider>
        </div>
        <form className="col s12" style={{padding:'20px 0'}} onSubmit={handleSubmit}>
          <div className="row">
            <div className="input-field col s12">
              <input id="email" type="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
              {errors.errors && errors.errors.email && <span style={{color:'red'}}>{errors.errors.email}</span>}
              <label className='active' for="email">Email</label>
            </div>
            
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input id="password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
              {errors.errors && errors.errors.password && <span style={{color:'red'}}>{errors.errors.password}</span>}
              <label className='active' for="password">Password</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
            <button className="btn waves-effect waves-light large" type="submit" name="action">Submit
                <i className="material-icons right">person_add</i>
            </button>
            </div>
          </div>
          
        </form>
        <div className="row">
            <div className="input-field col s12"> Don't have an account yet? 
            <button className="btn waves-effect waves-light large" onClick={handleClick}>Sign Up
                <i className="material-icons right">person</i>
            </button>
            </div>
          </div>
      </div>
    )
}
export default connect(null, actions)(Login)