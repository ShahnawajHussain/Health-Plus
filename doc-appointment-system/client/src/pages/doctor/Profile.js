import React, { useEffect, useState } from 'react'
import Layout from './../../components/Layout'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Col, Form, Input, Row,TimePicker,message } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import FormItem from 'antd/es/form/FormItem'
import { hideLoading, showLoading } from '../../redux/features/alertSlice'
import moment from 'moment'

const Profile = () => {
    const {user}=useSelector((state) =>state.user)
    const [doctor,setDoctor] = useState(null)
    const params=useParams()
    const dispatch=useDispatch()
    const navigate=useNavigate()
  //update doc detail
   //handle form
   const handleFinish =async(values)=>{
    try {
      dispatch(showLoading())
      const res = await axios.post('/api/v1/doctor/updateProfile',
      {...values,userId:user._id,
      timing:[
        moment(values.timing[0]).format('HH:mm'),
        moment(values.timing[1]).format('HH:mm')
      ]
    },{
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
   //update doc detail
    //get doc details
    const getDoctorInfo=async()=>{
        try {
            const res =await axios.post('/api/v1/doctor/getDoctorInfo',{userId:params.id},{
              headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`
              }
            })
            if(res.data.success){
                setDoctor(res.data.data)
            }
        } catch (error) {
            console.log(error)
        }     
    }
    useEffect(()=>{
      getDoctorInfo();
    },[])
  return (
    <Layout>
        <h1>Manage Profile</h1>
        {doctor && (
          <Form layout='vertical' onFinish={handleFinish} className='m-3' 
          initialValues={{...doctor,timing:[
              moment(doctor.timing[0],'HH:mm'),
              moment(doctor.timing[1],'HH:mm')
            ]
          }}>
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
               <button className='btn1' type='submit'>update</button>
               </Col>
             </Row>
          </Form>
        )}
    </Layout>
  )
}

export default Profile