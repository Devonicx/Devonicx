import prisma from "@/app/server/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    let { username, password, formsArray, adminpassword } = await req.json();
    let now = new Date();

    let day: any = now.getDate();
    let month: any = now.getMonth() + 1;
    let year: any = now.getFullYear();

    day = day < 10 ? "0" + day : day;
    month = month < 10 ? "0" + month : month;

    let formattedDate = `${day}-${month}-${year}`;
    let arrayWithTime = formsArray.push(`time:- ${formattedDate}`);
    console.log(arrayWithTime);

    let parentAdminData = await prisma.registration.findMany({
      where: {
        admin: true,
      },
    });
    let [usernameData] = await prisma.registration.findMany({
      where: {
        username: username,
      },
    });
    let [passwordData] = await prisma.registration.findMany({
      where: {
        password: password,
      },
    });

    if (adminpassword !== parentAdminData[0].password) {
      return NextResponse.json({ result: "Wrong Admin Password" });
    } else if (usernameData) {
      return NextResponse.json({ result: "This User Already Exists" });
    } else if (passwordData) {
      return NextResponse.json({
        result: "User With This Password Already Exists",
      });
    } else {
      await prisma.registration.create({
        data: {
          username: username,
          password: password,
          admin: false,
          forms: formsArray,
        },
      });
      return NextResponse.json({ result: "User Created" });
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json({
      result: "can't proceed your request at the moment ",
      err,
    });
  }
}
