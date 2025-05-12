import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const SignupForm = () => {
  return (
    <form>
      <div className="flex flex-col gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="hello@world.com"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Repeat Password</Label>
          <Input id="password" type="password" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="nickname">Nickname</Label>
          <Input
            id="nickname"
            type="text"
            placeholder="Your nickname"
            required
          />
        </div>
        <Button type="submit" className="w-full">
          Create Account
        </Button>
      </div>
      <div className="mt-4 text-center text-sm">
        Already have an account?{" "}
        <a href="#" className="underline underline-offset-4">
          Login
        </a>
      </div>
    </form>
  );
};

export default SignupForm;
