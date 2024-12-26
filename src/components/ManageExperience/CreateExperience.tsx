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
  import { FormEvent, useState } from "react";
  import { useAddExperienceMutation } from "@/redux/features/experience/experienceApi";
import { toast } from "sonner";
import TextEditor from "../shared/TextEditor";



  const CreateExperience = () => {
    const [title, setTitle] = useState("");
    const [company, setCompany] = useState("");
    const [employmentType, setEmploymentType] = useState("Full-time");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("Present");
    const [duration, setDuration] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [responsibilities, setResponsibilities] = useState<string[]>([]);

  
    const [addExperience, { isLoading }] = useAddExperienceMutation();
    const onDescriptionChange = (newDescription: string) => {
        const responsibilityArray = newDescription.split("\n").filter((line) => line.trim() !== "");
        setResponsibilities(responsibilityArray);
      };
    const onSubmit = async (e: FormEvent) => {
      e.preventDefault();
  
      if (
        !title.trim() ||
        !company.trim() ||
        !startDate.trim() ||
        !duration.trim() ||
        !location.trim() ||
        !description.trim()||
        !responsibilities
      ) {
        toast.error("Please fill in all required fields.");
        return;
      }
  
      const experienceData = {
        title,
        company,
        employmentType,
        startDate,
        endDate,
        duration,
        location,
        description,
        responsibilities
      };
  
      try {
        await addExperience(experienceData).unwrap();
  
        // Reset form after successful submission
        setTitle("");
        setCompany("");
        setEmploymentType("Full-time");
        setStartDate("");
        setEndDate("Present");
        setDuration("");
        setLocation("");
        setDescription("");
        toast.success("Experience added successfully!");
      } catch (error) {
        toast.error("Error adding experience. Please try again.");
        console.error("Error adding experience:", error);
      }
    };
  
    if (isLoading) return <p>loading...</p>
  
    return (
        <div>
        <Dialog>
          <DialogTrigger asChild>
            <button className="px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-500 transition-colors duration-300">
              Add Experience
            </button>
          </DialogTrigger>
      
          <DialogContent className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">Add Experience</DialogTitle>
              <DialogDescription className="text-gray-500">Add a new experience entry</DialogDescription>
            </DialogHeader>
            <form onSubmit={onSubmit}>
              <div className="grid gap-6 h-[500px] overflow-y-auto">
                {/* Title Field */}
                <div className="grid grid-cols-1 sm:grid-cols-8 items-center gap-4">
                  <Label htmlFor="title" className="sm:text-right font-medium">
                    Title
                  </Label>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    id="title"
                    className="sm:col-span-7 border rounded p-2 w-full"
                  />
                </div>
      
                {/* Company and Location Fields */}
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                    <Label htmlFor="company" className="sm:text-right font-medium">
                      Company Name
                    </Label>
                    <Input
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      id="company"
                      className="sm:col-span-3 border rounded p-2 w-full"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                    <Label htmlFor="location" className="sm:text-right font-medium">
                      Location
                    </Label>
                    <Input
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      id="location"
                      className="sm:col-span-3 border rounded p-2 w-full"
                    />
                  </div>
                </div>
      
                {/* Employment Type and Duration Fields */}
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                    <Label htmlFor="employmentType" className="sm:text-right font-medium">
                      Employment Type
                    </Label>
                    <select
                      value={employmentType}
                      onChange={(e) => setEmploymentType(e.target.value)}
                      id="employmentType"
                      className="sm:col-span-3 border rounded p-2 w-full"
                    >
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract</option>
                      <option value="Internship">Internship</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                    <Label htmlFor="duration" className="sm:text-right font-medium">
                      Duration
                    </Label>
                    <Input
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      id="duration"
                      className="sm:col-span-3 border rounded p-2 w-full"
                    />
                  </div>
                </div>
      
                {/* Start Date and End Date Fields */}
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                    <Label htmlFor="startDate" className="sm:text-right font-medium">
                      Start Date
                    </Label>
                    <Input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      id="startDate"
                      className="sm:col-span-3 border rounded p-2 w-full"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                    <Label htmlFor="endDate" className="sm:text-right font-medium">
                      End Date
                    </Label>
                    <Input
                      type="text"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      id="endDate"
                      placeholder="Present"
                      className="sm:col-span-3 border rounded p-2 w-full"
                    />
                  </div>
                </div>
       {/* Description Field */}
       <div className="grid grid-cols-8 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Input
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  id="description"
                  className="col-span-7"
                />
              </div>
                {/* Description Field */}
                <div className="grid grid-cols-1 sm:grid-cols-8 items-start gap-4">
                  <Label htmlFor="description" className="sm:text-right font-medium">
                   Responsibility
                  </Label>
                  <div className="sm:col-span-7">
                  <TextEditor
  onChange={onDescriptionChange}
  defaultValue={responsibilities.join("\n")}
/>

                  </div>
                </div>
              </div>
       
              <div className="flex justify-end pt-5">
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
  
  export default CreateExperience;