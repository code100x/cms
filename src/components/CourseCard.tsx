'use client';
import { Course } from '@/store/atoms';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from './ui/button';
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { MessageCircle, PlayCircle } from "lucide-react";

export const CourseCard = ({
  course,
  onClick,
}: {
  course: Course;
  onClick: () => void;
}) => {
  const router = useRouter();
  const imageUrl = course.imageUrl ? course.imageUrl : 'banner_placeholder.png';
  const percentage = course.totalVideos !== undefined ? Math.ceil(((course.totalVideosWatched ?? 0) / course?.totalVideos) * 100) : 0;

  return (
    <Card className="w-full max-w-sm overflow-hidden transition-all hover:shadow-lg cursor-pointer" onClick={onClick}>
      <div className="relative aspect-video overflow-hidden">
        <img
          alt={course.title}
          className="object-cover w-full h-full transition-transform hover:scale-105"
          height="200"
          src={imageUrl}
          style={{
            aspectRatio: "300/200",
            objectFit: "cover",
            filter: "brightness(1.2) contrast(1.1)",
          }}
          width="300"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 right-4 flex justify-between items-end">
          <div className="bg-white rounded-full p-1 shadow-md">
            <div className="relative w-12 h-12">
              <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 100 100">
                <circle className="stroke-current text-gray-300" strokeWidth="10" fill="gray" r="40" cx="50" cy="50" />
                <motion.circle
                  className="stroke-current text-black"
                  strokeWidth="10"
                  strokeLinecap="round"
                  fill="white"
                  r="40"
                  cx="50"
                  cy="50"
                  initial={{ strokeDasharray: "0 251.2" }}
                  animate={{ strokeDasharray: `${percentage * 2.512} 251.2` }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                />
              </svg>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                <span className="text-xs font-bold text-black dark:text-black flex justify-center">{percentage}%</span>
              </div>
            </div>
          </div>

        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold text-primary mb-2 line-clamp-2">
          {course.title}
        </h3>
        <div className="flex space-x-2">
          <Button className="flex-1" variant="default" onClick={onClick}>
            <PlayCircle className="w-4 h-4 mr-2" />
            View Course
          </Button>
          {course.certIssued ? (
            <Button
              variant="outline"
              size={'lg'}
              onClick={(e) => {
                e.stopPropagation();
                router.push('/certificate');
              }}
            >
              Claim Certificate
            </Button>
          ) : (
            <Link
              className="flex-1 inline-flex items-center justify-center rounded-md py-2 text-sm font-medium text-primary underline-offset-4 ring-offset-background transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
              href={course.discordOauthUrl}
              target={'blank'}
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Join Discord
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
