import { useEffect, useState } from "react";

import { getUsers } from "@/lib/appwrite/api";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function UserTable() {
  interface User {
    id: string;
    name: any;
    nim: any;
    face: any;
    status: boolean;
  }

  // Use the User type for the state
  const [users, setUsers] = useState<User[] | undefined>();

  useEffect(() => {
    const useGetUsers = async () => {
      try {
        const usersRespond = await getUsers();
        setUsers(usersRespond);
      } catch (error) {
        // Handle error
        console.error("Error fetching users:", error);
      }
    };

    useGetUsers();
    console.log(users);
  }, []);

  return (
    <Table>
      <TableCaption>Registered Users.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Name</TableHead>
          <TableHead>NIM</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Face</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users ? (
          users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.nim}</TableCell>
              <TableCell>{user.status ? "true" : "false"}</TableCell>
              <TableCell>
                <img src={user.face} className="w-auto h-10"></img>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <div>Loading...</div>
        )}
      </TableBody>
    </Table>
  );
}
