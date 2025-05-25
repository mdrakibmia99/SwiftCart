"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registrationSchema } from "./registerValidation";
import { registerUser } from "@/services/AuthService";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { useEffect, useState } from "react";
import { PasswordInput } from "@/components/ui/password-input";
import Link from "next/link";
import { toast } from "sonner";
import HelperFooter from "@/components/shared/HelperFooter";
// import Logo from "@/assets/svgs/Logo";

const passwordRequirements = [
  { label: "One uppercase letter", test: (pw: string) => /[A-Z]/.test(pw) },
  { label: "One lowercase letter", test: (pw: string) => /[a-z]/.test(pw) },
  { label: "One number", test: (pw: string) => /[0-9]/.test(pw) },
  {
    label: "One special character",
    test: (pw: string) => /[!@#$%^&*(),.?\":{}|<>]/.test(pw),
  },
  { label: "Minimum 8 characters", test: (pw: string) => pw.length >= 8 },
];

export default function RegisterForm() {
  const form = useForm({ resolver: zodResolver(registrationSchema) });
  const {
    formState: { isSubmitting },
  } = form;
  const password = form.watch("password") || "";
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const router = useRouter();
  const { setIsLoading } = useUser();

  useEffect(() => {
    const valid = passwordRequirements.every((rule) => rule.test(password));
    setIsPasswordValid(valid);
  }, [password]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await registerUser(data);
      setIsLoading(true);
      if (res?.success) {
        toast.success(res.message);
        router.push("/");
      } else {
        toast.error(res.message);
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <div className="bg-white border border-gray-200 shadow-md rounded-2xl p-6 w-full max-w-md mx-auto space-y-6">
      <div className="flex items-center gap-3">
        {/* <Logo /> */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Create Account</h2>
          <p className="text-sm text-gray-500">
            Join SwiftCart and start shopping today
          </p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="you@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordInput {...field} />
                </FormControl>

                <div className="mt-2 space-y-1">
                  {passwordRequirements.map((rule, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          rule.test(password) ? "bg-green-600" : "bg-gray-300"
                        }`}
                      />
                      <span
                        className={`${
                          rule.test(password)
                            ? "text-green-600"
                            : "text-gray-400"
                        }`}
                      >
                        {rule.label}
                      </span>
                    </div>
                  ))}
                </div>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full" disabled={!isPasswordValid} type="submit">
            {isSubmitting ? "Registering..." : "Register"}
          </Button>
        </form>
      </Form>

      <p className="text-sm text-center text-gray-600">
        Already have an account?{" "}
        <Link href="/login" className="text-primary hover:underline">
          Login here
        </Link>
      </p>
      <div>
        <HelperFooter />
      </div>
    </div>
  );
}
