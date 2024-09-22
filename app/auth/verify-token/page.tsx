import CardWrapper from "../(components)/card-wrapper";
import EmailVerification from "../(components)/email-verification";

const page = () => {


  return (
    <CardWrapper
      title={"Account Verification 🤵"}
      linkBtnHref={"/auth/sign-in"}
      linkBtnText={"Back to Login"}
    >
     <EmailVerification />
    </CardWrapper>
  );
};

export default page;
