import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Attendance from "./pages/Attendance";

import "./globals.css";

import { Toaster } from "./components/ui/toaster";

const App = () => {
  return (
    <main className="flex h-screen">
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/attendance/:nim" element={<Attendance />}></Route>
        <Route path="/success" element={<Attendance />}></Route>

        <Route index element={<Home />}></Route>
      </Routes>
      <Toaster />
    </main>
  );
};

export default App;
