import Categories from "../_components/Categories";
import CreateNewCategory from "../_components/CreateNewTask";
import { getCategories } from "../_services/categoriesService";

async function Planner() {
  const categories = await getCategories();
  return (
    <div className="h-full">
      <div className="mb-4 ml-auto w-fit">
        <CreateNewCategory categories={categories ?? []} />
      </div>
      <Categories />
    </div>
  );
}

export default Planner;
