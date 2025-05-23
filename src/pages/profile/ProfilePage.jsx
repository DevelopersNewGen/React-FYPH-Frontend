import React from 'react'
import {UserDetails} from "../../components/user/UserDetails"
import { ResponsiveAppBar } from '../../components/Navbar'

export const ProfilePage = () => {
  return (
    <div>
      <ResponsiveAppBar/>
      <UserDetails/>
    </div>
    
  )
}
