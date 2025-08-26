import React, { useEffect } from 'react'
import NavBar from './NavBar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../utils/userSlice'

const Body = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userData = useSelector((store)=>store.user);
    const fetchUser = async () => {
         
       try{
         if(userData) return;
         const res = await axios.get(BASE_URL+"/profile/view",{
          withCredentials:true,
        });
        //  console.log("uday");
        //  console.log(res);
        dispatch(addUser(res.data));

       }catch(err){
         if(err.status===401)
         {
          navigate("/login");
         }
          console.log(err);
          
       }
    }

    useEffect(()=>{
         fetchUser();
      
       
    },[]);
  return (
    <>
        <NavBar/>
        <Outlet/>
        <Footer/>
    </>
  )
}

export default Body