import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

import { updateUserStatus } from "@/lib/appwrite/api";

import { useToast } from "@/components/ui/use-toast";

const Success = ({ id }: { id: string }) => {
  const toast = useToast();

  async function handleClick() {
    const response = updateUserStatus(id);

    console.log(response);
    if (!response) {
      toast.toast({
        title: "Update failed. Please try again",
        variant: "destructive",
      });
      return;
    }

    toast.toast({ title: "Take attendance is success" });
  }

  return (
    <div className="flex-center w-screen">
      <div className="flex flex-col gap-5">
        <Button
          className="p-6 bg-primary-500 rounded-lg text-center text-white text-lg"
          onClick={handleClick}
        >
          Take attendance
        </Button>
        <Link
          className="p-4 bg-primary-500 rounded-lg text-center text-white text-lg"
          to="/"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
};

export default Success;
