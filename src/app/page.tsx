"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ScaleLoader from "react-spinners/ScaleLoader";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Home() {
  const [phoneNumber, setPhoneNumber] = useState<string>(""); // Specify type for phoneNumber
  const [password, setPassword] = useState<string>(""); // Specify type for password
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      await signIn("credentials", {
        phoneNumber,
        password,
        redirectTo: "/dashboard",
      });
      router.push("/dashboard");
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.message("Invalid phone number or password");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="w-full lg:grid h-screen  lg:grid-cols-2 ">
        <div className="flex items-center justify-center py-12">
          <div className="mx-auto grid w-[350px] gap-6">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">Login</h1>
              <p className="text-balance text-muted-foreground">
                Enter your email below to login to your account
              </p>
            </div>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="phoneNumber">Phone number</Label>
                <Input
                  id="phoneNumber"
                  type="number"
                  placeholder="(0)"
                  value={phoneNumber}
                  onChange={(event) => setPhoneNumber(event?.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="/forgot-password"
                    className="ml-auto inline-block text-sm underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                {loading ? (
                  <ScaleLoader color="white" width={5} height={15} />
                ) : (
                  "Login"
                )}
              </Button>
            </div>
          </div>
        </div>
        <div className="hidden bg-muted lg:block">
          <Image
            src="/placeholder.svg"
            alt="Image"
            width="1920"
            height="1080"
            className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          />
        </div>
      </div>
    </form>
  );
}
