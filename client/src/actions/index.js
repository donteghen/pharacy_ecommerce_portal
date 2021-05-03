import axios from 'axios';
import {LOGIN_USER, LOGOUT_USER, GET_USER, SIGNUP_USER} from './types'

export const getUser = (token) => async (dispatch) =>{
    const res = await axios.get('/api/users/profile', {
        Headers:{
            Authorization:'Bearer' + token 
        }
    })
    dispatch({type:GET_USER, payload:res.data})
}
export const loginUser = (email, password) => async (dispatch) => {
    const res = await axios.post('/api/users/login', {email:email, password:password});
    localStorage.setItem('user_token', res.data.token)
    dispatch({type:LOGIN_USER, payload:res.data.user})
}

export const logoutUser = () => async (dispatch) =>{
    const token = localStorage.getItem('user_token');
    await axios.post('/api/users/profile/logout', {
        headers:{
            Authorization:'Bearer' + token 
        }
    })
    dispatch({type:LOGOUT_USER, payload:{}})
} 

export const signupUser = (newUser) => async (dispatch) =>{
    const res =  await axios('/api/users', {
        name:newUser.name,
        surName: newUser.surName,
        address: newUser.address,
        city: newUser.city,
        email: newUser.email,
        password: newUser.password,
    })
    localStorage.setItem('user_token', res.data.token)
    dispatch({type:SIGNUP_USER, payload:res.data})
}