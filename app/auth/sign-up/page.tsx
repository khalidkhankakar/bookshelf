import React from 'react'
import CardWrapper from '../(components)/card-wrapper'
import SignUpForm from '../(components)/register-form'

const SignUp = () => {
  return (
    <CardWrapper title='Create an Account'
    linkBtnHref={"/auth/sign-in"}
    linkBtnText={"Back to Login"}>
      <SignUpForm />
    </CardWrapper>
  )
}

export default SignUp
