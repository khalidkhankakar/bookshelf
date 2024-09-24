"use client";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Loader } from "lucide-react";
import { findByTokenAndVerify } from "@/lib/actions/token.actions";
import StatusMessage from "./status-message";

const EmailVerification = () => {
  const searchParams = useSearchParams();
  const [isError, setIsError] = useState<string | undefined>();
  const [isSuccess, setIsSuccess] = useState<string | undefined>();
  const token = searchParams.get("token");

  const verifyTokenSubmit = useCallback(() => {
    if (isError || isSuccess) return;
    if (!token) {
      return setIsError("Token not found");
    }
    findByTokenAndVerify(token).then((data) => {
        setIsError(data.error)
        setIsSuccess(data.success)
      }).catch(() => {
        setIsError('Something went wrong')
      })

  }, [token, isError, isSuccess]);

  useEffect(() => {
    verifyTokenSubmit();
  });

  return (
    <div className="flex flex-col items-center justify-center">
      {(isError || isSuccess) ? (
        <StatusMessage isError={isError} isSuccess={isSuccess} />
      ) : <Loader className="animate-spin" />}
      
    </div>
  );
};

export default EmailVerification;
