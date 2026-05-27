import React from 'react'
import {Navigate} from "react-router"

const ProtectedRoute = ({children}) => {
    const data = localStorage.getItem("accessToken")
    return data ? children : <Navigate to="/login"/>
//     if(!data ){
//         <Navigate to='/login' />     
//     }
//   return (
//     <div>
//       {children}
//     </div>
//   )
}

export default ProtectedRoute
