import { Tables } from "@/database.types";
import { getCategories } from "@/app/_services/categoriesService";
import { getTasks } from "../_services/tasksServices";

function TasksColumn({
  tasks,
  label,
  categoryId,
}: {
  tasks: Tables<"tasks">[];
  label: string;
  categoryId: number;
}) {
  const columnTasks = tasks?.filter((task) => task.category === categoryId);
  return (
    <div className="h-full rounded-lg bg-gray-200 shadow-lg">
      <h3 className=" rounded-lg bg-gray-900 py-3 text-center text-lg font-bold text-white">
        {label}
      </h3>
      <div className="flex flex-col gap-3 p-3 ">
        {columnTasks?.map((task) => (
          <div key={task.id} className="cursor-pointer rounded-lg bg-white p-3">
            <h3 className="mb-2 font-bold">{task.title}</h3>
            <p>{task.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

async function Planner() {
  const tasks = await getTasks();
  const categories = await getCategories();

  return (
    <div className={`flex h-full  gap-4 overflow-x-auto`}>
      {categories?.map((category) => (
        <div className="h-full min-w-[335px]" key={category.id}>
          <TasksColumn
            label={category.name}
            tasks={tasks}
            categoryId={category.id}
          />
        </div>
      ))}
    </div>
  );
}

export default Planner;
