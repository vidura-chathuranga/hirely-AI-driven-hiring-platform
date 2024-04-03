import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { QueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ZodType, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";

type Inputs = {
  title: string;
  description: string;
  location: string;
  type: string;
  q1: string;
  q2: string;
  q3: string;
};

const jobPostSchema: ZodType<Inputs> = z.object({
  title: z
    .string()
    .min(3, { message: "Title should have at least 3 characters" }),
  description: z
    .string()
    .min(3, { message: "Description should have at least 3 characters" }),
  location: z
    .string()
    .min(3, { message: "Location should have at least 3 characters" }),
  type: z
    .string()
    .min(3, { message: "Type should have at least 3 characters" }),
  q1: z
    .string()
    .min(5, { message: "Qestion should have at least 5 characters" }),
  q2: z
    .string()
    .min(5, { message: "Qestion should have at least 5 characters" }),
  q3: z
    .string()
    .min(5, { message: "Qestion should have at least 5 characters" }),
});

const JobCreatePage = () => {
  const [userToken, setUserToken] = useState<String | null>(null);

  // get the user Token
  const { getToken, userId } = useAuth();

  // get user data
  const { user } = useUser();

  useEffect(() => {
    const fetchUserToken = async () => {
      const token = await getToken();

      setUserToken(token);
    };

    fetchUserToken();
  }, []);

  // toast hook
  const { toast } = useToast();

  // get react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      type: "",
      location: "",
      q1: "",
      q2: "",
      q3: "",
    },
    resolver: zodResolver(jobPostSchema),
  });

  const queryClient = new QueryClient();
  const navigate = useNavigate();

  const { isPending, mutate: createJob } = useMutation({
    mutationFn: async (data: Inputs) => {
      console.log(data);
      return axios
        .post(
          "/api/jobs",
          { ...data, userId },
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
            params: {
              role: user?.publicMetadata.role,
            },
          }
        )
        .then((res) => res.data);
    },
    onSuccess: (newJob) => {
      queryClient.setQueryData(["jobs", newJob._id], newJob);
      queryClient.setQueryData(["jobs", "admin"], newJob);
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

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    createJob(data);
  };

  return (
    <div>
      <div className="py-8">
        <h2>Create A Job Posting</h2>
      </div>
      <form className="py-8" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <h3>Title</h3>
          <Input type="text" className="mt-2" {...register("title")} />
          <span className="text-red-600">{errors?.title?.message}</span>
        </div>
        <div className="mt-4">
          <h3>Description</h3>
          <Textarea className="mt-2" {...register("description")} />
          <span className="text-red-600">{errors?.description?.message}</span>
        </div>
        <div className="mt-4">
          <h3>Type</h3>
          <Input className="mt-2" type="text" {...register("type")} />
          <span className="text-red-600">{errors?.type?.message}</span>
        </div>
        <div className="mt-4">
          <h3>Location</h3>
          <Input className="mt-2" type="text" {...register("location")} />
          <span className="text-red-600">{errors?.location?.message}</span>
        </div>
        <div className="mt-4">
          <h3>Question 1</h3>
          <Textarea className="mt-2" {...register("q1")} />
          <span className="text-red-600">{errors?.q1?.message}</span>
        </div>
        <div className="mt-4">
          <h3>Question 2</h3>
          <Textarea className="mt-2" {...register("q2")} />
          <span className="text-red-600">{errors?.q2?.message}</span>
        </div>
        <div className="mt-4">
          <h3>Question 3</h3>
          <Textarea className="mt-2" {...register("q3")} />
          <span className="text-red-600">{errors?.q3?.message}</span>
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
