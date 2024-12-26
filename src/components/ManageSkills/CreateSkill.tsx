
  "use client";

import { Check, Loader2, Plus } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";

import { useAddSkillMutation } from "@/redux/features/skill/skillApi";
import { ISkill } from "@/types/user.interface";

interface IProps {
  trigger?: React.ReactNode;
}

interface IValidation {
  label: string | undefined;
  logo: string | undefined;
  expertise: string | undefined;
}

const skill: Omit<ISkill, "_id"> = {
  label: "",
  logo: "",
  expertise: "",
};

const CreateSkill =({ trigger }: IProps)=> {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<Omit<ISkill, "_id">>(skill);
  const [logo, setLogo] = useState<File | null>(null);
  const [errors, setErrors] = useState<IValidation>({
    expertise: undefined,
    label: undefined,
    logo: undefined,
  });

  const [addNewSkill, { isLoading }] = useAddSkillMutation();

  const validateForm = () => {
    const newErrors: IValidation = {
      expertise: undefined,
      label: undefined,
      logo: undefined,
    };

    if (!formData.label || formData.label.length < 2) {
      newErrors.label = "Label must be at least 2 characters";
    }
    if (!formData.expertise || formData.expertise.length < 3) {
      newErrors.expertise = "Expertise must be a valid number";
    }
    if (!logo) {
      newErrors.logo = "Logo is required";
    }

    setErrors(newErrors);
    const error = Object.values(newErrors).find((error) => error !== undefined);
    return !error;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!validateForm()) {
      toast.error("Please fix the errors in the form.");
      return;
    }
  
    const formDataToSend = new FormData();
    formDataToSend.append("label", formData.label);
    formDataToSend.append("expertise", formData.expertise);
    if (logo) {
      formDataToSend.append("logo", logo); // Append the logo file
    }
  
    try {
      const res = await addNewSkill(formDataToSend);
      const error = res.error as any;
  
      if (error) {
        toast.error(error.data.message || "Something went wrong while adding skill");
        return;
      }
  
      toast.success("Skill added successfully");
      setOpen(false);
      setFormData(skill); // Reset form data
      setLogo(null); // Reset logo file
    } catch (error) {
      console.error("Failed to add skill:", error);
      toast.error("Failed to add skill. Please try again.");
    }
  };
  
  const handleInputChange = (field: keyof ISkill, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" className="center gap-[8px] w-fit">
            Add New Skill <Plus className="w-4 h-4" />{" "}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Skill</DialogTitle>
          <DialogDescription>
            Make changes to the skill details here. Click save when you&apos;re
            done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="label">Label</Label>
            <Input
              id="label"
              value={formData.label}
              onChange={(e) => handleInputChange("label", e.target.value)}
              placeholder="Enter skill name"
            />
            {errors.label && (
              <p className="text-sm text-destructive">{errors.label}</p>
            )}
          </div>
          <div className="space-y-2">
  <Label htmlFor="expertise">Expertise</Label>
  <select
    id="expertise"
    value={formData.expertise}
    onChange={(e) => handleInputChange("expertise", e.target.value)}
    className="border rounded p-2 w-full"
  >
    <option value="">Select expertise level</option>
    <option value="Beginner">Beginner</option>
    <option value="Intermediate">Intermediate</option>
    <option value="Expert">Expert</option>
  </select>
  {errors.expertise && (
    <p className="text-sm text-destructive">{errors.expertise}</p>
  )}
</div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="logo" className="text-right">
              Logo
            </Label>
            <Input
              type="file"
              id="logo"
              name="logo"
              accept="image/*"
              onChange={(e) => setLogo(e.target.files ? e.target.files[0] : null)}
              className="col-span-3"
            />
            {errors.logo && <p className="text-sm text-destructive">{errors.logo}</p>}
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {!isLoading && <Check className="mr-2 h-4 w-4" />}
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
export default CreateSkill;