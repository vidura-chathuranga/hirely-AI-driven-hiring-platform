import { SignUp } from "@clerk/clerk-react";

const SignUpPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <SignUp afterSignInUrl={"/home"} signInUrl="/sign-in"/>
    </div>
  );
};

export default SignUpPage;
