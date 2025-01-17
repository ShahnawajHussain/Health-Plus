import React from 'react'
import Layout from '../components/Layout'
import { Tabs, message } from 'antd'
import {useDispatch, useSelector} from 'react-redux'
import { hideLoading, showLoading } from '../redux/features/alertSlice'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const NotificationPage = () => {
    const navigate= useNavigate()
    const dispatch=useDispatch();
    const {user}=useSelector(state=>state.user)
    const handleMarkAllRead=async()=>{
        try {
            dispatch(showLoading())
            const res = await axios.post('/api/v1/user/get-all-notification',{userId:user._id},
            {
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')}`,
                }
            })
            dispatch(hideLoading())
            if(res.data.success){
                message.success(res.data.message)
            }else{
                message.error(res.data.message)
            }
        } catch (error) {
           dispatch(hideLoading())
            console.log(error)
            message.error("something went wrong")
        }
    }
    const handleDeleteAllRead=async()=>{
        try{
            dispatch(showLoading())
            const res =await axios.post("/api/v1/user/delete-all-notification",{userId:user._id},{
                headers:{
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
         dispatch(hideLoading())
         if(res.data.success){
            message.success(res.data.message)
         }else{
            message.error(res.data.message)
         }
        }catch(error){
            console.log(error)
            message.error("something went wrong")
        }
    }
  return (
    <Layout>
    <h4 className='p-3 text-center'>Notification  page</h4>    
    <Tabs>
        <items tab='unRead' key={0}>
            <div className='d-flex justify-content-end'>
                <h4 className='p-2 text-primary' style={{cursor:"pointer"}} onClick={handleMarkAllRead}>Mark All Read</h4>
            </div>
            {
                user?.notification.map(notificationMgs =>(
                    <div className='card' style={{cursor:"pointer"}}>
                        <div className='card-text'  onClick={()=>navigate(notificationMgs.onClickPath)}>
                           {notificationMgs.message}
                        </div>
                    </div>
                ))
            }
        </items>
        <items tab='Read' key={1}>
            <div className='d-flex justify-content-end'>
                <h4 className='p-2 text-primary' style={{cursor:"pointer"}} onClick={handleDeleteAllRead}>Delete All Read</h4>
            </div>
            {
                user?.seennotification.map(notificationMgs =>(
                    <div className='card' style={{cursor:"pointer"}}>
                        <div className='card-text'  onClick={()=>navigate(notificationMgs.onClickPath)}>
                           {notificationMgs.message}
                        </div>
                    </div>
                ))
            }
        </items>
    </Tabs>
    </Layout>
  )
}

export default NotificationPage