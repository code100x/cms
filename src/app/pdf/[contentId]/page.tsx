import { NotionAPI } from 'notion-client';
import db from '@/db';
const notion = new NotionAPI();
import PrintNotes from '@/components/print/PrintNotes';

function normalizeRecordMap(recordMap: any) {
  if (!recordMap?.block) return recordMap;
  const normalizedBlock: any = {};
  for (const [key, block] of Object.entries(recordMap.block) as any) {
    if (block?.value?.value) {
      normalizedBlock[key] = { ...block, value: block.value.value };
    } else if (block?.value?.type) {
      normalizedBlock[key] = block;
    }
  }
  return { ...recordMap, block: normalizedBlock };
}

export default async function PrintNotion({
  params: { contentId },
}: {
  params: { contentId: string };
}) {
  const notionMetadata = await db.notionMetadata.findFirst({
    where: {
      contentId: parseInt(contentId, 10),
    },
  });

  if (notionMetadata?.notionId) {
    const rawRecordMap = await notion.getPage(notionMetadata?.notionId);
    const recordMap = normalizeRecordMap(rawRecordMap);
    return <PrintNotes recordMap={recordMap} />;
  }
}
