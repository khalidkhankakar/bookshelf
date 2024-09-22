import { MailCheck, TriangleAlert } from "lucide-react";

interface StatusMessageProps {
  isError?: string;
  isSuccess?: string;
}

const StatusMessage = ({ isError, isSuccess }: StatusMessageProps) => {
  if (isError) {
    return (
      <div className="flex items-center bg-red-200 py-2 px-3 justify-center gap-x-5 rounded-md">
        <TriangleAlert color="red" />
        <p className="text-red-500   text-center font-semibold">{isError}</p>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="flex items-center  px-3 justify-center gap-x-5 bg-green-200 rounded-md py-2">
        <MailCheck color="green" />
        <p className="text-green-700 text-center font-semibold">{isSuccess}</p>
      </div>
    );
  }

  return null; // No message to display if both are empty
};

export default StatusMessage;
