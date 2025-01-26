import prisma from "@/app/server/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request, params: any) {
  const { letterType } = params.params;

  try {
    let wholeData = await prisma.registration.findMany({});
    let data = wholeData.filter((item: any) => {
      return item.admin !== true;
    });

    return NextResponse.json({ result: data });
  } catch (err) {
    console.log(err);

    return NextResponse.json({ result: "error in data saving: " });
  }
}
