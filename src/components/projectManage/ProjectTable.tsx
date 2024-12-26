"use client";

import { MdDelete, MdEdit } from "react-icons/md";
import { Card, CardContent } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";
import { useDeleteProjectMutation } from "@/redux/features/project/projectApi";
import { toast } from "sonner";
import { } from "lucide-react";
import EditProject from "./EditProject";

interface IProject {
  _id: string;
  name: string;
  description: string;
  details: string;
  image: string;
}

interface IProps {
  projects: IProject[];
  isLoading: boolean;
}

const ProjectTable: React.FC<IProps> = ({ projects, isLoading }) => {
  const [projectToEdit, setProjectToEdit] = useState<IProject | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const handleEditClick = (project: IProject) => {
    setProjectToEdit(project);
    setEditDialogOpen(true);
  };
  const [deleteProject] = useDeleteProjectMutation();

  const removeProject = (progect:IProject) => {
    // console.log(progect,"project");
     const id= progect._id
    //  console.log(id,"project");
    deleteProject(id);
    toast.success("Project deleted successfully");
  };
  const handleEditModalClose = () => {
    setEditDialogOpen(false);
    setProjectToEdit(null);
  };
  return (
    <Card className="relative">
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Project Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Details</TableHead>
              <TableHead>Image</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5}>Loading...</TableCell>
              </TableRow>
            ) : projects?.length > 0 ? (
              projects?.map((project) => (
                <TableRow key={project._id}>
                  <TableCell>{project.name}</TableCell>
                  <TableCell>
                    <div
                      dangerouslySetInnerHTML={{ __html: project.description }}
                    />
                  </TableCell>
                  <TableCell>{project.details}</TableCell>
                  <TableCell>
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-20 h-20 object-cover"
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleEditClick(project)}
                        className="p-2 bg-green-500 text-white rounded hover:bg-green-700"
                      >
                        <MdEdit />
                      </button>
                     <button onClick={() => removeProject(project)} className="p-2 bg-red-600 text-white rounded"> <MdDelete size={15} /></button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5}>No projects found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
      {/* Edit Project Modal */}
      {editDialogOpen && projectToEdit && (
        <EditProject
          project={projectToEdit}
          onClose={handleEditModalClose}
        />
      )}
    </Card>
  );
};

export default ProjectTable;
