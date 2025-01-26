import prisma from "@/app/server/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request, params: any) {
  const { letterType } = params.params;
  
  const fromArray = JSON.parse(letterType);
  try {
    let data = await prisma.recentRecords.findMany({
      where: {
        type: {
          in: fromArray,
        },
      },
    });
    return NextResponse.json({ result: data });
  } catch (err) {
    console.log(err);

    return NextResponse.json({ result: "error in data saving: " });
  }
}
