import prisma from "@/app/server/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const currentDate = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  try {
    let { formData, type, createdBy } = await req.json();
    console.log(type);
    console.log(formData);
    console.log(createdBy);
    console.log(currentDate);

    await prisma.businessRecords.create({
      data: {
        type: type,
        data: JSON.stringify(formData),
        time: currentDate,
        createdBy,
      },
    });
    return NextResponse.json({ result: "saved data" });
  } catch (err) {
    console.log(err);

    return NextResponse.json({ result: "error in data saving: ", err });
  }
}
