import prisma from "@/app/server/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request, params: any) {
  const { letterType } = params.params;
  try {
      let data = await prisma.recentRecords.findMany({
        where: {
          type: letterType,
        },
      });
      return NextResponse.json({ result: data });
  } catch (err) {
    return NextResponse.json({ result: "error in data saving: " });
  }
}
