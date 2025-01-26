import { removeTokenFromCookies } from "@/app/registration/auth";


export async function POST(req:Request) {
  const cookie = removeTokenFromCookies();
  
  return new Response(null, {
    headers: { "Set-Cookie": cookie },
  });
}