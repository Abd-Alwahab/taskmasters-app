import { getTasks } from "../_services/tasksServices";

function TasksColumn({
  tasks,
  category,
  label,
}: {
  tasks: any[];
  category: string;
  label: string;
}) {
  const columnTasks = tasks?.filter((task) => task.status === category);
  return (
    <div className="rounded-lg bg-gray-200 shadow-lg">
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

  return (
    <div className="grid h-full grid-cols-4 gap-4">
      <TasksColumn label="TODO" tasks={tasks} category="TODO" />
      <TasksColumn label="IN PROGRESS" tasks={tasks} category="IN_PROGRESS" />
    </div>
  );
}

export default Planner;
