import axios from 'axios';
import {LOGIN_USER, LOGOUT_USER, GET_USER, SIGNUP_USER} from './types'

const url= 'http://localhost:5000';
export const getUser = (token) => async (dispatch) =>{
    const res = await axios.get(url+'/api/users/profile', {
        headers:{
            Authorization:`Bearer ${token}` 
        }
    })
    dispatch({type:GET_USER, payload:res.data})
}
export const loginUser = (email, password, history) => async (dispatch) => {
    const res = await axios.post(url+'/api/users/login', {email:email, password:password});
    
    localStorage.setItem('user_token', res.data.token)
    history.goBack()
    dispatch({type:LOGIN_USER, payload:res.data})
}

export const logoutUser = (history) => async (dispatch) =>{
    const token = localStorage.getItem('user_token');
    await axios.post('http://localhost:5000/api/users/profile/logout', {
        headers:{
            Authorization:`Bearer ${token}`  
        }
    })
    localStorage.removeItem('user_token')
    history.push('/')
    dispatch({type:LOGOUT_USER})
} 

export const signupUser = (newUser, history) => async (dispatch) =>{
    const res =  await axios.post(url+'/api/users', {
        name:newUser.name,
        surName: newUser.surName,
        address: newUser.address,
        city: newUser.city,
        email: newUser.email,
        password: newUser.password,
    })
    localStorage.setItem('user_token', res.data.token);
    history.goBack()
    dispatch({type:SIGNUP_USER, payload:res.data})
}