
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormEvent, useState } from "react";
import { useAddProjectMutation } from "@/redux/features/project/projectApi";
import { toast } from "sonner";
import TextEditor from "../shared/TextEditor";

// Dynamically import TextEditor with SSR disabled


const CreateProject = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState(""); // Store the description in state
  const [details, setDetails] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const [addProject, { isLoading }] = useAddProjectMutation();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !image || !description.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }

    // Prepare the project data
    const projectData = {
      name,
      description,
      details,
      image,
    };

    try {
      const formData = new FormData();
      formData.append("data", JSON.stringify(projectData));
      formData.append("image", image);

      await addProject(formData).unwrap();

      // Reset form after successful submission
      setName("");
      setDescription("");
      setDetails("");
      setImage(null);
      toast.success("Project added successfully!");
    } catch (error) {
      toast.error("Error adding project. Please try again.");
      console.error("Error adding project:", error);
    }
  };

  const onDescriptionChange = (newDescription: string) => {
    setDescription(newDescription); // Update description when TextEditor changes
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <button className="px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-500 transition-colors duration-300">
            Add Project
          </button>
        </DialogTrigger>
        <DialogContent className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-lg">
          <DialogHeader>
            <DialogTitle>Add Project</DialogTitle>
            <DialogDescription>Add a new project</DialogDescription>
          </DialogHeader>
          <form onSubmit={onSubmit} encType="multipart/form-data">
            <div className="grid gap-4 py-4">
              {/* Name Field */}
              <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="sm:text-right">
                  Name
                </Label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  id="name"
                  className="sm:col-span-3"
                />
              </div>

              {/* Description Field */}
              <div className="mb-16 grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
  <Label htmlFor="description" className="sm:text-right">
    Description
  </Label>
  <div className="sm:col-span-3">
    <TextEditor
      onChange={onDescriptionChange} 
      defaultValue={description}
    />
  </div>
</div>


              {/* Details Field */}
              <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                <Label htmlFor="details" className="sm:text-right">
                  Details
                </Label>
                <Input
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  id="details"
                  className="sm:col-span-3"
                />
              </div>

              {/* Image Upload Field */}
              <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                <Label htmlFor="image" className="sm:text-right">
                  Image
                </Label>
                <Input
                  type="file"
                  onChange={(e) =>
                    setImage(e.target.files ? e.target.files[0] : null)
                  }
                  id="image"
                  className="sm:col-span-3"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <DialogClose asChild>
                <button
                  className="px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-500 transition-colors duration-300"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? "Saving..." : "Save"}
                </button>
              </DialogClose>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateProject;
