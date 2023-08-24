import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
) {
  try {
    const { userId } = await auth(); // auth is provided by @clerk/nextjs
    const body = await req.json();
    const { name } = body;

    // Validation if there is values in userId, name
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }
    if (!name) {
      return new NextResponse('Name is required', { status: 401 })
    }

    const store = await prismadb.store.create({
      data: {
        userId,
        name,
      }
    })
    return NextResponse.json(store)

  } catch (error) {
    console.log('[STORE_POST]', error);
    return new NextResponse('Internal Error', { status: 500 })
  }
}