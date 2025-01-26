import prisma from "@/app/server/prisma";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, params: any) {
  let { id } = await params.params;
  try {
    await prisma.registration.delete({
      where: {
        id: JSON.parse(id),
      },
    });
    return NextResponse.json({ result: "deleted data" });
  } catch (err) {
    return NextResponse.json({ result: err });
  }
}
