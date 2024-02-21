import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Briefcase, Loader2, MapPin } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const JobPage = () => {
  const { id: jobId } = useParams();

  // get user Id
  const user = useUser();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    a1: "",
    a2: "",
    a3: "",
  });

  // data fetching query
  const {
    data: job,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["jobs", jobId],
    queryFn: () => axios.get(`/api/jobs/${jobId}`).then((res) => res.data),
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <Loader2 size={40} className="animate-spin" />
      </div>
    );
  }

  // handling the fetching error
  // todo : Needs to add a toast or message to the user
  if (isError) {
    console.log(error.message);
  }

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/jobApplications", {
        fullName: formData.fullName,
        answers: [formData.a1, formData.a2, formData.a3],
        userId: user.user?.id,
        job: jobId,
      });

      // todo : show success message to the user
      console.log("success");
      // navigate user to home page
      navigate("/home", { replace: true });
    } catch (error: any) {
      // todo : show error notification to the user
      console.log(error.message);
    }
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
        {job.questions.map((ques: string[], index: number) => (
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
