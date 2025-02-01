import prisma from "@/app/server/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  let now = new Date();

  let hours: any = now.getHours() + 5;
  let minutes: any = now.getMinutes();
  let seconds: any = now.getSeconds();
  let ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12;
  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  let currentTime = `${hours}:${minutes}:${seconds} ${ampm}`;

  const currentDate = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  console.log(currentDate);

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
