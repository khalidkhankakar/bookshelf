import React from 'react'
import CardWrapper from '../(components)/card-wrapper'
import AuthForm from '../(components)/auth-form'

const SignUp = () => {
  return (
    <CardWrapper title='Sign Up'>
    <AuthForm type='signUp' />
  </CardWrapper>
  )
}

export default SignUp
