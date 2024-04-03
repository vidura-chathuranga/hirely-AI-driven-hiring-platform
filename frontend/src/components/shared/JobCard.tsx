import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Briefcase, Loader2, MapPin, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import ConfirmationModal from "./ConfirmationModal";
import { useEffect, useState } from "react";
import axios from "axios";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { useToast } from "../ui/use-toast";
import { useAuth, useUser } from "@clerk/clerk-react";

type JoCardProps = {
  _id: String;
  title: String;
  type: String;
  location: String;
  isAdmin: boolean;
};

const JobCard = (props: JoCardProps) => {
  const [confirmModal, setConfirmModal] = useState(false);
  const [userToken, setUserToken] = useState<String | null>(null);

  const showConfirmationModal = () => {
    setConfirmModal(true);
  };

  const navigate = useNavigate();

  // get the user Token
  const { getToken,userId } = useAuth();

  // get user data
  const { user } = useUser();

  useEffect(() => {
    const fetchUserToken = async () => {
      const token = await getToken();

      setUserToken(token);
    };

    fetchUserToken();
  }, []);

  // toast hook
  const { toast } = useToast();

  const queryClient = new QueryClient();

  // create delete job mutation
  const { isPending, mutate: deleteJob } = useMutation({
    mutationFn: () => {
      return axios
        .delete(`/api/jobs/${props._id}`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
          params: {
            role: user?.publicMetadata.role,
          },
        })
        .then((res) => res.data);
    },
    onSuccess: async (res: any) => {
      await queryClient.refetchQueries({ queryKey: ["jobs", "admin",userId] });

      navigate(0);
      console.log(res);
      // confirm model close
      setConfirmModal(false);

      // show success notification to the user
      toast({
        title: `${res?.data?.deletedJob?.title} Job deleted Successfully`,
      });
    },
    onError: (error) => {
      // show error to the user
      toast({
        title: "oops, There was an error",
        description: error.message,
        variant: "destructive",
      });
      // confirm model close
      setConfirmModal(false);

      console.log(error);
    },
  });

  // delete job handler
  const handleDeleteJob = async () => {
    deleteJob();
  };
  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex justify-between">
            <CardTitle>{props.title}</CardTitle>
            {isPending ? (
              <Loader2 className="animate-spin" size={30} />
            ) : (
              props.isAdmin && (
                <span
                  className="cursor-pointer hover:bg-green-100 hover:rounded-full p-1"
                  onClick={showConfirmationModal}
                >
                  <Trash2 />
                </span>
              )
            )}
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
      <ConfirmationModal
        open={confirmModal}
        setOpen={setConfirmModal}
        handleDeleteJob={handleDeleteJob}
      />
    </>
  );
};

export default JobCard;
