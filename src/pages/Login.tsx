import LoginForm from "@/components/features/forms/LoginForm";
import AuthCard from "../components/layouts/AuthCard";
import AuthFormCard from "@/components/layouts/AuthFormCard";

const Login = () => {
  return (
    <AuthCard>
      <AuthFormCard
        title={"Login"}
        description={"Enter your email below to login to your account"}
      >
        <LoginForm />
      </AuthFormCard>
    </AuthCard>
  );
};

export default Login;
