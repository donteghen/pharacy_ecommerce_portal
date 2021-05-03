
import { Divider } from 'antd';
import React, { useState } from 'react';
import {useHistory} from 'react-router-dom';
import { validate } from '../../utils/vaidate';

const SignUp = (props) =>{
    const history = useHistory()
    const [name, setName] = useState('');
    const [surName, setSurName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleClick = ()=>{
        history.push('/login')
    }
    const handleSubmit = (e) =>{
      e.preventDefault();
      console.log({name, surName, address, city, email, password})
      const errors = validate({name, surName, address, city, email, password});
      if(Object.keys(errors).length === 0) {
        console.log('good to go')
      }

      console.log(errors)
      //props.signupUser(values)
      
    }
    return (
        <div className="container" style={{padding:'40px 0'}}>
        <div style={{textAlign:'center'}}>
        <Divider style={{ borderWidth: 5, borderColor: '#2bbbad', fontSize:'30px', fontStyle:'italic' }}>Sign Up</Divider>
        </div>
        <form className="col s12" style={{padding:'20px 0'}} onSubmit={handleSubmit} >
          <div className="row">
            <div className='input-field col s6'>
              <input  id="first_name" type="text" value={name} onChange={(e)=>setName(e.target.value)} />
              <label className='active' for="first_name">First Name</label>
            </div>
            <div className="input-field col s6">
              <input id="last_name" type="text" value={surName} onChange={(e)=>setSurName(e.target.value)}/>
              <label className='active' for="last_name">Last Name</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input id="address" type="text" value={address} onChange={(e)=>setAddress(e.target.value)} />
              <label className='active' for="address">Address</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input id="city" type="text"value={city} onChange={(e)=>setCity(e.target.value)}/>
              <label className='active' for="city">City</label>
            </div>
          </div>
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
            <div className="input-field col s12">Have an account already? 
            <button className="btn waves-effect waves-light large" onClick={handleClick}>Log In
                <i className="material-icons right">person</i>
            </button>
            </div>
          </div>
      </div>
    )
}
export default SignUp