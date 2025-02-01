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
