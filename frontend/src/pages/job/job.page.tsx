import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Briefcase, Loader2, MapPin } from "lucide-react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

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

  const [formData, setFormData] = useState({
    fullName: "",
    a1: "",
    a2: "",
    a3: "",
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
      await axios.post(
        "/api/jobApplications",
        {
          fullName: formData.fullName,
          answers: [formData.a1, formData.a2, formData.a3],
          userId: user?.id,
          job: jobId,
        },
        {
          headers: {
            Authorization: `Bearer ${tokenId}`,
          },
        }
      );

      // todo : show success message to the user

      toast({
        title: "Job application submitted successfully",
      });
      // navigate user to home page
      navigate("/", { replace: true });
    } catch (error: any) {
      // todo : show error notification to the user
      toast({
        title: "Oops, There was an error",
        description: error?.error || error?.data?.message,
        variant: "destructive",
      });
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
