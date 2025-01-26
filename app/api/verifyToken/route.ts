import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req: Request) {
  let securityKey:any = process.env.SECURITY_KEY;
  let token: any = cookies().get("authToken");
  if (token) {
    token = token.value;
  } else { 
    token = "";
  }

  jwt.verify(token, securityKey);
  return NextResponse.json({ msg: "verified" });
}
