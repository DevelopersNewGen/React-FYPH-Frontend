import React from 'react'
import {UserDetails} from "../../components/user/UserDetails"
import { ResponsiveAppBar } from '../../components/Navbar'
import { useUser } from "../../shared/hooks"

export const ProfilePage = () => {
  const {user, role} = useUser()

  console.log(user)
  return (
    <div>
      <ResponsiveAppBar role={role}/>
      <UserDetails user={user}/>
    </div>
    
  )
}
