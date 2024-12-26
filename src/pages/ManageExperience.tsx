
import CreateExperience from "@/components/ManageExperience/CreateExperience";
import ExperienceTable from "@/components/ManageExperience/ExperienceTable";

import { Button } from "@/components/ui/button";
import { useGetAllExperiencesQuery } from "@/redux/features/experience/experienceApi";



const ManageExperience = () => {
    const { data: experienceData, isLoading } = useGetAllExperiencesQuery("", {
        pollingInterval: 40000,
      });
    
      const experiences = experienceData?.data;
    console.log(experiences,"checking");
    
      if (isLoading) {
        return (
          <div>
            loading....
          </div>
        );
      }
    return (
        <div>
  <div className="rounded-sm border bg-white dark:bg-gray-900 mt-5">
                <div className="flex justify-between items-center border-b px-7 py-4">
                    <h3 className="font-medium text-black dark:text-white">
                        Create Experience
                    </h3>
                    <Button asChild variant={'default'} size={'sm'}>
                       <CreateExperience/>
                    </Button>
                </div>
                <div className="p-7">
                   <ExperienceTable  experiences={experiences} isLoading={isLoading}/>
                </div>
            </div>
        </div>
    );
}

export default ManageExperience