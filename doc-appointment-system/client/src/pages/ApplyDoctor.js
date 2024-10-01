import React from 'react'
import Layout from '../components/Layout'
import { Col, Form, Input, Row,TimePicker,message } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import FormItem from 'antd/es/form/FormItem'
import {hideLoading, showLoading} from '../redux/features/alertSlice'
import axios from 'axios'

const ApplyDoctor = () => {
const {user} = useSelector(state=>state.user)
const dispatch=useDispatch()
const navigate = useNavigate()
//handle form
const handleFinish =async(values)=>{
    try {
      dispatch(showLoading())
      const res = await axios.post('/api/v1/user/apply-doctor',
      {...values,userId:user._id},{
        headers:{
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      dispatch(hideLoading())
      if(res.data.success){
        message.success(res.data.message)
        navigate('/')
      }else{
        message.error(res.data.success)
      }
    } catch (error) {
      dispatch(hideLoading())
      console.log(error)
      message.error('something went wrong')
    }
  }
  return (
    <div>
  <Layout>
    <h1 className='text-center'>ApplyDoctor</h1>
   <Form layout='vertical' onFinish={handleFinish} className='m-3'>
   <h4 className=''>Personal Details</h4>
    <Row> 
      <Col className='colomn'>
          <FormItem label="first name" name="firstName" required rules={[{required:true}]}>
            <Input type='text' placeholder='your first name'/>
          </FormItem>
          <FormItem label="last name" name="lastName" required rules={[{required:true}]}>
            <Input type='text' placeholder='your last name'/>
          </FormItem>
          <FormItem label="phone" name="phone" required rules={[{required:true}]}>
            <Input type='number' placeholder='phone number'/>
          </FormItem>
          </Col>
          <Col className='colomn'>
          <FormItem label="email" name="email" required rules={[{required:true}]}>
            <Input type='email' placeholder='enter email'/>
          </FormItem>
          <FormItem label="website" name="website"  rules={[{required:false}]}>
            <Input type='text' placeholder='website name'/>
          </FormItem>
          <FormItem label="address" name="address" required rules={[{required:true}]}>
            <Input type='text' placeholder='enter address'/>
          </FormItem>
      </Col>
      </Row>
      <Row>
        <h4>Professional Details</h4>
        <Col className='colomn'>
        <FormItem label="Specialization" name="specialization" required rules={[{required:true}]}>
            <Input type='text' placeholder='enter specialization'/>
          </FormItem>
          <FormItem label="Experiance" name="experiance" required rules={[{required:true}]}>
            <Input type='text' placeholder='enter experiance'/>
          </FormItem>
          <FormItem label="Fees Per Consultation" name="feesperconsultation" required rules={[{required:true}]}>
            <Input type='text' placeholder='enter fees per consultation'/>
          </FormItem>
        </Col>
        <Col>
        <FormItem label="Timing" name="timing" 
        // required rules={[{required:true}]}
        >
          <TimePicker.RangePicker format="HH:mm"  />
          </FormItem>
        </Col>
        <Col className='colomn'></Col>
        <Col className='colomn'>
        <button className='btn1' type='submit'>Submit</button>
        </Col>
      </Row>
   
   </Form>
  </Layout>
    </div>
  )
}

export default ApplyDoctor