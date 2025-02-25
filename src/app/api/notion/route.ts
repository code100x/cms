import { NextRequest, NextResponse } from 'next/server';
import { NotionAPI } from 'notion-client';
import db from '@/db';
const notion = new NotionAPI();

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.search);
  // @ts-ignore
  const contentId: number = parseInt(searchParams.get('id'), 10);

  // @ts-ignore
  const notionIdFromParams: string = searchParams.get('id')?.toString();
  
  if (!contentId && notionIdFromParams)  {
    const recordMap = await notion.getPage(notionIdFromParams);
    return NextResponse.json({
      recordMap,
    });
  }
  
  const notionMetadata = await db.notionMetadata.findFirst({
    where: {
      contentId,
    },
  });

  if (notionMetadata?.notionId) {
    const recordMap = await notion.getPage(notionMetadata?.notionId);
    return NextResponse.json({
      recordMap,
    });
  }

  return NextResponse.json({
    recordMap: {},
  });
}
