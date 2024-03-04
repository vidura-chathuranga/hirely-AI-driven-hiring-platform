import { Separator } from "@radix-ui/react-separator";
import { Briefcase, Loader2, MapPin, MonitorOff } from "lucide-react";
import JobApplicationCard from "./components/JobApplicationCard";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import NotFound from "@/components/shared/NotFound";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";

type JobApplication = {
  _id: string;
  userId: string;
  fullName: string;
  answers: string[];
  job: string;
};
const JobPage = () => {
  const { id: jobId } = useParams();

  const [userToken, setUserToken] = useState<String | null>(null);

  // get the user Token
  const { getToken } = useAuth();

  // get user data
  const {user} = useUser();

  useEffect(() => {
    const fetchUserToken = async () => {
      const token = await getToken();

      setUserToken(token);
    };

    fetchUserToken();
  }, []);

  const {
    isLoading,
    isError,
    error,
    data: job,
  } = useQuery({
    queryKey: ["jobs", "admin", jobId],
    queryFn: () => axios.get(`/api/jobs/${jobId}`).then((res) => res.data),
  });

  const {
    data: jobApplications,
    isLoading: applicationsLoading,
    isError: isApplicationLoadingError,
    error: applicationLoadingError,
  } = useQuery({
    queryKey: ["jobapplications", jobId],
    queryFn: () =>
      axios
        .get(`/api/jobApplications/job/${jobId}`, {
          headers: { Authorization: `Bearer ${userToken}` },
          params : {
            role : user?.publicMetadata.role
          }
        })
        .then((res) => res.data),
    enabled : userToken !== null
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
    return <div>Jobs Fetching Error : {error.message}</div>;
  }
  // const jobApplications = [
  //   {
  //     _id: "1",
  //     fullName: "Vidura Chathuranga",
  //     jobId: "xyz",
  //   },
  // ];
  return (
    <div>
      <div>
        <h2>{job?.title}</h2>
        <div className="flex items-center gap-x-4 mt-4">
          <div className="flex items-center gap-x-2">
            <Briefcase />
            <span>{job?.type}</span>
          </div>
          <div className="flex items-center gap-x-2">
            <MapPin />
            <span>{job?.location}</span>
          </div>
        </div>
      </div>
      <div className="mt-4 py-4">
        <p>{job?.description}</p>
      </div>
      <Separator />
      <div className="py-8">
        <h2>Job Applications</h2>
        <div className="mt-4 flex flex-col gap-y-4">
          {applicationsLoading ? (
            <>
              <div className="my-6 flex justify-center items-center">
                <Loader2 className="animate-spin" />
              </div>
            </>
          ) : isApplicationLoadingError ? (
            <>{applicationLoadingError.message}</>
          ) : jobApplications?.length === 0 ? (
            <NotFound
              message="No application found"
              icon={(_) => <MonitorOff size={50} />}
            />
          ) : (
            jobApplications.map((application: JobApplication) => (
              <JobApplicationCard
                key={application._id}
                fullName={application.fullName}
                _id={application._id}
                jobId={application.job}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default JobPage;
