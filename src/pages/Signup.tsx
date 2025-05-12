import SignupForm from "@/components/features/forms/SignupForm";
import AuthCard from "../components/layouts/AuthCard";
import AuthFormCard from "@/components/layouts/AuthFormCard";

const Signup = () => {
  return (
    <AuthCard>
      <AuthFormCard
        title={"Sign Up"}
        description={"Create an account by filling in the information below"}
      >
        <SignupForm />
      </AuthFormCard>
    </AuthCard>
  );
};

export default Signup;
