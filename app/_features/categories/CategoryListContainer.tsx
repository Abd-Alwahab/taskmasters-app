import Menus from '@/app/_components/Menus'
import Modal, { OpenModal } from '@/app/_components/Modal'
import { getCategories } from '@/app/_services/categoriesService'
import { getCategoriesTasks } from '@/app/_services/tasksServices'
import { HiOutlinePlus } from 'react-icons/hi2'
import { RiErrorWarningFill } from 'react-icons/ri'
import CategoriesIIndexList from './CategoriesIIndexList'
import CreateNewCategoryForm from './CreateNewCategoryForm'
import dynamic from 'next/dynamic'

const ModalWindow = dynamic(
  () => import('@/app/_components/Modal').then((mod) => mod.ModalWindow),
  {
    ssr: false,
  },
)

const MAX_CATEGORIES = 10

async function CategoryListContainer() {
  const [categories, categoriesTasks] = await Promise.all([
    getCategories(),
    getCategoriesTasks(),
  ])

  return (
    <Menus>
      <div className="flex h-full flex-col gap-4 bg-gray-100">
        <div className="flex items-center justify-between rounded-lg bg-white px-1 py-2 lg:pl-5">
          <h1 className="text-xl font-bold lg:text-2xl">Categories</h1>

          <Modal>
            <OpenModal name="add-category">
              <button className="flex items-center gap-1 rounded-lg bg-gray-900 px-2 py-1.5 text-white lg:px-4 lg:py-3">
                <span className="text-xs lg:text-sm"> New Category</span>
                <HiOutlinePlus fontSize={18} />
              </button>
            </OpenModal>

            <ModalWindow
              name="add-category"
              label={
                categories?.length === MAX_CATEGORIES
                  ? 'Reach the maximum number of categories'
                  : 'Create New Category'
              }
            >
              {categories?.length === MAX_CATEGORIES ? (
                <div className="flex flex-col items-center justify-center gap-4 text-xl">
                  <RiErrorWarningFill fontSize={80} color="red" />
                  <span>
                    You have already created the maximum number of{' '}
                    {MAX_CATEGORIES} categories.
                  </span>
                </div>
              ) : (
                <CreateNewCategoryForm categories={categories ?? []} />
              )}
            </ModalWindow>
          </Modal>
        </div>

        {categories?.length ? (
          <CategoriesIIndexList
            categories={categories}
            categoriesTasks={categoriesTasks ?? []}
          />
        ) : (
          <div className="flex size-full flex-col items-center justify-center gap-8">
            <span className="text-2xl font-semibold lg:text-4xl">
              No categories found
            </span>
          </div>
        )}
      </div>
    </Menus>
  )
}

export default CategoryListContainer
