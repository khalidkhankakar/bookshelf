import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

const CardWrapper = ({title, children }: {title:string; children: React.ReactNode }) => {
  return (
    <Card className="w-[80vw] md:w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl lg:text-2xl font-bold text-center">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default CardWrapper;
