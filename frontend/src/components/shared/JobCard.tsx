import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Briefcase, MapPin, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import ConfirmationModal from "./ConfirmationModal";
import { useState } from "react";

type JoCardProps = {
  _id: String;
  title: String;
  type: String;
  location: String;
  isAdmin: boolean;
};

const JobCard = (props: JoCardProps) => {
  const [confirmModal, setConfirmModal] = useState(false);

  const showConfirmationModal = () => {
    setConfirmModal(true);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex justify-between">
            <CardTitle>{props.title}</CardTitle>
            <span
              className="cursor-pointer hover:bg-green-100 hover:rounded-full p-1"
              onClick={showConfirmationModal}
            >
              <Trash2 />
            </span>
          </div>
        </CardHeader>
        <Link
          to={props.isAdmin ? `/admin/job/${props._id}` : `/jobs/${props._id}`}
          className="block"
        >
          <CardContent></CardContent>
          <CardFooter className="gap-x-4">
            <div className="flex items-center gap-x-2">
              <Briefcase />
              <span>{props.type}</span>
            </div>
            <div className="flex items-center gap-x-2">
              <MapPin />
              <span>{props.location}</span>
            </div>
          </CardFooter>
        </Link>
      </Card>
      <ConfirmationModal open={confirmModal} setOpen={setConfirmModal} />
    </>
  );
};

export default JobCard;
