import db from '@/db';
import { NextResponse } from 'next/server';

export async function PATCH(
    req: Request
  ) {
    const {
      type,
      thumbnail,
      title,
      description,
      parentContentId,
      adminPassword,
      metadata,
      selectedContentId
    }: {
      type: 'video' | 'folder' | 'notion',
      thumbnail: string;
      title: string;
      description: string;
      courseId: number;
      parentContentId: number;
      metadata: any;
      adminPassword: string;
      selectedContentId: string
    } = await req.json();

    if (adminPassword !== process.env.ADMIN_SECRET) {
      return NextResponse.json({}, { status: 403 });
    }
    try {
      const parentContent = await db.content.findFirst({
        where: { id: parentContentId },
        include: {
            children: true
        }
      });

      if (!parentContent) {
        return NextResponse.json({error: "No Content found"}, {status: 404});
      }
    
      const res = await db.content.update({
        where: { id: parentContentId },
        data: {
          children: {
            updateMany: {
              where: {
                id: parseInt(selectedContentId,10)
              },
              data: {
                title,
                description,
                thumbnail
              }
            }
          }
        }
      });

      if (type === 'video') {
        await db.videoMetadata.update({
          where: {
            id: parseInt(selectedContentId, 10)
          },
            data: {
              video_360p_1: metadata.video_360p_1,
              video_360p_2: metadata.video_360p_2,
              video_360p_3: metadata.video_360p_3,
              video_360p_4: metadata.video_360p_4,
              video_720p_1: metadata.video_720p_1,
              video_720p_2: metadata.video_720p_2,
              video_720p_3: metadata.video_720p_3,
              video_720p_4: metadata.video_720p_4,
              video_1080p_1: metadata.video_1080p_1,
              video_1080p_2: metadata.video_1080p_2,
              video_1080p_3: metadata.video_1080p_3,
              video_1080p_4: metadata.video_1080p_4,
              /// mp4s
      
              video_1080p_mp4_1: metadata.video_1080p_mp4_1,
              video_1080p_mp4_2: metadata.video_1080p_mp4_2,
              video_1080p_mp4_3: metadata.video_1080p_mp4_3,
              video_1080p_mp4_4: metadata.video_1080p_mp4_4,
              video_720p_mp4_1: metadata.video_720p_mp4_1,
              video_720p_mp4_2: metadata.video_720p_mp4_2,
              video_720p_mp4_3: metadata.video_720p_mp4_3,
              video_720p_mp4_4: metadata.video_720p_mp4_4,
              video_360p_mp4_1: metadata.video_360p_mp4_1,
              video_360p_mp4_2: metadata.video_360p_mp4_2,
              video_360p_mp4_3: metadata.video_360p_mp4_3,
              video_360p_mp4_4: metadata.video_360p_mp4_4,
      
              subtitles: metadata.subtitles || '',
              segments: metadata.segments || [],
              duration: metadata.duration,
              thumbnail_mosiac_url: metadata.thumbnail_mosiac_url,
              contentId: parseInt(selectedContentId, 10),
            }    
        });
      } else if (type === 'notion') {
        const res = await db.notionMetadata.update({
          where: { contentId: parseInt(selectedContentId, 10) },
          data: {
            notionId: metadata.notionId,
          },
        });
        console.log(' res : ', res);
      }

      return NextResponse.json({status: 201, data: res});
    } catch (error) {
      console.log(error);
      return NextResponse.json({error});
    }
  }