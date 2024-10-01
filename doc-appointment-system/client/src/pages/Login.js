import React from 'react';
import "../styles/RegisterStyles.css";
 import {Input,Form,message} from 'antd';
import {useDispatch} from 'react-redux';
import { showLoading,hideLoading } from '../redux/features/alertSlice';
import {Link,useNavigate} from 'react-router-dom';
import axios from 'axios'

const Login = () => {

const navigate = useNavigate()
const dispatch = useDispatch()
  const onfinishHandler =async(values) =>{
    try{
      dispatch(showLoading()) 
      const res = await axios.post('/api/v1/user/login',values)
      dispatch(hideLoading())
      if(res.data.success){
        localStorage.setItem('token',res.data.token)
        message.success('login successfully')
        navigate('/')
        
      }else{
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
   {/* <div className='wrapper'>
     <div className='form-container'>
    
         <Form layout="'vertical" onFinish={onfinishHandler} className='register-form'>
          <h3 className='log'>Login Form</h3>
         
          <Form.Item label="email" name="email">
            <Input type='email' required />
          </Form.Item>
          <Form.Item label="password" name="password">
            <Input type='password' required />
          </Form.Item>
          <Link to="/register" className='m-3'> not a user register here</Link>
         <button className='btn btn-primary' type='submit'>login</button>

         </Form>
     </div>
     </div> 
  */}
     
  <div className='form-container'>
<Form layout="'vertical" onFinish={onfinishHandler} className='register-form'>
    <h2 className='text-center'>Login</h2>

    <Form.Item label="email" name="email">
            <Input type='email' required />
          </Form.Item>
          <Form.Item label="password" name="password">
            <Input type='password' required />
          </Form.Item>
          <Link to="/register" className='m-3'> not a user register here</Link>
         <button className='btn btn-primary' type='submit'>login</button>

  </Form>
</div>

  </>
  )
}

export default Login