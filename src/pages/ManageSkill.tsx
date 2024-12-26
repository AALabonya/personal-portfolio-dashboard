
import CreateSkill from "@/components/ManageSkills/CreateSkill";
import SkillTable from "@/components/ManageSkills/SkillTable";
import { Button } from "@/components/ui/button";
import { useGetAllSkillsQuery } from "@/redux/features/skill/skillApi";


const ManageSkill = () => {
    const { data: skillsData, isLoading } = useGetAllSkillsQuery("", {
        pollingInterval: 40000,
      });
    
      const skills = skillsData?.data;
    
      if (isLoading) {
        return (
          <div>
            Loading.....
          </div>
        );
      }
    
    return (
        <div>
      
            <div className="rounded-sm border bg-white dark:bg-gray-900 mt-5">
                <div className="flex justify-between items-center border-b px-7 py-4">
                    <h3 className="font-medium text-black dark:text-white">
                        Create new Skils
                    </h3>
                    <Button asChild variant={'default'} size={'sm'}>
                      <CreateSkill/>
                    </Button>
                </div>
                <div className="p-7">
                  <SkillTable skills={skills} isLoading={isLoading}/>
                </div>
            </div>
        </div>
    );
}

export default ManageSkill;