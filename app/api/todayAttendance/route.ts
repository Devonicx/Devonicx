import prisma from "@/app/server/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    let { name } = await req.json();

    let allAttendances = await prisma.attendanceRecords.findMany({
      where: {
        name: name,
      },
    });
    const latestAttendance = allAttendances.reverse()[0];

    if (latestAttendance.checkOutTime === "") {
      return NextResponse.json({ checkInDone: true, data: latestAttendance });
    } else {
      return NextResponse.json({ checkInDone: false, data: latestAttendance });
    }
  } catch (err) {
    console.log(err);

    return NextResponse.json({ result: "error in data saving: ", err });
  }
}
