
'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { setUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { Link, useNavigate } from "react-router-dom";

import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";


interface FormValues {
    email: string;
    password: string;
    rememberMe: boolean;
}

const SignInForm = () => {
  const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>();

  
    const dispatch = useAppDispatch();

    const [login] = useLoginMutation();

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
       try {
      const res = await login(data).unwrap();
      const user = res.data;
     const  token=  res.token
      console.log(token);
      
      dispatch(setUser({ user: user, token: res.token }));
     
       navigate("/");
    // Success toast notification
    toast.success("Login successful!");
  } catch (error: any) {
    console.error("Login error:", error);
      if (error?.status === 401) {
        toast.error("Invalid credentials. Please try again.");
      } else {
        toast.error("Something went wrong. Please try again later.");
      }
    }
  };
    return (
        <div className="p-8 rounded-2xl bg-white border mx-auto max-w-3xl mt-5">
            <h2 className="text-gray-800 text-center text-2xl font-bold">
                Sign in
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
                <div>
                    <label className="text-gray-800 text-sm mb-2 block">Email</label>
                    <div>
                        <Input
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Invalid email address",
                                },
                            })}
                            type="email"
                            placeholder="Enter your email"
                            className={errors.email ? "border-red-500" : ""}
                        />
                        {errors.email && (
                            <span className="text-red-500 text-sm">
                                {errors.email.message}
                            </span>
                        )}
                    </div>
                </div>
                <div>
                    <label className="text-gray-800 text-sm mb-2 block">Password</label>
                    <div>
                        <Input
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters",
                                },
                            })}
                            type="password"
                            placeholder="Enter your password"
                            className={errors.password ? "border-red-500" : ""}
                        />
                        {errors.password && (
                            <span className="text-red-500 text-sm">
                                {errors.password.message}
                            </span>
                        )}
                    </div>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-4">
                
                    <div className="text-sm">
                        <Link to="/auth/forgot-password" className="text-primary hover:underline font-semibold">
                            Forgot your password?
                        </Link>
                    </div>
                </div>

                <div className="!mt-8">
                    <Button type="submit" className="w-full">
                        Sign in
                    </Button>
                </div>

                <p className="text-gray-800 text-sm !mt-8 text-center">
                    Don&apos;t have an account?{" "}
                    <Link
                        to="/auth/signup"
                        className="text-primary hover:underline ml-1 whitespace-nowrap font-semibold"
                    >
                        Register here
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default SignInForm;