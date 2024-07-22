import { NextRequest, NextResponse } from "next/server";


export const GET = async (req: NextRequest) =>  {
  const hubInt = req.nextUrl.searchParams.get('hub.challenge');
  console.log("hub", hubInt);

  return new Response(hubInt, {
    status: 200,
  });
}

export const POST = async (request: Request) =>  {
  const body = await request.json()
  /*
    {
  "field": "comments",
  "value": {
    "from": {
      "id": "232323232",
      "username": "test"
    },
    "media": {
      "id": "123123123",
      "media_product_type": "FEED"
    },
    "id": "17865799348089039",
    "parent_id": "1231231234",
    "text": "This is an example."
  }
}
  */

  if(body.field === 'comments'){

    if(body.media === ''){
      
    }
  }

  const brands = {
    success: true
  }

  return NextResponse.json(brands);
}