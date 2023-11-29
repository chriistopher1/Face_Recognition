import { useNavigate, Link } from "react-router-dom"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

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

import { loginValidation } from "@/lib/validation";

const Login = () => {

  const navigate = useNavigate()

  const form = useForm<z.infer<typeof loginValidation>>({
    resolver: zodResolver(loginValidation),
    defaultValues: {
      nim: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginValidation>) {
    // console.log(values);
    navigate(`/attendance/${values.nim}`)
  }

  return (
    <div className="flex-center w-screen">
      <div className="bg-dark-4 text-white p-5 rounded-lg min-w-[65%] md:min-w-[50%] lg:min-w-[30%]">
        <h2 className="h2-bold">Login</h2>
        <p>Please enter your NIM </p>
        <Link className='underline text-blue-400 pr-5' to='/register'>Register here</Link>
        <Link className='underline text-blue-400 inline' to='/'>Back to Home</Link>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="nim"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="shad-form_label">
                    NIM <FormMessage className="shad-form_message" />
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="NIM"
                      {...field}
                      className="shad-input"
                      autoComplete="off"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button type="submit" className="shad-button_primary">
              Login
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Login;
