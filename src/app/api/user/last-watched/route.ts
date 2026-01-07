import { NextRequest, NextResponse } from 'next/server';
import db from '@/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { LastWatchedVideoI } from '@/lib/lastWatchedtype';

export async function POST(req: NextRequest) {
  const session=await getServerSession(authOptions);
  if(!session || !session.user){
    return NextResponse.json({},{status:401});
  }
  try{
    const {contentId, courseId}=await req.json();
    if(!contentId || !courseId || typeof Number(courseId)!=='number'){
      return NextResponse.json(
        {error:'contentId is missing.'},
        {status: 400}
      )
    }
    
    const user = await db.user.findFirst({
      where: {
        id:session.user.id,
      },
    });
    if(!user){
      return NextResponse.json({},{status:401});
    }
    
    await db.lastWatched.upsert({
      where:{
        userId_courseId:{
          userId:user.id,
          courseId:Number(courseId)
        }
      },
      update:{contentId},
      create:{
        userId:user.id,
        courseId:Number(courseId),
        contentId:contentId
      }
    });
    return NextResponse.json({},{status:200});
  }
  catch(err){
    console.log(err)
    return NextResponse.json({error:'server error'},{status:500});
  }
}

export async function GET(req: NextRequest) {
  const session=await getServerSession(authOptions);
  const { searchParams } = new URL(req.url);
  const courseId = searchParams.get('courseId');
  
  if(!session || !session.user){
    return NextResponse.json({},{status:401});
  }
  
  if(!courseId || isNaN(Number(courseId))){
    const videoInfo:LastWatchedVideoI=null;
    return NextResponse.json({videoInfo},{status:200});
  }
  
  try{
    const lastWatchedVideo=await db.lastWatched.findUnique({
      where:{
        userId_courseId:{
          userId:session.user.id,
          courseId:parseInt(courseId, 10)
        }
      },
      include:{
        content:{
          select:{
            id:true,
            type:true,
            title:true,
            parentId:true
          }
        }
      }
    })
    
    if(!lastWatchedVideo || !lastWatchedVideo.content){
      const videoInfo:LastWatchedVideoI=null;
      return NextResponse.json({videoInfo},{status:200});
    }
    
    const content=lastWatchedVideo.content;
    const videoInfo:LastWatchedVideoI={
      id:content.id,
      type:content.type,
      title:content.title,
      parentId:content.parentId
    }
    return NextResponse.json({videoInfo},{status:200});
  }
  catch(err){
    console.log(err);
    return NextResponse.json({error:'server error'},{status:500});
  }
}