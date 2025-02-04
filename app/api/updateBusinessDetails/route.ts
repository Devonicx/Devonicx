import prisma from "@/app/server/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    let { formData, id } = await req.json();
    console.log(id);
    console.log(formData);
    await prisma.businessRecords.updateMany({
      where: {
        id,
      },
      data: {
        data: JSON.stringify(formData),
      },
    });

    return NextResponse.json({ result: "saved data" });
  } catch (err) {
    console.log(err);

    return NextResponse.json({ result: "error in data saving: ", err });
  }
}
