import AuthCard from "@/components/auth/AuthCard";
import LoginForm from "@/components/auth/LoginForm";

const Login = () => {
  return (
    <AuthCard
      title={"Login"}
      description={"Enter your email below to login to your account"}
    >
      <LoginForm />
    </AuthCard>
  );
};

export default Login;
