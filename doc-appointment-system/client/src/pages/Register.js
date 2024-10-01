import React from 'react';
import "../styles/RegisterStyles.css";
import {Form, Input, message} from 'antd';
import axios from 'axios'
import {useDispatch} from 'react-redux';
import { showLoading,hideLoading } from '../redux/features/alertSlice';
import {Link , useNavigate} from 'react-router-dom';



const Register = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const onfinishHandler =async(values) =>{
    try{
      dispatch(showLoading())
          const res = await axios.post("/api/v1/user/register",values)
      dispatch(hideLoading())
          if(res.data.success){
            message.success('register successfully')
            navigate("/login");
          }
          else{
            message.error(res.data.message)
          }
    }catch(error){
      dispatch(hideLoading())
      console.log(error)
      message.error('something went wrong')
    }
  }
  return (
  <>
       
       {/* <div className="wrapper">
<div className="login-box">
<Form layout="'vertical" onFinish={onfinishHandler} className='register-form'>
    <h2>Register</h2>

    <div className="input-box">
      <span className="icon">
        <ion-icon name="mail"></ion-icon>
      </span>
      <Form.Item label="Name" name="name">
            <Input type='text' required />
          </Form.Item>
    </div>
    <div className="input-box">
      <span className="icon">
        <ion-icon name="mail"></ion-icon>
      </span>
      <Form.Item label="email" name="email">
            <Input type='email' required />
          </Form.Item>
    </div>
    <div className="input-box">
      <span className="icon">
        <ion-icon name="lock-closed"></ion-icon>
      </span>
      <Form.Item label="password" name="password">
            <Input type='password' required />
          </Form.Item>
    </div>

    
 <button className='btn btn-primary' type='submit'>Register</button>

    <div className="register-link">
         <Link to="/login" className='m-3'> Already user login here</Link>     
    </div>
  </Form>
</div>

</div> */}
 
     <div className='form-container'>
         <Form layout="'vertical" onFinish={onfinishHandler} className='register-form'>
          <h3 className='text-center'>Register Form</h3>
          <Form.Item label="Name" name="name">
            <Input type='text' required />
          </Form.Item>
          <Form.Item label="email" name="email">
            <Input type='email' required />
          </Form.Item>
          <Form.Item label="password" name="password">
            <Input type='password' required />
          </Form.Item>
          <Link to="/login" className='m-3'> Already user login here</Link>
         <button className='btn btn-primary' type='submit'>Register</button>

         </Form>
     </div>
     

  </>
  )
}

export default Register