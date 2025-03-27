"use server";

import { revalidatePath } from "next/cache";

export async function refreshCourses(path:string,type?:'page'|'layout') {
  revalidatePath(path,type);
}