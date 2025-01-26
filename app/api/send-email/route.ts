import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import prisma from "@/app/server/prisma";

export async function POST(req: Request) {
  const { userName } = await req.json();

  if (userName !== process.env.ADMIN_EMAIL) {
    return NextResponse.json({
      message: "Incorrect Admin Email!",
    });
  }
  let passwordData = await prisma.registration.findMany();

  // Create a transporter
  let transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Email options
  let mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL,
    subject: "Forget Password Request",
    text: `Here are the credentials of Super Admin:
Username: ${passwordData[0].username}
Password: ${passwordData[0].password}`,
  };

  // Send email
  try {
    if (passwordData) {
      await transporter.sendMail(mailOptions);
      return NextResponse.json({
        message:
          "Your request for forget password has been sent successfully!",
      });
    } else {
      return NextResponse.json({ message: "Incorrect UserName" });
    }
  } catch (error: any) {
    return NextResponse.json({
      message: "Failed to send the request",
    });
  }
}
