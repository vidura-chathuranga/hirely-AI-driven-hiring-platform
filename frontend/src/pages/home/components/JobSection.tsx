import JobCard from "@/components/shared/JobCard";
import ZeroItems from "@/components/shared/ZeroItems";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Loader2 } from "lucide-react";

const JobSection = () => {
  const {
    data: jobs,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["jobs"],
    queryFn: () => axios.get("/api/jobs").then((res) => res.data),
  });

  if (isLoading) {
    return (
      <div className="flex justify-center mt-5">
        <Loader2 className="animate-spin" size={30} />
      </div>
    );
  }

  if (isError) {
    console.log(error.message);
  }

  return (
    <section className="py-8">
      <h2>Available Jobs</h2>
      {jobs?.length === 0 ? (
        <ZeroItems isHome />
      ) : (
        <div className="mt-4 flex flex-col gap-y-8">
          {jobs?.map((job: any) => (
            <JobCard key={job._id} {...job} isAdmin={false} />
          ))}
        </div>
      )}
    </section>
  );
};

export default JobSection;
