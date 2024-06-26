import { Button } from "@/components/ui/button";
import { SignedIn, UserButton, useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

const AdminMainLayout = () => {
  const { isSignedIn, user, isLoaded } = useUser();

  const navigate = useNavigate();

  // this will redirect user to the home if user is not an ADMIN OR this will redirect user to the LOGIN if user is not loggedin
  useEffect(() => {
    if (isLoaded && isSignedIn && user?.publicMetadata.role !== "admin") {
      navigate("/");
    } else if (isLoaded && !isSignedIn) {
      navigate("/sign-in?redirect=admin");
    }
  }, [isSignedIn, user, isLoaded]);

  return (
    <div>
      <div className="flex py-5 justify-between items-center">
        <Link
          to={"/admin/jobs"}
          className="text-4xl font-medium text-underlay-1"
        >
          HirelyAI
        </Link>
        <div className="flex justify-end items-center py-4 gap-3">
          <Link to={"/admin/jobs"}>Job Posts</Link>
          <Button asChild>
            <Link to={"/admin/job/create"}>Post A Job</Link>
          </Button>
          <SignedIn>
            <UserButton afterSignOutUrl="/sign-in?redirect=admin" />
          </SignedIn>
        </div>
      </div>

      <Outlet />
    </div>
  );
};

export default AdminMainLayout;
