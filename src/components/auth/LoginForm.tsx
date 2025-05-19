import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// useState: 컴포넌트의 상태(state)를 관리하기 위한 React Hook
// useCallback: 함수를 메모이제이션하여 불필요한 재생성을 방지하는 Hook
import { useCallback, useState } from "react";
// useNavigate: React Router의 Hook으로, 프로그래밍 방식으로 경로를 변경할 수 있음
import { Link, useNavigate } from "react-router";
import { login } from "@/services/auth.service";

const LoginForm = () => {
  // username 상태 선언 및 초기값 설정
  const [username, setUsername] = useState("");
  // password 상태 선언 및 초기값 설정
  const [password, setPassword] = useState("");
  // navigate 함수 생성: 페이지 이동을 위한 hook
  const navigate = useNavigate();

  // handleSubmit 함수 정의: useCallback으로 메모이제이션하여 성능 최적화
  // username과 password가 변경될 때만 함수가 재생성됨
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault(); // 폼 제출 시 기본 동작인 페이지 새로고침을 방지

      login(
        { username, password },
        () => {
          // 로그인 성공 시 채팅 페이지로 이동
          navigate("/chat");
        },
        ({ message }) => {
          // 로그인 실패 시 에러 메시지 표시
          alert(message);
        },
      );
    },
    [username, password], // 의존성 배열: username 또는 password가 변경되면 handleSubmit을 재생성
  );

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-6">
        <div className="grid gap-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            type="email"
            placeholder="hello@world.com"
            required
            value={username} // 입력 값 상태와 연결 (controlled input)
            onChange={(e) => setUsername(e.target.value)} // 입력 값 변경 시 상태 업데이트
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
          </div>
          <Input
            id="password"
            type="password"
            required
            value={password} // 입력 값 상태와 연결
            onChange={(e) => setPassword(e.target.value)} // 입력 값 변경 시 상태 업데이트
          />
        </div>
        <Button type="submit" className="w-full">
          Login
        </Button>
      </div>
      <div className="mt-4 text-center text-sm">
        Don't have an account?{" "}
        <Link to="/auth/signup" className="underline underline-offset-4">
          Sign up
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
