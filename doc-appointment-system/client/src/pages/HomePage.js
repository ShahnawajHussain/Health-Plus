import React,{useEffect,useState} from 'react'
import axios from 'axios'
import Layout from '../components/Layout'
import { Row } from 'antd'
import DoctorList from '../components/DoctorList'

const HomePage = () => {
  const [doctors,setDoctors]=useState([])
  const getUserData =async()=>{
    try {
      const res =await axios.get('/api/v1/user/getAllDoctorss',
      
      {
            headers:{
              Authorization: "Bearer " + localStorage.getItem("token")
            },
      })
      if(res.data.success){
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
        getUserData()
  },[])
  return (
    <Layout>
        <h1 className='text-center'>HOME PAGE</h1>
        <Row>
          {doctors && doctors.map((doctor)=>
            <DoctorList doctor={doctor} />
          )}
        </Row>

    </Layout>
  )
}

export default HomePage