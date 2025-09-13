import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const payload = await req.json().catch(() => ({}));
  // TODO: send to HubSpot/GoHighLevel via webhook
  console.log('Lead received:', payload);
  return NextResponse.json({ ok: true, received: payload });
}