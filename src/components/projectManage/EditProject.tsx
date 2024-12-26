import React, { useState } from "react";

import { useGetProjectByIdQuery, useUpdateProjectMutation } from "@/redux/features/project/projectApi";
import { toast } from "sonner";
import TextEditor from "../shared/TextEditor";


interface IProject {
  _id: string;
  name: string;
  description: string;
  details: string;
  image: string;
}

interface EditProjectModalProps {
  project: IProject;
  onClose: () => void;
}

const EditProjectModal: React.FC<EditProjectModalProps> = ({ project, onClose }) => {
  const [formData, setFormData] = useState({
    name: project.name,
    description: project.description,
    details: project.details,
    image: project.image as string | File, // Allow both string or File
  });

  const { data: projectData } = useGetProjectByIdQuery(project._id);
  const projects = projectData?.data;
  const [updateProject] = useUpdateProjectMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDescriptionChange = (value: string) => {
    setFormData({ ...formData, description: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setFormData({ ...formData, image: file });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prepare the updated project data
    const updatedProductData = {
      name: formData.name || projects.name,
      description: formData.description || projects.description,
      details: formData.details || projects.details,
    };

    try {
      const updatedFormData = new FormData();
      updatedFormData.append("data", JSON.stringify(updatedProductData));
      if (formData.image instanceof File) {
        updatedFormData.append("image", formData.image);
      }

      await updateProject({ id: project._id, projectInfo: updatedFormData }).unwrap();
      toast.success("Product updated successfully!");
      onClose(); // Close the modal after the update
    } catch (error) {
      toast.error("Error updating project. Please try again.");
      console.error("Error updating project:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center px-4">
      <div className="w-full max-w-3xl mx-auto p-4 sm:p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-base sm:text-lg font-bold mb-4">Edit Project</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded sm:col-span-3"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-4 items-start gap-4">
            <label className="block text-sm font-medium">Details</label>
            <textarea
              name="details"
              value={formData.details}
              onChange={handleChange}
              className="w-full p-2 border rounded sm:col-span-3"
            />
          </div>
          
          {/* Image Field */}
          <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
            <label className="block text-sm font-medium">Image</label>
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
              className="w-full p-2 border rounded sm:col-span-3"
            />
          </div>

          {/* Image Preview */}
          {formData.image && formData.image instanceof File && (
            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4 mt-4">
              <label className="block text-sm font-medium">Image Preview</label>
              <div className="sm:col-span-3">
                <img
                  src={URL.createObjectURL(formData.image)}
                  alt="Preview"
                  className="w-full h-40 object-cover border rounded"
                />
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-4 items-start gap-4">
            <label className="block text-sm font-medium">Description</label>
            <div className="sm:col-span-3">
              <TextEditor
                defaultValue={formData.description}
                onChange={handleDescriptionChange}
              />
            </div>
          </div>
        
          <div className="flex justify-end gap-2 pt-20">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-400 text-white rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProjectModal;
