import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../Types/userTypes'
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRouter = () => {
    const {userInfo} = useSelector((state: RootState) => state.auth);
  return userInfo ? <Outlet/> : <Navigate to='/login' replace/>;
}

export default PrivateRouter