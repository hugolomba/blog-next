"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "../auth";
import { headers } from "next/dist/server/request/headers";

// Update user
export async function updateUser({
  id,
  name,
  bio,
  avatarUrl,
}: {
  id: string;
  name: string;
  bio: string | null;
  avatarUrl: string | null;
}) {
  const updatedUser = await prisma.user.update({
    where: { id },
    data: {
      name,
      bio: bio || null,
      image: avatarUrl || null,
    },
  });

  revalidatePath(`/user/`);

  return updatedUser;
}

// Delete user
export async function deleteUser() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const response = await prisma.user.delete({
    where: {
      id: session!.user!.id,
    },
  });

  if (response) {
    console.log(`User with ID ${session!.user!.id} deleted successfully.`);
  } else {
    console.log(`Failed to delete user with ID ${session!.user!.id}.`);
  }

  return response;
}
