
import BlogTable from "@/components/manageBlog/BlogTable";
import CreateBlog from "@/components/manageBlog/CreateBlog";

import { Button } from "@/components/ui/button";
import { useGetAllBlogsQuery } from "@/redux/features/blog/blogApi";

const ManageBlog = () => {

  const { data: blogsData, isLoading } = useGetAllBlogsQuery("", {
    pollingInterval: 40000,
  });

  const blogs = blogsData?.data;

  if (isLoading) {
    return (
      <div>
        loading.....
      </div>
    );
  }
    return (
        <div>
            <div className="rounded-sm border bg-white dark:bg-gray-900 mt-5">
                <div className="flex justify-between items-center border-b px-7 py-4">
                    <h3 className="font-medium text-black dark:text-white">
                        Create New Blog
                    </h3>
                    <Button>
                      <CreateBlog/>
                    </Button>
                </div>
                <div className="p-7">
                   <BlogTable blogs={blogs} isLoading={isLoading} />
                </div>
            </div>
        </div>
    );
}

export default ManageBlog;