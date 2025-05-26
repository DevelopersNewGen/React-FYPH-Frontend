import React, {useEffect} from 'react'
import {UserDetails} from "../../components/user/UserDetails"
import { ResponsiveAppBar } from '../../components/Navbar'
import { useUserAdmin, useUser } from "../../shared/hooks"
import { useParams } from 'react-router-dom';

export const UserDetailPage = () => {
    const {uid} = useParams()
    const {role} = useUser()
    const {user, getUserById} = useUserAdmin()             

    useEffect(() => {
        if (uid) {
        getUserById(uid); 
        }
    }, [uid]);

    return (
        <div>
            <ResponsiveAppBar role={role}/>
            <UserDetails user={user} isAdmin={true}/>
        </div>
          
    );
}