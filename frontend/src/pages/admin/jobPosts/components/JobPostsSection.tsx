import JobCard from "@/components/shared/JobCard";
import JobProTypes from "@/types/job";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Loader2 } from "lucide-react";

const JobPostsSection = () => {
  // const jobs = [
  //   {
  //     _id: "xyz",
  //     title: "Intern - Software Engineer",
  //     type: "Full-time",
  //     location: "Remote",
  //   },
  //   {
  //     _id: "abc",
  //     title: "Software Engineer",
  //     type: "Full-time",
  //     location: "Remote",
  //   },
  // ];

  //
  const {
    isLoading,
    error,
    isError,
    data: jobs,
  } = useQuery({
    queryKey: ["jobs", "admin"],
    queryFn: () => axios.get("/api/jobs").then((res) => res.data),
  });

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
