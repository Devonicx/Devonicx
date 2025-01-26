import { setTokenToCookies } from "@/app/registration/auth";
import prisma from "@/app/server/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    let loginData: any = await prisma.registration.findMany({});
    return NextResponse.json({ loginData });
  } catch (err) {
    console.log("err: ", err);
    return NextResponse.json({
      error: "can't process your request at the moment",
    });
  }
}
