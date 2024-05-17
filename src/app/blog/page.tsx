import { getAllBlogs } from '@/actions/blog';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
dayjs.extend(relativeTime);

export default async () => {
  const blogs = await getAllBlogs();
  return (
    <div>
      <div className="flex justify-between">
        <div></div>
        <h1 className="text-2xl text-center font-semibold text-neutral-800 dark:text-neutral-200 md:text-3xl mb-10 mt-5">
          100x Blogs
        </h1>
        <a
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded p-2 h-10 mb-10 mt-5 mr-4"
          href="blog/new"
        >
          Create Blog
        </a>
      </div>
      <div className="flex flex-col items-center">
        {blogs.data && blogs.data?.length !== 0 ? (
          blogs.data.map((blog) => (
            <a
              href={`blog/${blog.id}`}
              className="w-full flex justify-center"
              key={blog.id}
            >
              <div className="w-1/2 p-2 rounded-lg border bg-card text-card-foreground shadow-sm flex justify-between my-5">
                <div className="w-3/4">
                  <div className="flex items-center justify-between gap-3 my-2">
                    <div className="flex items-center gap-3 w-full">
                      <div className="cursor-pointer relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                        <div className="flex h-full w-full items-center justify-center rounded-full bg-muted">
                          {blog.author.name?.substring(0, 2).toUpperCase()}
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <div className="font-medium mb-1">
                          {blog.author.name}
                        </div>
                        <div className="flex items-center">
                          <div className="text-xs text-gray-500">
                            {dayjs(blog.createdAt).fromNow()}
                          </div>
                          <div className="text-xs text-gray-500 ml-1">
                            • Updated {dayjs(blog.updatedAt).fromNow()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-3xl font-bold p-2">{blog.title}</div>
                  <div className="text-lg p-2">
                    {blog.subtitle.length < 150
                      ? blog.subtitle
                      : `${blog.subtitle.substring(0, 150)}...`}
                  </div>
                </div>
                <div className="w-1/4 flex justify-center items-center">
                  {blog.imageUrl === ' ' ? null : (
                    <div>
                      <img
                        src={blog.imageUrl}
                        alt={blog.title}
                        className="w-fit rounded-lg"
                      />
                    </div>
                  )}
                </div>
              </div>
            </a>
          ))
        ) : (
          <p className="text-lg font-bold m-52">No blogs found</p>
        )}
      </div>
    </div>
  );
};
