import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

import { Briefcase, MapPin } from "lucide-react";
import { useParams } from "react-router-dom";

const JobPage = () => {
  const { id: jobId } = useParams();

  const job = {
    title: "Intern - Software Engineer",
    type: "Full-time",
    location: "Remote",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Architecto possimus nemo in quis qui odio explicabo velit magni deserunt. Saepe porro molestias repellat accusamus! Cumque pariatur fugiat vel libero iste.",
    questions: [
      "What is your campus?",
      "what is your favourite language?",
      "How old are you?",
    ],
  };

  const handleSubmit = async () => {};
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
      <form className="py-8" onSubmit={handleSubmit}>
        <div>
          <h3>Full Name</h3>
          <Input
            className="mt-2"
            name="fullname"
            // value={FormData.fullname}
            // onChange={handleChange}
            required
          />
        </div>

        {/* job questions */}
        {job.questions.map((ques, index) => (
          <div key={index} className="mt-4">
            <h3>{ques}</h3>
            <Textarea
              className="mt-2"
              name={`a${index + 1}`}
              //   value={
              //     formData[
              //       `a${index + 1}` as keyof Omit<keyof formData, "fullName">
              //     ]
              //   }
              required
            />
          </div>
        ))}
      </form>
    </div>
  );
};
export default JobPage;
