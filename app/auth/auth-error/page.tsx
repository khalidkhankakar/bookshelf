import CardWrapper from "../(components)/card-wrapper"


const page = () => {
  return (
    <CardWrapper title="Something went wrong" linkBtnHref={"/auth/sign-in"}
    linkBtnText={"Back to Login"}>
      <p className="text-red-500 text-center">Please try again later</p>
      <p className="text-center">or</p>
      <p className="text-red-500 text-center">Account is already exists with another provider</p>
    </CardWrapper>
  )
}

export default page
