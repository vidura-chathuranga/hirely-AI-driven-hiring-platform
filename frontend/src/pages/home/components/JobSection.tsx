import JobCard from "@/components/shared/JobCard";
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
    return <Loader2 className="animate-spin" />;
  }

  if (isError) {
    console.log(error.message);
  }
  // const jobs = [
  //   {
  //     _id: "aadasd7a8787asd",
  //     title: "Intern - Software Engineer",
  //     type : "Part Time",
  //     location : "Remote"
  //   },
  //   {
  //     _id: "aadasd734a8787asd",
  //     title: "Intern - Software Engineer",
  //     type : "Part Time",
  //     location : "Remote"
  //   },
  //   {
  //     _id: "aadasd74546a8787asd",
  //     title: "Intern - Software Engineer",
  //     type : "Part Time",
  //     location : "Remote"
  //   },
  // ];
  return (
    <section className="py-8">
      <h2>Available Jobs</h2>
      <div className="mt-4 flex flex-col gap-y-8">
        {jobs?.map((job: any) => (
          <JobCard key={job._id} {...job} isAdmin={false} />
        ))}
      </div>
    </section>
  );
};

export default JobSection;
