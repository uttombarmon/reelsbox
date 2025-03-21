"use client";
import { signOut } from 'next-auth/react';
import React from 'react'

function LogOut() {
    const handleSignOut = () =>{
        signOut();
    }
  return (
    <button className=' btn btn-info' onClick={handleSignOut}>LogOut</button>
  )
}

export default LogOut