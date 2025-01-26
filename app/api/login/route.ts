import { setTokenToCookies } from "@/app/registration/auth";
import prisma from "@/app/server/prisma";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  let securityKey: any = process.env.SECURITY_KEY;
  try {
    let { username, password } = await req.json();
    let userData = { username, password };
 
    let [loginData]: any = await prisma.registration.findMany({
      where: {
        username: username,
      },
    });
    if (loginData) {
      if (password !== loginData.password) {
        return NextResponse.json({ error: "Incorrect Password" });
      } else {
        jwt.sign(userData, securityKey, { expiresIn: "1h" });
        let dataToSend = { msg: "token", userId: loginData.id };
        return new Response(JSON.stringify(dataToSend), {
          headers: { "Set-Cookie": setTokenToCookies(userData) },
        });
      }
    } else {
      return NextResponse.json({ error: "User not found" });
    }
  } catch (err) {
    console.log("err: ", err);
    return NextResponse.json({
      error: "can't process your request at the moment",
    });
  }
}
