import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // import database client

export async function GET() {
  const posts = await prisma.post.findMany();
  return NextResponse.json(posts);
}

// import prisma from "@/lib/db";

// export async function GET() {
//   const posts = await prisma.post.findMany();
//   return Response.json(posts);
// }
