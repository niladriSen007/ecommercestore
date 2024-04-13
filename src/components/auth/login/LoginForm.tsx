"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const LoginForm = () => {
  const [loading,setLoading] = useState(false);

  const { toast } = useToast()
  const router = useRouter();


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password:""
    },
  });



  const onSubmit = async(values: z.infer<typeof formSchema>) => {
    setLoading(true)
    try {
     const {data} = await axios.post("/api/auth/user/login", values);
 
     if(data?.success){
       setLoading(false)
       router.push("/");
       toast({
         variant: "default",
         title: "Login successful",
         description: "You have successfully logged in to Sneakkerz",
       })
     }
 
    } catch (error : any) {
     setLoading(false)
     toast({
       variant: "destructive",
       title: "Login failed",
       description: error.response.data.error,
     })
  }
  }

  const handleKeyPress = (
    e:
      | React.KeyboardEvent<HTMLInputElement>
      | React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  return (
    <div className="shadow-xl">
      <Form {...form} >
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="border border-zinc-500 px-8 py-12 rounded-2xl"
        >
          <div className="text-center flex flex-col gap-5 mb-5 ">
            <p className="text-black font-bold text-2xl">Login to Sneakkerz</p>
            <p className="text-gray-500">Enter your email below to login to your account</p>
          </div>
          <div className="flex flex-col gap-3 my-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email address</FormLabel>
                <FormControl>
                  <Input  placeholder="projectmayhem@fc.com" {...field} onKeyDown={handleKeyPress} />
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
                  <Input placeholder="••••••••" {...field} onKeyDown={handleKeyPress} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          </div>
          <Button type="submit" className="w-full">{ loading ? "Loading..." :"Login" }</Button>
          <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="underline">
            Sign up
          </Link>
        </div>
        </form>
      </Form>
    </div>
  );
};
export default LoginForm;
