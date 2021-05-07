import React from 'react';
import {Avatar, Image} from 'antd';
import { useHistory } from 'react-router';

const mock = {
    name:'Donald',
    surNane:"Teghen",
    email:"donaldteghen@yahoo.com",
    telephone:'+90536547842',
    address:"Nihat sk atasehir",
    city:'Istanbul'
}
const orderMock = [
    {
    _id:'tw6wt37yw7y2yw',
    total:'101010',
    quantity: 4,
    approval:false,
    processed:false,
    delivered:false,
},
{
    _id:'tw6wt34ed7yw7y2yw',
    total:'134534',
    quantity: 7,
    approval:true,
    processed:true,
    delivered:false,
},
{
    _id:'3wwe447yw7y2yw',
    total:'78010',
    quantity: 14,
    approval:true,
    processed:true,
    delivered:true,
},

]
const renderTable = () =>{
    return orderMock.length < 1 ? <h4 style={{fontStyle:'italic', backgroundColor:'#fffff2', height:'100px'}}>No order history yet.</h4> : (
        <table className='striped highlight centered responsive-table'>
            <thead>
                <tr >
                    <th>ID</th>
                    <th>Quantity</th>
                    <th>Total Price</th>
                    <th>Approved</th>
                    <th>Processed</th>
                    <th>Delivered</th>
                </tr>
            </thead>

            <tbody>
                {orderMock.map(order => (<tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.quantity}</td>
                    <td>{order.total}</td>
                    <td>{order.approval ? (<i className="material-icons green">check</i>) : (<i className="material-icons red">info</i>) }</td>
                    <td>{order.processed ? (<i className="material-icons green">check</i>) : (<i className="material-icons red">info</i>)}</td>
                    <td>{order.delivered ? (<i className="material-icons green">check</i>) : (<i className="material-icons red">info</i>)}</td>
                </tr>))}
            </tbody>
        </table>
    )
}
const renderMock = () => {
    return Object.entries(mock).map(pair => <p key={pair[0]} style={{borderBottom:'dotted red 2px', padding:'10px 0'}}> {pair[0]} : <span style={{fontStyle:'italic', fontWeight:'bold'}}>{pair[1]}</span></p>)
}
const UserProfile = (props) =>{
    const history = useHistory()
    const uploadAvatar = (e) =>{
        console.log(e.target.value)
        e.target.value = ''
    }
    return (
        <div className='row' style={{margin:'10px 0'}}>
           <div className='row z-depth-3' >
                <div className='col s12 l2 ' style={{textAlign:'center', backgroundColor:'#fffff2'}}>
                    <Avatar size={300}
                        src={<Image src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                        />
                        <input type='file' className='input-field' name='avatar' onChange={uploadAvatar}/>
                        {/* <a onClick={uploadAvatar} class="waves-effect waves-light btn-small">upload</a> */}
                </div>
                <div className='col s12 l10' style={{padding:'10px 0'}}>
                    {renderMock()}
                    <button class="btn waves-effect waves-light btn-large" onClick={()=> history.push('/profile/update')}>Edit Profile</button>
                </div>
                    
           </div>
           <div className='row' style={{margin:'10px 0'}}>
                <div className='col s12'>
                <div style={{textAlign:'center'}}><h2 style={{fontStyle:'italic'}}>Your order History</h2></div>
                    {renderTable()}
                </div>
           </div>
        </div>
    )
}
export default UserProfile