import React from 'react'
import CardWrapper from '../(components)/card-wrapper'
import AuthForm from '../(components)/auth-form'

const SignIn = () => {
  return (
      <CardWrapper title='Sign In'>
        <AuthForm type='signIn' />
      </CardWrapper>
  )
}

export default SignIn
