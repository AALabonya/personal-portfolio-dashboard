import React, { FormEvent, useState, useEffect } from "react";

import { useGetBlogByIdQuery, useUpdateBlogMutation } from "@/redux/features/blog/blogApi";
import { toast, Toaster } from "sonner";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import TextEditor from "../shared/TextEditor";



interface IBlog {
  _id: string;
  name: string;
  blog: string;
  image: string;
}

interface EditBlogProps {
  blog: IBlog;
  onClose: () => void;
}

const EditBlog: React.FC<EditBlogProps> = ({ blog, onClose }) => {
  const { data: blogData } = useGetBlogByIdQuery(blog._id);
  const data = blogData?.data;

  const [name, setName] = useState(data?.name || "");
  const [blogs, setBlogs] = useState(data?.blog || "");  // Set it as empty string to hide content
console.log(blogs,"blogs");

  const [image, setImage] = useState<File | null>(null);

  const [updateBlog, { isLoading }] = useUpdateBlogMutation();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const updatedBlogData = {
      name: name || data.name,
      blog: blogs || data.blog,
    };

    try {
      const formData = new FormData();
      formData.append("data", JSON.stringify(updatedBlogData));
      if (image) formData.append("image", image);

      await updateBlog({ id: data?._id, blogInfo: formData }).unwrap();
      
      toast.success("Blog updated successfully!");
      onClose(); 
    } catch (error) {
      toast.error("Error updating blog. Please try again.");
      console.error("Error updating blog:", error);
    }
  };

  useEffect(() => {
    setName(data?.name || "");
    setBlogs("");  // Ensures the blog content is initially hidden
  }, [data]);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <Toaster />
      <Dialog open onOpenChange={onClose}>
        <DialogContent className="w-full max-w-3xl mx-auto p-4 sm:p-6 bg-white shadow-md rounded-lg">
          <DialogHeader>
            <DialogTitle>Update Blog</DialogTitle>
            <DialogDescription>Update the blog details</DialogDescription>
          </DialogHeader>
          <form onSubmit={onSubmit} encType="multipart/form-data">
            <div className="grid gap-4 py-4">
              {/* Name Field */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  value={name}
                  placeholder={data?.name}
                  onChange={(e) => setName(e.target.value)}
                  id="name"
                  className="col-span-3"
                />
              </div>

              {/* Image Upload Field */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="image" className="text-right">
                  Image
                </Label>
                <Input
                  type="file"
                  onChange={(e) =>
                    setImage(e.target.files ? e.target.files[0] : null)
                  }
                  id="image"
                  className="col-span-3"
                />
              </div>

              {/* Blog Field (Hidden with TextEditor still available) */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="blog" className="text-right">
                  Blog
                </Label>
                <div className="sm:col-span-3">
                  {/* You can still use TextEditor here */}
                  <TextEditor
                    defaultValue={data?.blog}
                    onChange={(value) => setBlogs(value)}
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end pt-20">
              <button
                className="px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-500 transition-colors duration-300"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditBlog;
