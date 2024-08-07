import Skeleton from '@/app/_components/Skeleton'

function TaskListSkeletonLoader() {
  const items = Array.from({ length: 4 }).map((_, index) => index + 1)

  return (
    <div className="flex h-full flex-col gap-4 bg-gray-100">
      <div
        className="flex h-full flex-col gap-3 overflow-x-auto lg:grid"
        style={{
          gridTemplateColumns: `repeat(${items?.length ?? 0}, minmax(350px, 1fr))`,
        }}
      >
        {items?.map((item) => {
          return <Skeleton borderRadius={8} key={item} />
        })}
      </div>
    </div>
  )
}

export default TaskListSkeletonLoader
