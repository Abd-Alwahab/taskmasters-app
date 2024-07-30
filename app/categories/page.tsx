import { cache } from 'react'
import { getCategories } from '../_services/categoriesService'
import Menus from '../_components/Menus'
import { HiOutlinePlus } from 'react-icons/hi2'
import Modal, { ModalWindow, OpenModal } from '../_components/Modal'
import CreateNewCategoryForm from '../_features/categories/CreateNewCategoryForm'
import CategoriesIIndexList from '../_features/categories/CategoriesIIndexList'

async function Categories() {
  const categoriesPromise = cache(async () => await getCategories())
  const categories = await categoriesPromise()

  return (
    <Menus>
      <div className="flex h-full flex-col gap-6 bg-white">
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold">Categories</h1>

          <Modal>
            <OpenModal name="add-category">
              <button className="flex items-center gap-1 rounded-lg bg-gray-900 px-4 py-3 text-white">
                <span> New Category</span>
                <HiOutlinePlus fontSize={20} />
              </button>
            </OpenModal>

            <ModalWindow name="add-category" label="Create New Category">
              <CreateNewCategoryForm />
            </ModalWindow>
          </Modal>
        </div>

        <CategoriesIIndexList categories={categories ?? []} />
      </div>
    </Menus>
  )
}

export default Categories
