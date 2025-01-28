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

  try {
    let { dataToSend, type, createdBy } = await req.json();
    let by = `by: ${createdBy}`;
    let createdInfo = currentTime + by;

    let dataCheck = await prisma.recentRecords.findMany({
      where: {
        data: JSON.stringify(dataToSend),
      },
    });

    if (dataCheck.length < 1) {
      await prisma.recentRecords.create({
        data: {
          type: type,
          data: JSON.stringify(dataToSend),
          time: createdInfo,
        },
      });
    }
    return NextResponse.json({ result: "saved data" });
  } catch (err) {
    console.log(err);

    return NextResponse.json({ result: "error in data saving: ", err });
  }
}
