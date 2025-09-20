import { NotionAPI } from 'notion-client';
import db from '@/db';
const notion = new NotionAPI();
import PrintNotes from '@/components/print/PrintNotes';

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
    const recordMap = await notion.getPage(notionMetadata?.notionId);
    return <PrintNotes recordMap={recordMap} />;
  }
}
