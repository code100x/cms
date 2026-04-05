import { NextRequest, NextResponse } from 'next/server';
import { NotionAPI } from 'notion-client';
import db from '@/db';
const notion = new NotionAPI();

function normalizeRecordMap(recordMap: any) {
  if (!recordMap?.block) return recordMap;
  const normalizedBlock: any = {};
  for (const [key, block] of Object.entries(recordMap.block) as any) {
    if (!block?.value) {
      // Skip role-only entries (no block data) that crash react-notion-x
      continue;
    }
    if (block.value.value?.type) {
      // Notion API wraps some blocks in nested value.value — unwrap
      normalizedBlock[key] = { ...block, value: block.value.value };
    } else {
      normalizedBlock[key] = block;
    }
  }
  return { ...recordMap, block: normalizedBlock };
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.search);
  // @ts-ignore
  const contentId: number = parseInt(searchParams.get('id'), 10);
  const notionMetadata = await db.notionMetadata.findFirst({
    where: {
      contentId,
    },
  });

  if (notionMetadata?.notionId) {
    const rawRecordMap = await notion.getPage(notionMetadata?.notionId);
    const recordMap = normalizeRecordMap(rawRecordMap);
    return NextResponse.json({
      recordMap,
    });
  }

  return NextResponse.json({
    recordMap: {},
  });
}
