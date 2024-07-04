import { NextRequest, NextResponse } from "next/server";


export const GET = async (req: NextRequest) =>  {
  const search = req.nextUrl.searchParams.get('search');
  console.log(search);

  const brands = {
    success: true
  }

  return NextResponse.json(brands);
}

export const POST = async (req: NextRequest, request: Request) =>  {
  const body = await request.json()
  console.log(body);

  const brands = {
    success: true
  }

  return NextResponse.json(brands);
}