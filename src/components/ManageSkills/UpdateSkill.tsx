
"use client";

import { Check, Edit, Loader2 } from "lucide-react";
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
import { useUpdateSkillMutation } from "@/redux/features/skill/skillApi";
import { ISkill } from "@/types/user.interface";

interface IProps {
  skill: ISkill;
  trigger?: React.ReactNode;
  onClose: () => void;
}

interface IValidation {
  label: string | undefined;
  logo: string | undefined;
  expertise: string | undefined;
}

export function UpdateSkill({ skill, trigger }: IProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<ISkill>(skill);
  const [logo, setLogo] = useState<File | null>(null);
  const [errors, setErrors] = useState<IValidation>({
    expertise: undefined,
    label: undefined,
    logo: undefined,
  });

  const [updateSkillById, { isLoading }] = useUpdateSkillMutation();

  const validateForm = () => {
    const newErrors: IValidation = {
      expertise: undefined,
      label: undefined,
      logo: undefined,
    };

    if (!formData.label || formData.label.length < 2) {
      newErrors.label = "Label must be at least 2 characters";
    }

    if (!formData.expertise) {
      newErrors.expertise = "Please select an expertise level";
    }

    if (!logo && !formData.logo) {
      newErrors.logo = "Logo is required";
    }

    setErrors(newErrors);
    const error = Object.values(newErrors).find((error) => error !== undefined);

    return !error; // return true if there are no errors
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors in the form.");
      return;
    }

    const formPayload = {
      ...formData,
      logo: logo ? URL.createObjectURL(logo) : formData.logo, // Replace with actual file handling logic if needed
    };

    try {
      const res = await updateSkillById({
        id: skill._id,
        payload: formPayload,
      });

      const error = res.error as any;

      if (error) {
        toast.error(
          error.data.message || "Something went wrong while updating skill"
        );
        return;
      }

      toast.success("Skill updated successfully");
      setOpen(false);
    } catch (error) {
      console.error("Failed to update skill:", error);
    }
  };

  const handleInputChange = (field: keyof ISkill, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof IValidation]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button
            variant="outline"
            className="p-[0] w-[30px] h-[30px] center rounded-full"
          >
            <Edit className="w-4 h-4" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Skill</DialogTitle>
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
              value={formData.expertise || ""}
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
            {errors.logo && (
              <p className="text-sm text-destructive">{errors.logo}</p>
            )}
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
