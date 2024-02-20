import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { QueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

const JobCreatePage = () => {
  // toast hook
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "",
    location: "",
    q1: "",
    q2: "",
    q3: "",
  });

  const queryClient = new QueryClient();
  const navigate = useNavigate();

  const { isPending, mutate: createJob } = useMutation({
    mutationFn: async () => {
      return axios.post("/api/jobs", formData).then((res) => res.data);
    },
    onSuccess: (newJob) => {
      queryClient.setQueryData(["jobs", newJob._id], newJob);
      navigate("/admin/jobs");

      // show success notification to the user
      toast({
        title: "Job posted Successfully",
      });
    },
    onError: (error) => {
      // show error to the user
      toast({
        title: "oops, There was an error",
        description: error.message,
        variant: "destructive",
      });
      console.log(error);
    },
  });

  const handleChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // mutate the tenstack mutation function
    createJob();
  };

  return (
    <div>
      <div className="py-8">
        <h2>Create A Job Posting</h2>
      </div>
      <form className="py-8" onSubmit={handleSubmit}>
        <div>
          <h3>Title</h3>
          <Input
            className="mt-2"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mt-4">
          <h3>Description</h3>
          <Textarea
            className="mt-2"
            name={"description"}
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mt-4">
          <h3>Type</h3>
          <Input
            className="mt-2"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mt-4">
          <h3>Location</h3>
          <Input
            className="mt-2"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mt-4">
          <h3>Question 1</h3>
          <Textarea
            className="mt-2"
            name={"q1"}
            value={formData.q1}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mt-4">
          <h3>Question 2</h3>
          <Textarea
            className="mt-2"
            name={"q2"}
            value={formData.q2}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mt-4">
          <h3>Question 3</h3>
          <Textarea
            className="mt-2"
            name={"q3"}
            value={formData.q3}
            onChange={handleChange}
            required
          />
        </div>

        <Button
          type="submit"
          className="mt-8 bg-card text-card-foreground flex gap-x-3"
          disabled={isPending}
        >
          {isPending && <Loader2 className="animate-spin" />}
          Submit
        </Button>
      </form>
    </div>
  );
};

export default JobCreatePage;
