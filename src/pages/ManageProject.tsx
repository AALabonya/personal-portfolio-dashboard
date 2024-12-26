
import CreateProject from "@/components/projectManage/CreateProject";
import ProjectTable from "@/components/projectManage/ProjectTable";


import { useGetAllProjectsQuery } from "@/redux/features/project/projectApi";


const ManageProject = () => {

      // Fetching data through RTK Query
  const { data: projectsData, isLoading } = useGetAllProjectsQuery("", {
    pollingInterval: 40000,
  });

  const projects = projectsData?.data;
console.log(projects);

  if (isLoading) {
    return (
      <div>
        loading.........
      </div>
    );
  }

    return (
        <div>

            <div className="rounded-sm border bg-white dark:bg-gray-900 mt-5">
                <div className="flex justify-between items-center border-b px-7 py-4">
                    <h3 className="font-medium text-black dark:text-white">
                        Create new project
                    </h3>
                    <div >
                       <CreateProject/>
                    </div>
                </div>
                <div className="p-7">
                <ProjectTable projects={projects} isLoading={isLoading} />
                </div>
            </div>
        </div>
    );
}

export default ManageProject