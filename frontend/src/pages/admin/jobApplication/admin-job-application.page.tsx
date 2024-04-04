import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useAuth, useUser } from "@clerk/clerk-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CheckCheck, Download, Eye, Loader2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const AdminJobApplicationPage = () => {
  const { id: jobId, applicationId } = useParams();

  const [userToken, setUserToken] = useState<String | null>(null);

  // get the user Token
  const { getToken } = useAuth();

  // get user data
  const { user } = useUser();

  useEffect(() => {
    const fetchUserToken = async () => {
      const token = await getToken();

      setUserToken(token);
    };

    fetchUserToken();
  }, []);

  const {
    data: jobApplication,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: [jobId, applicationId],
    queryFn: () =>
      axios
        .get(`/api/jobApplications/${applicationId}`, {
          headers: { Authorization: `Bearer ${userToken}` },
          params: {
            role: user?.publicMetadata.role,
          },
        })
        .then((res) => res.data),
    enabled: userToken !== null,
  });

  // if the page is Loading we show the loader
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-4">
        <Loader2 className="animate-spin" size={60} />
      </div>
    );
  }

  if (isError) {
    return <div>Job application Fetching Error : {error.message}</div>;
  }

  const handleOpenNewWindow = () => {
    window.open(`/${jobApplication?.cv}`,"_blank","noreferrer")
  }
  return (
    <div className="flex flex-col gap-y-4 ">
      <Card className="bg-foreground">
        <CardHeader className="flex-row justify-between items-center">
          <div className="flex justify-center  items-center">
            <CardTitle className="mr-3">{jobApplication?.fullName}</CardTitle>
            <Badge
              className={cn({
                "bg-red-500":
                  jobApplication?.ratings?.toLocaleLowerCase() === "bad",
                "bg-orange-400":
                  jobApplication?.ratings?.toLocaleLowerCase() === "moderate",
                "bg-teal-500":
                  jobApplication?.ratings?.toLocaleLowerCase() === "good",
              })}
            >
              <p className="text-md">
                {jobApplication?.ratings?.toUpperCase()}
              </p>
            </Badge>
          </div>
          <div className="flex justify-end items-center gap-x-3 cursor-pointer">
            <TooltipProvider delayDuration={200}>
              <Tooltip>
                <TooltipTrigger>
                  <a
                    href={`/${jobApplication?.cv}`}
                    download={`${jobApplication?.fullName}-CV-${jobApplication?.ratings}.pdf`}
                  >
                    <Download
                      color="brown"
                      className="transition-transform duration-5000 ease-in-out relative hover:-translate-y-1 text-brown"
                    />
                  </a>
                </TooltipTrigger>
                <TooltipContent>Download CV</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider delayDuration={200}>
              <Tooltip>
                <TooltipTrigger>
                  <Eye
                    color="blue"
                    className="transition-transform duration-5000 ease-in-out relative hover:-translate-y-1 text-brown"
                    onClick={handleOpenNewWindow}
                  />
                </TooltipTrigger>
                <TooltipContent>View CV</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider delayDuration={200}>
              <Tooltip>
                <TooltipTrigger>
                  <a href="#">
                    <CheckCheck
                      color="green"
                      className="transition-transform duration-5000 ease-in-out relative hover:-translate-y-1 text-brown"
                    />
                  </a>
                </TooltipTrigger>
                <TooltipContent>Accept CV</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider delayDuration={200}>
              <Tooltip>
                <TooltipTrigger>
                  <X
                    color="red"
                    className="transition-transform duration-5000 ease-in-out relative hover:-translate-y-1 text-brown"
                  />
                </TooltipTrigger>
                <TooltipContent>Reject CV</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </CardHeader>
      </Card>

      {jobApplication?.job?.questions?.map(
        (question: string, index: number) => (
          <div key={index}>
            <Card className="p-4 my-2 text-justify">
              <strong>{`${index + 1}. ${question}`}</strong>
            </Card>
            <Card className="p-4 bg-[#c3fe7ad4] text-justify">
              {jobApplication?.answers[index]}
            </Card>
          </div>
        )
      )}
      <div>
        <Button variant="link" asChild>
          <Link to={`/admin/job/${jobId}`}>Back</Link>
        </Button>
      </div>
    </div>
  );
};

export default AdminJobApplicationPage;
