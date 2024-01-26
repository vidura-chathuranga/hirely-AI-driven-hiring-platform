import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

import { Briefcase, MapPin } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { useParams } from "react-router-dom";

const JobPage = () => {
  const { id: jobId } = useParams();

  const [formData, setFormData] = useState({
    fullName: "",
    a1: "",
    a2: "",
    a3: "",
  });

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

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(formData);
  };
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
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
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
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <Button type="submit" className="mt-8 bg-card text-card-foreground">
          Submit
        </Button>
      </form>
    </div>
  );
};
export default JobPage;
