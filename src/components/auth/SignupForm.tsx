import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signup } from "@/services/auth.service";
import { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router";

const SignupForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const navigate = useNavigate();

  // useCallback은 함수를 메모이제이션하여, 의존성 배열에 나열된 값이 변경될 때만 함수를 재생성한다.
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault(); // 폼 제출 시 기본 동작인 페이지 새로고침을 방지

      if (password !== repeatPassword) {
        alert("Passwords do not match.");
        return;
      }

      // 로그인 API 호출, username과 password를 전달
      signup(
        { username, password, nickname },
        () => {
          alert("정상적으로 회원가입 되었습니다.");
          navigate("/auth/login");
        },
        ({ message }) => {
          alert(message);
        },
      );
    },
    // useCallback 훅의 의존성 배열, username과 password 값이 변경될 때마다 함수 재생성
    [username, password, nickname],
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
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Repeat Password</Label>
          <Input
            id="password"
            type="password"
            required
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="nickname">Nickname</Label>
          <Input
            id="nickname"
            type="text"
            placeholder="Your nickname"
            required
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </div>
        <Button type="submit" className="w-full">
          Create Account
        </Button>
      </div>
      <div className="mt-4 text-center text-sm">
        Already have an account?{" "}
        <Link className="underline underline-offset-4" to={"/auth/login"}>
          Login
        </Link>
      </div>
    </form>
  );
};

export default SignupForm;
