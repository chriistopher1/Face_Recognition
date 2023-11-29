import { UserTable } from "@/components/shared/UserTable";


import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex-center w-screen">
      <div className="bg-dark-4 text-white p-5 rounded-lg min-w-[65%] md:min-w-[50%] lg:min-w-[30%] flex flex-col gap-4">
        <div className="flex gap-4 border-b-2 border-white pb-5">
          <Link
            className="p-3 bg-primary-500 rounded-lg flex-1 text-center"
            to="/login"
          >
            Login
          </Link>
          <Link
            className="p-3 bg-primary-500 rounded-lg flex-1 text-center
          "
            to="/register"
          >
            Register
          </Link>
        </div>
        <UserTable />
      </div>
    </div>
  );
};

export default Home;
