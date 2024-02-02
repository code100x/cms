"use client"

import { Course } from "@prisma/client"
import { CourseCard } from "./CourseCard"
import { useRouter } from "next/navigation"

export const Courses = ({ courses }: { courses: Course[] }) => {
  const router = useRouter()
  return (
    <div className="max-w-screen-xl justify-between mx-auto p-4 cursor-pointer grid grid-cols-1 gap-5 md:grid-cols-3">
      {courses?.map((course) => (
        <CourseCard
          course={course}
          onClick={() => {
            if (
              course.title.includes("Machine Learning") ||
              course.title.includes("Harnoor")
            ) {
              router.push("https://harkirat.classx.co.in/")
            } else {
              router.push(`/courses/${course.id}`)
            }
          }}
        />
      ))}
    </div>
  )
}
