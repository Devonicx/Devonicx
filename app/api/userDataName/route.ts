import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import prisma from "@/app/server/prisma";

export async function GET(req: Request) {
  let token: any = cookies().get("authToken");
  if (token) {
    token = token.value;
  } else {
    token = "";
  }
  try {
    let tokenData = await prisma.token.findMany({
      where: { token: token },
    });
    let userId = tokenData[0].userId;
    let registrationData: any = await prisma.registration.findUnique({
      where: {
        id: userId,
      },
    });
    return NextResponse.json({
      admin: registrationData.admin,
      username: registrationData.username,
      forms: registrationData.forms,
    });
  } catch (e) {
    return NextResponse.json({
      admin: false,
    });
  }
}
