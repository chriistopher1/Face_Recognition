import * as z from "zod";

const validImageExtensions = [".jpg", ".png"];

import { isNimTaken } from "../appwrite/api";

export const registerValidation = z.object({
  name: z.string().min(2).max(50),
  nim: z.string().min(2).max(50).refine(async (value) => {
    // Check if the nim is taken using an asynchronous function
    const isTaken = await isNimTaken(value);
    // Return true if the nim is not taken, false otherwise
    return !isTaken;
  }, {
    message: "NIM is already taken",
  }),
  face: z.custom<File[]>()
});

export const loginValidation = z.object({
  nim: z.string().min(2).max(50).refine(async (value) => {
    // Check if the nim is taken using an asynchronous function
    const isTaken = await isNimTaken(value);
    // Return false if there is no nim found
    return isTaken;
  }, {
    message: "Not found in database",
  }),
});