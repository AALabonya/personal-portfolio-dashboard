
import { useGetAllProjectsQuery } from "@/redux/features/project/projectApi";

const Home = () => {
  const { data: projectsData } = useGetAllProjectsQuery("");

  // Products data
  const projects = projectsData?.data;
  console.log(projects, "data");

  return (
    <div className="m-10 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
       
      </div>
    </div>
  );
};

export default Home;
