import JobCard from "@/components/shared/JobCard";
import ZeroItems from "@/components/shared/ZeroItems";
import JobProTypes from "@/types/job";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

const JobPostsSection = () => {
  const [userToken, setUserToken] = useState<String | null>(null);

  // get the user Token
  const { getToken, userId, isLoaded } = useAuth();

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
    isLoading,
    error,
    isError,
    data: jobs,
  } = useQuery({
    queryKey: ["jobs", "admin"],
    queryFn: () =>
      axios
        .get(`/api/jobs/admin/${userId}`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
          params: {
            role: user?.publicMetadata.role,
          },
        })
        .then((res) => res.data),
    enabled: isLoaded,
  });

  if (isLoading || !isLoaded) {
    return (
      <div className="h-full flex justify-center items-center">
        <Loader2 size={30} className="animate-spin" />
      </div>
    );
  }
  if (isError) {
    return <div>{error.message}</div>;
  }

  return (
    <section className="py-8">
      <h2>Current Job Postings</h2>
      {isLoading && (
        <div className="flex justify-center my-4 items-center">
          <Loader2 className="animate-spin" size={60} />
        </div>
      )}
      {jobs?.length === 0 && <ZeroItems isHome={false} />}
      <div className="mt-4 flex flex-col gap-y-4">
        {jobs?.map((job: JobProTypes) => {
          return (
            <JobCard
              key={job._id}
              title={job.title}
              type={job.type}
              location={job.location}
              _id={job._id}
              isAdmin={true}
            />
          );
        })}
      </div>
    </section>
  );
};

export default JobPostsSection;
