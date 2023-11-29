import { ID, Query } from "appwrite";

import {  appwriteConfig, databases,  storage } from "./config";

import { IUser } from "@/constants";

export async function isNimTaken(nim: string) {
  try {
    const isAvailable = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("nim", nim)]
    );

    if (isAvailable.documents[0]) return true;
    return false;
  } catch (error) {
    console.log(error);
  }
}

export async function saveUserToDB(user: IUser) {
  try {
    const uploadedFile = await uploadFile(user.face[0]);

    if (!uploadedFile) throw Error;

    // Get file url
    const fileUrl = getFilePreview(uploadedFile.$id);
    if (!fileUrl) {
      await deleteFile(uploadedFile.$id);
      throw Error;
    }

    const newUser = databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        name: user.name,
        nim: user.nim,
        face: fileUrl,
        status: user.status,
      }
    );

    return newUser;
  } catch (error) {
    console.log(error);
  }
}

export async function uploadFile(file: File) {
  try {
    const uploadedFile = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      file
    );

    return uploadedFile;
  } catch (error) {
    console.log(error);
  }
}

export function getFilePreview(fileId: string) {
  try {
    const fileUrl = storage.getFilePreview(
      appwriteConfig.storageId,
      fileId,
      2000,
      2000,
      "top",
      100
    );

    if (!fileUrl) throw Error;

    return fileUrl;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteFile(fileId: string) {
  try {
    await storage.deleteFile(appwriteConfig.storageId, fileId);

    return { status: "ok" };
  } catch (error) {
    console.log(error);
  }
}

export async function getUsers() {
  try {
    const result = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId
    );

    // Assuming your user documents are stored in the "documents" property
    const users = result.documents.map((doc) => ({
      id: doc.$id,
      name: doc.name,
      nim: doc.nim,
      face: doc.face,
      status: doc.status,
    }));

    return users;
  } catch (error) {
    console.error(error);
  }
}

export async function getUserFromNIM(nim: string) {
  try {
    let user = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("nim", nim)]
    );

    if (!user) return null;
    return user.documents[0];
  } catch (error) {
    console.log(error);
  }
}

export async function getUserFromID(nim: string) {
  try {
    let user = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("nim", nim)]
    );

    if (!user) return null;
    return user.documents[0];
  } catch (error) {
    console.log(error);
  }
}

export async function updateUserStatus(id: string ) {
  try {
    const updatedDocument = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      id,
      {
        status: true,
      }
    );

    return updatedDocument;
  } catch (error) {
    console.error("Error updating user status:", error);
    return null;
  }
}

