"use client";

import { MdDelete, MdEdit } from "react-icons/md";
import { Card, CardContent } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";
import { toast } from "sonner";
import { useDeleteExperienceMutation } from "@/redux/features/experience/experienceApi";
import UpdateExperience from "./UpdateExperience";
import DOMPurify from "dompurify";

interface IExperience {
  _id: string;
  title: string;
  company: string;
  employmentType: "Full-time" | "Part-time" | "Contract" | "Internship";
  startDate: string;
  endDate: string | "Present";
  duration: string;
  location: string;
  description: string;
  responsibilities: string[];
}

interface IProps {
  experiences: IExperience[];
  isLoading: boolean;
}

const ExperienceTable: React.FC<IProps> = ({ experiences, isLoading }) => {
  const [experienceToEdit, setExperienceToEdit] = useState<IExperience | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteExperience] = useDeleteExperienceMutation();

  const handleEditClick = (experience: IExperience) => {
    setExperienceToEdit(experience);
    setEditDialogOpen(true);
  };

  const removeExperience = async (experience: IExperience) => {
    try {
      await deleteExperience(experience._id).unwrap();
      toast.success("Experience deleted successfully");
    } catch (error) {
      toast.error("Error deleting experience");
      console.error("Error deleting experience:", error);
    }
  };

  const handleEditModalClose = () => {
    setEditDialogOpen(false);
    setExperienceToEdit(null);
  };
  const renderResponsibilities = (responsibilities: string[] | undefined) => {
    if (!responsibilities || responsibilities.length === 0) {
      return "<p>No responsibilities listed.</p>";
    }
  
    // Generate HTML based on responsibility type
    return responsibilities
      .map((responsibility) => {
        if (responsibility.includes("<li>")) {
          return responsibility; 
        }
        if (responsibility.includes("<p>")) {
          return responsibility; 
        }

        return `<p>${responsibility}</p>`;
      })
      .join("");
  };
  
  
  

  return (
    <Card className="relative">
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Employment Type</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Responsibilities</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5}>Loading...</TableCell>
              </TableRow>
            ) : experiences?.length > 0 ? (
              experiences.map((experience: IExperience) => (
                <TableRow key={experience._id}>
                  <TableCell>{experience.title}</TableCell>
                  <TableCell>{experience.company}</TableCell>
                  <TableCell>{experience.duration}</TableCell>
                  <TableCell>{experience.location}</TableCell>
                  <TableCell>{experience.employmentType}</TableCell>
                  <TableCell>{experience.startDate}</TableCell>
                  <TableCell>{experience.endDate}</TableCell>
                  <TableCell>{experience.description}</TableCell>

                  <TableCell>
                  <div
  dangerouslySetInnerHTML={{
    __html: DOMPurify.sanitize(renderResponsibilities(experience.responsibilities)),
  }}
></div>
</TableCell>




                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleEditClick(experience)}
                        className="p-2 bg-green-500 text-white rounded hover:bg-green-700"
                      >
                        <MdEdit />
                      </button>
                      <button
                        onClick={() => removeExperience(experience)}
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
                <TableCell colSpan={5}>No experiences found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
      {/* Edit Experience Modal */}
      {editDialogOpen && experienceToEdit && (
        <UpdateExperience
          experience={experienceToEdit}
          onClose={handleEditModalClose}
        />
      )}
    </Card>
  );
};

export default ExperienceTable;
