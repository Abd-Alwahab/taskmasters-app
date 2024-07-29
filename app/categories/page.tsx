import { cache } from 'react'
import { getCategories } from '../_services/categoriesService'
import Menus, { Button, List, Menu, Toggle } from '../_components/Menus'
import { HiOutlinePlus, HiPencil, HiTrash } from 'react-icons/hi2'
import Modal, { ModalWindow, OpenModal } from '../_components/Modal'
import DeleteCategory from '../_features/categories/DeleteCategory'
import CreateNewCategoryForm from '../_features/categories/CreateNewCategoryForm'

async function Categories() {
  const categoriesPromise = cache(async () => await getCategories())
  const categories = await categoriesPromise()
  return (
    <Menus>
      <div className="flex flex-col gap-6">
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

        <div className="flex gap-6">
          {categories?.map((category) => (
            <Modal key={category.id}>
              <div className="flex w-fit items-center rounded-lg border border-gray-800 px-3 py-2">
                <span>{category.name}</span>

                <Menu>
                  <Toggle id={String(category.id)} />
                  <List id={String(category.id)}>
                    <Button icon={<HiPencil />} ariaLabel="Edit">
                      Edit
                    </Button>

                    <OpenModal name="delete-category">
                      <Button icon={<HiTrash />} ariaLabel="Delete">
                        Delete
                      </Button>
                    </OpenModal>
                  </List>
                </Menu>
              </div>

              <ModalWindow name="delete-category" label="Delete Category">
                <DeleteCategory categoryId={category.id} />
              </ModalWindow>
            </Modal>
          ))}
        </div>
      </div>
    </Menus>
  )
}

export default Categories
