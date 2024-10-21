'use server'
import ResendEmailTemplate from '@/app/auth/(components)/resend-email-template';
import env from '@/env';
import { Resend } from 'resend';
const resend = new Resend(env.RESEND_API_KEY);

export const sendEmail = async ({name,email,token}:{name:string,email:string,token:string}) => {
    try {
        const { error } = await resend.emails.send({
          from: 'Acme <onboarding@resend.dev>',
          to: [email],
          subject: 'Verify your email',
          react: ResendEmailTemplate({ firstName: name,token }),
        });
    
        if (error) {
          return {success: false, message: 'Oops!Email sent failed try again'} ;
        }
    
        return {success: true, message: 'Email sent successfully'} ;
      } catch (error) {
        return {success: false, message: 'Something went wrong'} ;
      }
}
