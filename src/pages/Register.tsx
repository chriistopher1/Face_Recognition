import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { useNavigate, Link } from "react-router-dom"

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

import { registerValidation } from "@/lib/validation";
import FileUploader from "@/components/shared/FileUploader";

import { saveUserToDB } from "@/lib/appwrite/api";
import { IUser } from "@/constants";

const Register = () => {
  const navigate = useNavigate();
  const post = {
    imageUrl: "/public/empty-person.png",
  };
  const form = useForm<z.infer<typeof registerValidation>>({
    resolver: zodResolver(registerValidation),
    defaultValues: {
      name: "",
      nim: "",
      face: [],
    },
  });

  async function onSubmit(values: z.infer<typeof registerValidation>) {
    console.log(values);

    const newUser: IUser = {

      name: values.name,
      nim: values.nim,
      face: values.face,
      status: false
    }

    const response = await saveUserToDB(newUser);

    if (response) {
      console.log("save user to db ok");
      navigate('/');
    }
  }

  return (
    <div className="flex-center w-screen">
      <div className="bg-dark-4 text-white p-5 rounded-lg min-w-[65%] md:min-w-[50%] lg:min-w-[30%]">
        <h2 className="h2-bold">Register</h2>
        <p>Please enter your details</p>
        
        <Link className='underline text-blue-400 pr-5' to='/login'>Login here</Link>
        <Link className='underline text-blue-400 inline' to='/'>Back to Home</Link>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="shad-form_label">
                    Name <FormMessage className="shad-form_message" />
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Name"
                      {...field}
                      className="shad-input"
                      autoComplete="off"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

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

            <FormField
              control={form.control}
              name="face"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="shad-form_label">
                    Face <FormMessage className="shad-form_message" />
                  </FormLabel>
                  <FormControl>
                    <FileUploader
                      fieldChange={field.onChange}
                      mediaUrl={post?.imageUrl}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button type="submit" className="shad-button_primary">
              Register
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Register;
