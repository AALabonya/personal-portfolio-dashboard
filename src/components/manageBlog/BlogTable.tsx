import { MdDelete, MdEdit } from "react-icons/md";
import { Card, CardContent } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";
import { toast } from "sonner";
import { useDeleteBlogMutation } from "@/redux/features/blog/blogApi";
import EditBlog from "./EditBlog";

interface IBlog {
  _id: string;
  name: string;
  blog: string;
  image: string;
}

interface IProps {
  blogs: IBlog[];
  isLoading: boolean;
}

const BlogTable: React.FC<IProps> = ({ blogs, isLoading }) => {
  const [blogEdit, setBlogEdit] = useState<IBlog | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  // Handle edit button click and open modal
  const handleEditClick = (blog: IBlog) => {
    setBlogEdit(blog);
    setEditDialogOpen(true);
  };

  const [deleteBlog] = useDeleteBlogMutation();

  // Handle blog deletion
  const removeBlog = (blog: IBlog) => {
    const id = blog._id;
    deleteBlog(id);
    toast.success("Blog deleted successfully");
  };

  // Close the edit modal
  const handleEditModalClose = () => {
    setEditDialogOpen(false);
    setBlogEdit(null);
  };

  return (
    <Card className="relative">
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Blog Name</TableHead>
              <TableHead>Blog Description</TableHead>
              <TableHead>Image</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5}>Loading...</TableCell>
              </TableRow>
            ) : blogs?.length > 0 ? (
              blogs?.map((blog: IBlog) => (
                <TableRow key={blog._id}>
                  <TableCell>{blog.name}</TableCell>
                  <TableCell>
                    <div
                      dangerouslySetInnerHTML={{ __html: blog.blog }}
                    />
                  </TableCell>
                  <TableCell>
                    <img
                      src={blog.image}
                      alt={blog.name}
                      className="w-20 h-20 object-cover"
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleEditClick(blog)}
                        className="p-2 bg-green-500 text-white rounded hover:bg-green-700"
                      >
                        <MdEdit />
                      </button>
                      <button
                        onClick={() => removeBlog(blog)}
                        className="p-2 bg-red-600 text-white rounded"
                      >
                        <MdDelete size={15} />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5}>No blogs found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
      
      {/* Edit Blog Modal */}
      {editDialogOpen && blogEdit && (
        <EditBlog
          blog={blogEdit}
          onClose={handleEditModalClose}
        />
      )}
    </Card>
  );
};

export default BlogTable;
