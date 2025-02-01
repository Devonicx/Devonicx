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

console.log(currentTime);

  const currentDate = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  console.log(currentTime);

  try {
    let { name } = await req.json();
    console.log(name, currentDate, currentTime);

    await prisma.attendanceRecords.create({
      data: {
        name: name,
        date: currentDate,
        checkInTime: currentTime,
        checkOutTime: "",
      },
    });
    return NextResponse.json({ result: "saved data" });
  } catch (err) {
    console.log(err);

    return NextResponse.json({ result: "error in data saving: ", err });
  }
}
