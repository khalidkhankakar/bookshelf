import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";


const CardWrapper = ({
  title,
  linkBtnHref,
  linkBtnText,
  children,
}: {
  title: string;
  linkBtnHref: string;
  linkBtnText: string;
  children: React.ReactNode;
}) => {
  return (
    <Card className="w-[80vw] md:w-full max-w-md mx-auto p-0 bg-dark-300 text-white border-none shadow-sm shadow-dark-200">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl lg:text-2xl font-bold text-center">
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent>{children}</CardContent>
      <CardFooter className="flex justify-between ">
        <Button variant={"link"} className="w-full text-gray-200">
          <Link href={linkBtnHref}>{linkBtnText}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CardWrapper;
