import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import prisma from "@/app/server/prisma";

export async function POST(req: Request) {
  let userData = null;
  let token: any = cookies().get("authToken");
  if (token) {
    token = token.value;
  } else {
    token = null;
  }
  let { userId } = await req.json();

  if (!userId) {
    let tokenAlreadyAvaible = await prisma.token.findMany({
      where: {
        token: token,
      },
    });

    if (tokenAlreadyAvaible.length > 0) {
       await prisma.token.updateMany({
        where: {
          userId: tokenAlreadyAvaible[0].userId,
        },
        data: {
          token: token,
        },
      });

      userData = await prisma.registration.findUnique({
        where: { id: tokenAlreadyAvaible[0].userId },
      });
      return NextResponse.json({ userData: "token stored" });
    } else {
      userData = null;
      return NextResponse.json({ userData: "token stored" });
    }
  } else if (userId) {
    let userAlreadyAvaible = await prisma.token.findMany({
      where: { userId: userId },
    });

    if (userAlreadyAvaible.length < 1) {
      await prisma.token.create({
        data: {
          token: token,
          userId: userId,
        },
      });
      
    } else {
      await prisma.token.updateMany({
        where: { userId: userId },
        data: {
          token: token,
        },
      });

    }
    userData = await prisma.registration.findUnique({ where: { id: userId } });

    return NextResponse.json({ userData: "token stored" });
  } else {
    userData = null;
    return NextResponse.json({ userData });
  }
}
