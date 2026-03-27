import React from 'react'
import LoginForm from '../component/LoginForm'
import WrapPage from '../ui/WrapPage'
import { auth } from '@/auth'

export default async function LoginPage() {

  return (
    <WrapPage>
      <LoginForm/>
    </WrapPage>
  
  )
}

