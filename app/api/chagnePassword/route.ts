import prisma from "@/app/server/prisma";
import { NextResponse } from "next/server";
export async function POST(req: Request) {
  let { OldPassword, newPassword, adminPassword } = await req.json();
  let adminPasswordCheck: any = await prisma.registration.findMany({
    where: { password: adminPassword },
  });
  let oldPasswordCheck: any = await prisma.registration.findMany({
    where: { password: OldPassword },
  });

  if (adminPasswordCheck.length > 0) {       
    if (adminPasswordCheck[0].admin) {
      if (oldPasswordCheck.length > 0) {
        await prisma.registration.updateMany({
          where: {
            password: OldPassword,
          },
          data: {
            password: newPassword,
          },
        });
        return NextResponse.json({ msg: "Password Updated" });
      } else {
        return NextResponse.json({ error: "Wrong User Password" });
      }
    } else {
      return NextResponse.json({ error: "Wrong Admin Password" });
    }
  } else {
    return NextResponse.json({ error: "Wrong Admin Password" });
  }
}
