import React from 'react'


interface EmailTemplateProps {
    firstName: string;
    token:string;
  }
const ResendEmailTemplate : React.FC<Readonly<EmailTemplateProps>> = ({
    firstName,
    token
  }) => {
  return (
    <div>
    <h1>Welcome, {firstName}!</h1>
    <p>Click here to verify your email: <a href={`http://localhost:3000/auth/verify-token?token=${token}`}>Verify Email</a></p>
  </div>
  )
}

export default ResendEmailTemplate
