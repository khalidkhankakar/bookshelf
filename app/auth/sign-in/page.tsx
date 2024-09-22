import React from 'react'
import CardWrapper from '../(components)/card-wrapper'
import SignInForm from '../(components)/signin-form'


const SignIn = () => {
  return (
      <CardWrapper title='Sign In'
      linkBtnHref={"/auth/sign-up"}
      linkBtnText={"Create an account"}>
        <SignInForm />
      </CardWrapper>
  )
}

export default SignIn
