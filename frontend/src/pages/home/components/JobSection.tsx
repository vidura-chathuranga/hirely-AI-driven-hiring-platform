import JobCard from "@/components/shared/JobCard";

const JobSection = () => {
  const jobs = [
    {
      _id: "aadasd7a8787asd",
      title: "Intern - Software Engineer",
      type : "Part Time",
      location : "Remote"
    },
    {
      _id: "aadasd734a8787asd",
      title: "Intern - Software Engineer",
      type : "Part Time",
      location : "Remote"
    },
    {
      _id: "aadasd74546a8787asd",
      title: "Intern - Software Engineer",
      type : "Part Time",
      location : "Remote"
    },
  ];
  return (
    <section className="py-8">
      <h2>Available Jobs</h2>
      <div className="mt-4 flex flex-col gap-y-8">
        {jobs.map((job) => (
          <JobCard key={job._id} {...job} isAdmin={false} />
        ))}
      </div>
    </section>
  );
};

export default JobSection;
