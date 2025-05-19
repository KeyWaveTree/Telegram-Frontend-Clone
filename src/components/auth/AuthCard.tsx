import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

//Auth 카드 폼 프로퍼티 인터페이스 -> AuthForm 정보는 이러이러한 정보가 있어야 한다. 
interface AuthFormCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

const AuthFormCard = ({ children, title, description }: AuthFormCardProps) => {
  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </div>
  );
};

export default AuthFormCard;
