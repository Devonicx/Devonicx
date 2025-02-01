import prisma from "@/app/server/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  let now = new Date();
  let currentTime = new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
    timeZone: "Asia/Karachi",
  }).format(now);

  try {
    let { id } = await req.json();
    console.log(id);
    await prisma.attendanceRecords.updateMany({
      where: {
        id,
      },
      data: {
        checkOutTime: currentTime,
      },
    });
    return NextResponse.json({ result: "saved data" });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ result: "error in data saving: ", err });
  }
}
