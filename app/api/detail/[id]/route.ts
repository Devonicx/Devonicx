import prisma from "@/app/server/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request, params: any) {
  const { id } = params.params;
  console.log(id);
  const parsedId = JSON.parse(id);
  try {
    let data = await prisma.businessRecords.findMany({
      where: {
        id: parsedId,
      },
    });
    return NextResponse.json({ result: data[0].data });
  } catch (err) {
    console.log(err);

    return NextResponse.json({ result: "error in data saving: " });
  }
}
