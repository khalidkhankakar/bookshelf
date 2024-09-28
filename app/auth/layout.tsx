import { Metadata } from "next";


export const metadata:Metadata = {
    title:'Auth'
}

const AuthLayout = ({children}:Readonly<{
    children: React.ReactNode;
  }>) => {
  return (
    <main className="flex bg-black h-screen flex-col items-center justify-center">
        {children}
    </main>
  )
}

export default AuthLayout
