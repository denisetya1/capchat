import { NextRequest, NextResponse } from "next/server";


export const GET = async (req: NextRequest) =>  {
  const hubInt = req.nextUrl.searchParams.get('hub.challenge');
  console.log("hub", hubInt);

  return new Response(hubInt, {
    status: 200,
  });
}

export const POST = async (req: NextRequest, request: Request) =>  {
  const body = await request.json()
  console.log('post', body);

  const brands = {
    success: true
  }

  return NextResponse.json(brands);
}