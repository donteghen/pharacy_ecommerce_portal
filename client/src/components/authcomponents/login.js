
import { Divider } from 'antd';
import React, { useState } from 'react';
import {useHistory} from 'react-router-dom';
import { validateLogin } from '../../utils/validateLogin';

const Login = (props) =>{
    const history = useHistory()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleClick = () =>{
        history.push('/signup')
    }
    const handleSubmit = (e) =>{
      e.preventDefault();
      console.log({email, password})
      const errors = validateLogin({email, password})
      if(Object.keys(errors).length === 0) {
        console.log('good to go')
      }
      console.log(errors)
      //props.signupUser(values)
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
              <label className='active' for="email">Email</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input id="password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
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
export default Login