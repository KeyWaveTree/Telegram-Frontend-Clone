// 로그인 및 인증 관련 기본 폼
// 함수형 React 컴포넌트를 생성
interface AuthCardProps {
  children: React.ReactNode;
}

const AuthCard = ({ children }: AuthCardProps) => {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">{children}</div>
    </div>
  );
};

export default AuthCard;
