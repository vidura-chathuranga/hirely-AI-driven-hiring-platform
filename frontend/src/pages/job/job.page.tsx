import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useAuth, useUser } from "@clerk/clerk-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Briefcase, Loader2, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { z } from "zod";

const jobApplicationSchema = z.object({
  fullName: z.string().min(2, { message: "Insert valid name" }),
  a2: z.string().min(5, { message: "Insert proper answer" }),
  a1: z.string().min(5, { message: "Insert proper answer" }),
  a3: z.string().min(5, { message: "Insert proper answer" }),
});

type JobApplication = {
  fullName: string;
  a1: string;
  a2: string;
  a3: string;
};

type JobApplicationWithUserData = {
  fullName: string;
  answers: string[];
  userId: string | undefined;
  job: string | undefined;
};
const JobPage = () => {
  // store session token Id
  const [tokenId, setTokenId] = useState<String | null>("");

  const { id: jobId } = useParams();

  // get user Id
  const { isSignedIn, isLoaded, user } = useUser();

  // use Auth hook from Clerk
  const { getToken } = useAuth();

  // initialize the navigate hook
  const navigate = useNavigate();

  // toast hook
  const { toast } = useToast();

  // create form using react useFrom hook
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: "",
      a1: "",
      a2: "",
      a3: "",
    },
    resolver: zodResolver(jobApplicationSchema),
  });

  // useEffect to fetch the session Token ,
  // if user not logged in then redirect to the sign in page

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      navigate(`/sign-in?redirect=${jobId}`, { replace: true });
    } else {
      getToken().then((res) => setTokenId(res));
    }
  }, [getToken, navigate, isSignedIn, isLoaded]);

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

  const { isPending, mutate: submitJobApplication } = useMutation({
    mutationFn: async (data: JobApplicationWithUserData) => {
      console.log(data);
      return axios
        .post("/api/jobApplications", data, {
          headers: {
            Authorization: `Bearer ${tokenId}`,
          },
        })
        .then((res) => res.data);
    },
    onSuccess: (_) => {
      toast({
        title: "Job application submitted successfully",
      });

      // navigate user to home page
      navigate("/", { replace: true });
    },
    onError: (error: any) => {
      // show error notification to the user
      toast({
        title: "Oops, There was an error",
        description: error.message,
        variant: "destructive",
      });
    },
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

  // handle submit Form
  const submitApplication: SubmitHandler<JobApplication> = async (
    formData: JobApplication
  ) => {
    submitJobApplication({
      fullName: formData.fullName,
      answers: [formData.a1, formData.a2, formData.a3],
      userId: user?.id,
      job: jobId,
    });
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
      <form
        className="py-8"
        onSubmit={handleSubmit((data) => submitApplication(data))}
      >
        <div>
          <h3>Full Name</h3>
          <Input className="mt-2" {...register("fullName")} />
          <span className="text-red-600">{errors?.fullName?.message}</span>
        </div>

        {/* job questions */}
        {job.questions.map((ques: string, index: number) => (
          <div key={index} className="mt-4">
            <h3>{ques}</h3>
            <Textarea className="mt-2" {...register(`a${index + 1}` as any)} />
            <span className="text-red-600">
              {errors.a1?.message || errors.a2?.message || errors.a3?.message}
            </span>
          </div>
        ))}
        <Button
          type="submit"
          className="mt-8 bg-card text-card-foreground"
          disabled={isPending}
        >
          Submit
        </Button>
      </form>
    </div>
  );
};
export default JobPage;
