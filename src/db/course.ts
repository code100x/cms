import db from "@/db";
import { Cache } from "@/db/Cache"

export interface Content {
  id: number;
  type: string;
  title: string;
  description: string | null;
  thumbnail: string | null;
  parentId: number | null;
  createdAt: string;
  children: Content[];
}

export interface Folder extends Content {
  type: "folder"
}

export interface Video extends Content {
  type: "video"
}

export async function getCourse(courseId: number) {
  const value = await Cache.getInstance().get(`getCourse`, [courseId.toString()]);
  if (value) {
    return value
  }

  const courses = db.course.findFirst({
    where: {
      id: courseId
    }
  })
  Cache.getInstance().set(`getCourse`, [courseId.toString()], courses)
  return courses;
}

export const getNextVideo = async (currentVideoId: number) => {
  if (!currentVideoId) {
    return null
  }
  const value = await Cache.getInstance().get(`getNextVideo`, [currentVideoId.toString()])
  if (value) {
    return value
  }
  const currentContent = await db.content.findFirst({
    where: {
      id: currentVideoId
    }
  })

  const latestContent = await db.content.findFirst({
    orderBy: [{
      id: "asc"
    }],
    where: {
      parentId: {
        equals: currentContent?.parentId
      },
      id: {
        "gt": currentVideoId
      }
    }
  })
  Cache.getInstance().set(`getNextVideo`, [currentVideoId.toString()], latestContent)
  return latestContent;
}

async function fetchContent(contentId: number) {

  const value = Cache.getInstance().get(`fetchContent`, [contentId.toString()])
  if (value) {
    return value
  }
  const content = await db.content.findUnique({
    where: {
      id: contentId
    },
    include: {
      children: true
    }
  })

  if (!content) {
    return null;
  }

  if (content.children.length) {
    for (let i = 0; i < content.children.length; i++) {
      content.children[i] = await fetchContent(content.children[i].id);
    }
  }

  Cache.getInstance().set(`fetchContent`, [contentId.toString()], content)
  return content
}

async function getAllContent() {
  const value = Cache.getInstance().get(`getAllContent`, []);
  if (value) {
    return value;
  }
  const allContent = await db.content.findMany({})

  Cache.getInstance().set(`getAllContent`, [], allContent);

  return allContent
}

export const getFullCourseContent = async (courseId: number) => {

  const value = Cache.getInstance().get(`getFullCourseContent`, [courseId.toString()]);
  if (value) {
    return value;
  }

  const contents = await getAllContent();
  const courseContent = await db.courseContent.findMany({
    orderBy: [{
      contentId: "asc"
    }],
    where: {
      courseId: courseId,
    },
    include: { content: true }
  })

  const contentMap = new Map<string, any>(contents.map((content: any) => [content.id, { ...content, children: [] }]));
  const rootContents: any[] = [];
  contents.sort((a: any, b: any) => a.id < b.id ? -1 : 1).forEach((content: any) => {
    if (content.parentId) {
      contentMap.get(content.parentId).children.push(contentMap.get(content.id));
    } else {
      if (courseContent.find(x => x.contentId === content.id)) {
        rootContents.push(contentMap.get(content.id));
      }
    }
  });


  Cache.getInstance().set(`getFullCourseContent`, [courseId.toString()], rootContents)
  return rootContents;
}

export const getCourseContent = async (courseId: number, childrenIds: number[]) => {
  const value = Cache.getInstance().get(`getCourseContent`, [courseId.toString(), ...(childrenIds.map(x => x.toString()))])

  if (value) {
    return value
  }

  if (childrenIds.length === 0) {
    const courseContent = await db.courseContent.findMany({
      orderBy: [{
        contentId: "asc"
      }],
      where: {
        courseId: courseId,
      },
      include: { content: true }
    })
    Cache.getInstance().set(`getCourseContent`, [courseId.toString(), ...(childrenIds.map(x => x.toString()))], courseContent.map((content) => content.content))
    return courseContent.map((content) => content.content);
  }

  const content = await db.content.findFirst({
    where: {
      id: childrenIds[childrenIds.length - 1]
    }
  });

  if (content?.type === "folder") {
    const courseContent = await db.content.findMany({
      orderBy: [{
        id: "asc"
      }],
      where: {
        parentId: {
          equals: childrenIds[childrenIds.length - 1]
        }
      },
    })
    Cache.getInstance().set(`getCourseContent`, [courseId.toString(), ...(childrenIds.map(x => x.toString()))], courseContent)

    return courseContent;
  }
  Cache.getInstance().set(`getCourseContent`, [courseId.toString(), ...(childrenIds.map(x => x.toString()))], [content])

  return [content]
}

export const getCurrentContentType = async (courseId: number, childrenIds: number[]) => {

  if (childrenIds.length === 0) {
    return "folder";
  }

  const content = await db.content.findFirst({
    where: {
      id: childrenIds[childrenIds.length - 1]
    }
  });

  if (!content) {
    return "folder"
  }

  return content.type;
}



