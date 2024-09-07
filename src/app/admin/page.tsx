import Link from 'next/link';
import {
  FaBook,
  FaFileAlt,
  FaCommentAlt,
  FaDiscord,
  FaUsers,
  FaFlag,
} from 'react-icons/fa';

export default function AdminPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-16">
      <h1 className="mt-12 bg-gradient-to-b from-blue-400 to-blue-700 bg-clip-text text-center text-4xl font-extrabold text-transparent">
        Admin Dashboard
      </h1>

      <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        <Link
          href="/admin/add-course"
          className="group flex h-48 w-48 transform flex-col items-center justify-center rounded-lg bg-green-400 shadow-lg transition hover:scale-105 hover:shadow-2xl"
        >
          <FaBook className="text-5xl text-white transition-transform group-hover:rotate-12" />
          <span className="mt-4 text-lg font-bold text-white">Add Course</span>
        </Link>

        <Link
          href="/admin/content"
          className="group flex h-48 w-48 transform flex-col items-center justify-center rounded-lg bg-sky-400 shadow-lg transition hover:scale-105 hover:shadow-2xl"
        >
          <FaFileAlt className="text-5xl text-white transition-transform group-hover:rotate-12" />
          <span className="mt-4 text-lg font-bold text-white">Add Content</span>
        </Link>

        <Link
          href="/admin/comment"
          className="group flex h-48 w-48 transform flex-col items-center justify-center rounded-lg bg-red-400 shadow-lg transition hover:scale-105 hover:shadow-2xl"
        >
          <FaCommentAlt className="text-5xl text-white transition-transform group-hover:rotate-12" />
          <span className="mt-4 text-lg font-bold text-white">
            Approve Comment
          </span>
        </Link>

        <Link
          href="/admin/discord"
          className="group flex h-48 w-48 transform flex-col items-center justify-center rounded-lg bg-orange-400 shadow-lg transition hover:scale-105 hover:shadow-2xl"
        >
          <FaDiscord className="text-5xl text-white transition-transform group-hover:rotate-12" />
          <span className="mt-4 text-lg font-bold text-white">Discord</span>
        </Link>

        <Link
          href="/admin/user"
          className="group flex h-48 w-48 transform flex-col items-center justify-center rounded-lg bg-pink-400 shadow-lg transition hover:scale-105 hover:shadow-2xl"
        >
          <FaUsers className="text-5xl text-white transition-transform group-hover:rotate-12" />
          <span className="mt-4 text-lg font-bold text-white">User</span>
        </Link>

        <Link
          href="/admin/userflags"
          className="group flex h-48 w-48 transform flex-col items-center justify-center rounded-lg bg-purple-400 shadow-lg transition hover:scale-105 hover:shadow-2xl"
        >
          <FaFlag className="text-5xl text-white transition-transform group-hover:rotate-12" />
          <span className="mt-4 text-lg font-bold text-white">Userflags</span>
        </Link>
      </div>
    </div>
  );
}
