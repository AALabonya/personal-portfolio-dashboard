import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
  import { Input } from "@/components/ui/input";
  import { Label } from "@/components/ui/label";
  import { FormEvent, useEffect, useState } from "react";

  import {
    useGetExperienceByIdQuery,
    useUpdateExperienceMutation,
  } from "@/redux/features/experience/experienceApi";
import { toast } from "sonner";

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
interface EditProjectModalProps {
    experience: IExperience;
    onClose: () => void;
  }
  const UpdateExperience : React.FC<EditProjectModalProps> =({ experience, onClose }) => {

    const { data: experienceData, isLoading: isFetching } =
      useGetExperienceByIdQuery(experience._id);

    const experiences = experienceData?.data;
  
    const [title, setTitle] = useState("");
    const [company, setCompany] = useState("");
    const [employmentType, setEmploymentType] = useState("Full-time");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("Present");
    const [duration, setDuration] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
  
    const [updateExperience, { isLoading }] = useUpdateExperienceMutation();
  
    useEffect(() => {
      if (experience) {
        setTitle(experience.title || "");
        setCompany(experience.company || "");
        setEmploymentType(experience.employmentType || "Full-time");
        setStartDate(experience.startDate || "");
        setEndDate(experience.endDate || "Present");
        setDuration(experience.duration || "");
        setLocation(experience.location || "");
        setDescription(experience.description || "");
      }
    }, [experience]);
  
    const onSubmit = async (e: FormEvent) => {
      e.preventDefault();
  
      if (
        !title.trim() ||
        !company.trim() ||
        !startDate.trim() ||
        !duration.trim() ||
        !location.trim() ||
        !description.trim()
      ) {
        toast.error("Please fill in all required fields.");
        return;
      }
  
      const updatedExperienceData = {
        title,
        company,
        employmentType,
        startDate,
        endDate,
        duration,
        location,
        description,
      };
  
      try {
        const id= experiences._id
        await updateExperience({id, experienceInfo: updatedExperienceData,
        }).unwrap();
        onClose()
        toast.success("Experience updated successfully!");
      } catch (error) {
        toast.error("Error updating experience. Please try again.");
        console.error("Error updating experience:", error);
      }
    };
  
    if (isFetching || isLoading) return <p>loadingg....</p>
  
    return (
      <div>

        <Dialog>
          <DialogTrigger asChild>
            <button className="px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-500 transition-colors duration-300">
              Update Experience
            </button>
          </DialogTrigger>
  
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Update Experience</DialogTitle>
              <DialogDescription>Modify the experience details</DialogDescription>
            </DialogHeader>
            <form onSubmit={onSubmit}>
              <div className="grid gap-4 py-4">
                {/* Title Field */}
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">
                    Title
                  </Label>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    id="title"
                    className="col-span-3"
                  />
                </div>
  
                {/* Company Field */}
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="company" className="text-right">
                    Company
                  </Label>
                  <Input
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    id="company"
                    className="col-span-3"
                  />
                </div>
  
                {/* Employment Type Field */}
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="employmentType" className="text-right">
                    Employment Type
                  </Label>
                  <select
                    value={employmentType}
                    onChange={(e) => setEmploymentType(e.target.value)}
                    id="employmentType"
                    className="col-span-3 border rounded p-2"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>
  
                {/* Start Date Field */}
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="startDate" className="text-right">
                    Start Date
                  </Label>
                  <Input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    id="startDate"
                    className="col-span-3"
                  />
                </div>
  
                {/* End Date Field */}
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="endDate" className="text-right">
                    End Date
                  </Label>
                  <Input
                    type="text"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    id="endDate"
                    className="col-span-3"
                    placeholder="Present"
                  />
                </div>
  
                {/* Duration Field */}
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="duration" className="text-right">
                    Duration
                  </Label>
                  <Input
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    id="duration"
                    className="col-span-3"
                  />
                </div>
  
                {/* Location Field */}
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="location" className="text-right">
                    Location
                  </Label>
                  <Input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    id="location"
                    className="col-span-3"
                  />
                </div>
  
                {/* Description Field */}
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Input
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    id="description"
                    className="col-span-3"
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
                    {isLoading ? "Updating..." : "Update"}
                  </button>
                </DialogClose>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    );
  };
  
  export default UpdateExperience;