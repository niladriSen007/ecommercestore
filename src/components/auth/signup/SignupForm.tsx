"use client";
import { useToast } from "@/components/ui/use-toast"
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
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const formSchema = z.object({
  username: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string(),
});

const SignUpForm = () => {

  const [loading,setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
        email:"",
        password:""
    },
  });

  const { toast } = useToast()
  const router = useRouter();

  const onSubmit = async(values: z.infer<typeof formSchema>) =>{
   //console.log(values);
   setLoading(true)
   try {
    const {data} = await axios.post("/api/auth/user/signup", values);

    if(data?.success){
      setLoading(false)
      router.push("/login");
      toast({
        variant: "default",
        title: "Sign up successful",
        description: "You have successfully signed up to Sneakkerz",
      })
    }

   } catch (error : any) {
    setLoading(false)
    toast({
      variant: "destructive",
      title: "Sign up failed",
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
            <p className="text-black font-bold text-2xl">Sign up to Sneakkerz</p>
            <p className="text-gray-500">Enter your details below to sign up to Sneakkerz</p>
          </div>
          <div className="flex flex-col gap-3 my-6">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input  placeholder="Niladri sen" {...field} onKeyDown={handleKeyPress} />
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
          <Button type="submit" className="w-full my-2">{ loading ? "Loading..." : "Sign up"}</Button>
          <div className="mt-6 text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="underline">
            Login
          </Link>
        </div>
        </form>
      </Form>
    </div>
  );
};
export default SignUpForm;
