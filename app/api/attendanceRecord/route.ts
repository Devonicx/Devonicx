import prisma from "@/app/server/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request, params: any) {
  
  try {
    let data = await prisma.attendanceRecords.findMany({});
    console.log(data);
    return NextResponse.json({ result: data });
  } catch (err) {
    return NextResponse.json({ result: "error in data saving: " });
  }
}
