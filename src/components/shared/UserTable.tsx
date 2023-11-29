import { useEffect, useState } from "react";

import { getUsers } from "@/lib/appwrite/api";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];

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
              <TableCell><img src={user.face} className="w-auto h-10"></img></TableCell>
            </TableRow>
          ))
        ) : (
          <div>Loading...</div>
        )}
      </TableBody>
    </Table>
  );
}
