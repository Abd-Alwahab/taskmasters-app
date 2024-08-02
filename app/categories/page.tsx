import { cache } from 'react'
import { getCategories } from '../_services/categoriesService'
import Menus from '../_components/Menus'
import { HiOutlinePlus } from 'react-icons/hi2'
import Modal, { ModalWindow, OpenModal } from '../_components/Modal'
import CreateNewCategoryForm from '../_features/categories/CreateNewCategoryForm'
import CategoriesIIndexList from '../_features/categories/CategoriesIIndexList'
import { getCategoriesTasks } from '../_services/tasksServices'
import { RiErrorWarningFill } from 'react-icons/ri'

const MAX_CATEGORIES = 10

async function Categories() {
  const categoriesPromise = cache(async () => await getCategories())
  const categories = await categoriesPromise()

  const categoriesTasksPromise = cache(async () => await getCategoriesTasks())
  const categoriesTasks = await categoriesTasksPromise()

  return (
    <Menus>
      <div className="flex h-full flex-col gap-4 bg-gray-100">
        <div className="flex items-center justify-between rounded-lg bg-white px-1 py-2 lg:px-5">
          <h1 className="text-xl font-bold lg:text-3xl">Categories</h1>

          <Modal>
            <OpenModal name="add-category">
              <button className="flex items-center gap-1 rounded-lg bg-gray-900 px-2 py-1.5 text-white lg:px-4 lg:py-3">
                <span className="text-xs lg:text-base"> New Category</span>
                <HiOutlinePlus fontSize={20} />
              </button>
            </OpenModal>

            <ModalWindow
              name="add-category"
              label={
                (categories?.length ?? 0) === MAX_CATEGORIES
                  ? 'Reach the maximum number of categories'
                  : 'Create New Category'
              }
            >
              {(categories?.length ?? 0) === MAX_CATEGORIES ? (
                <div className="flex flex-col items-center justify-center gap-4 text-xl">
                  <RiErrorWarningFill fontSize={80} color="red" />
                  <span>
                    You have already created the maximum number of{' '}
                    {MAX_CATEGORIES} categories.
                  </span>
                </div>
              ) : (
                <CreateNewCategoryForm />
              )}
            </ModalWindow>
          </Modal>
        </div>

        {categories?.length ? (
          <CategoriesIIndexList
            categories={categories ?? []}
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

export default Categories
