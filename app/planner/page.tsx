import Categories from "../_components/Categories";
import CreateNewCategory from "../_components/CreateNewCategory";

async function Planner() {
  return (
    <div className="h-full">
      <div className="mb-4 ml-auto w-fit">
        <CreateNewCategory />
      </div>
      <Categories />
    </div>
  );
}

export default Planner;
