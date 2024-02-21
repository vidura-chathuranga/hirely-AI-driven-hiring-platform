import { SignIn } from "@clerk/clerk-react";

const SignInPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <SignIn afterSignInUrl={"/home"} signUpUrl="/sign-up" />
    </div>
  );
};

export default SignInPage;
