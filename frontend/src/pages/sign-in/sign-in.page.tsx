import CustomAlert from "@/components/shared/CustomAlert";
import { SignIn } from "@clerk/clerk-react";

import { useSearchParams } from "react-router-dom";

const SignInPage = () => {
  const [searchParams, _] = useSearchParams();

  const redirect = searchParams.get("redirect");

  return (
    <div className="flex flex-col justify-center items-center min-h-screen gap-y-10">
      <div className="flex justify-center w-[100%]">
        {redirect && (
          <CustomAlert
            title={"Login Required to View Job"}
            description={
              "It looks like you need to be logged in to view this specific job. Please log in or sign up to access it."
            }
          />
        )}
      </div>
      <SignIn
        afterSignInUrl={redirect ? `jobs/${redirect}` : "/"}
        afterSignUpUrl={redirect ? `jobs/${redirect}` : "/"}
        signUpUrl="/sign-up"
      />
    </div>
  );
};

export default SignInPage;
