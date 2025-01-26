import prisma from "@/app/server/prisma";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, params: any) {
  let { id, password } = await params.params;

  try {
    let [adminData] = await prisma.registration.findMany({
      where: {
        admin: true,
      },
    });
    if (adminData.password !== password) {
      return NextResponse.json({ result: "Wrong Admin Password" });
    } else {
      await prisma.registration.delete({
        where: {
          id: JSON.parse(id),
        },
      });

      return NextResponse.json({ result: "User Deleted" });
    }
  } catch (err) {
    return NextResponse.json({ result: err });
  }
}
