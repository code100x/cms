import db from "@/db"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const { adminSecret, contentId, segmentsJson } = await req.json()

  if (adminSecret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({}, { status: 401 })
  }

  const response = await db.videoMetadata.update({
    where: {
      contentId: Number(contentId),
    },
    data: {
      segments: JSON.parse(JSON.stringify(segmentsJson)),
    },
  })

  return NextResponse.json(
    { data: response },
    {
      status: 200,
    },
  )
}
