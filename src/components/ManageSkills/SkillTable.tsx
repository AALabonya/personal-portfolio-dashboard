"use client";

import { MdDelete, MdEdit } from "react-icons/md";
import { Card, CardContent } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";

import { toast } from "sonner";
import { useDeleteSkillMutation } from "@/redux/features/skill/skillApi";

import { UpdateSkill } from "./UpdateSkill";
import { ISkill } from "@/types/user.interface";


interface IProps {
  skills: ISkill[];
  isLoading: boolean;
}

const SkillTable: React.FC<IProps> = ({ skills, isLoading }) => {
  const [skillToEdit, setSkillToEdit] = useState<ISkill | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const handleEditClick = (skill: ISkill) => {
    setSkillToEdit(skill); // Set the skill to edit
    setEditDialogOpen(true); // Open the edit modal
  };

  const [deleteskill] = useDeleteSkillMutation();

  const removeSkill = (skill: ISkill) => {
    const id = skill._id;
    console.log(id);
    
    deleteskill(id);
    toast.success("Skill deleted successfully");
  };

  const handleEditModalClose = () => {
    setEditDialogOpen(false);
    setSkillToEdit(null);
  };

  return (
    <Card className="relative">
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Logo</TableHead>
              <TableHead>Expertise</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5}>Loading...</TableCell>
              </TableRow>
            ) : skills?.length > 0 ? (
              skills?.map((skill) => (
                <TableRow key={skill._id}>
                  <TableCell>{skill.label}</TableCell>
                  <TableCell>
                    <img
                      src={skill.logo}
                      alt={skill.label}
                      className="w-20 h-20 object-cover"
                    />
                  </TableCell>
                  <TableCell>{skill.expertise}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleEditClick(skill)} // Open the edit modal
                        className="p-2 bg-green-500 text-white rounded hover:bg-green-700"
                      >
                        <MdEdit />
                      </button>
                      <button
                        onClick={() => removeSkill(skill)} // Delete the skill
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
                <TableCell colSpan={5}>No skills found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>

      {/* Edit skill Modal */}
      {editDialogOpen && skillToEdit && (
      <UpdateSkill
       skill={skillToEdit}
        onClose={handleEditModalClose} 
/>)}
    </Card>
  );
};

export default SkillTable;
