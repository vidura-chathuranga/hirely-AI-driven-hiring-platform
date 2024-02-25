import { UnlockKeyhole } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

type CustomAlertProps = {
  title: string;
  description: string;
};
const CustomAlert = ({ title, description }: CustomAlertProps) => {
  return (
    <Alert variant={"destructive"} className="w-[40%]">
      <UnlockKeyhole className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
};

export default CustomAlert;
