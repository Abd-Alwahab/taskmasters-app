import { cache } from 'react'
import { getCategories } from '../_services/categoriesService'
import Menus, { Button, List, Menu, Toggle } from '../_components/Menus'
import { HiPencil, HiTrash } from 'react-icons/hi2'

async function Categories() {
  const categoriesPromise = cache(async () => await getCategories())
  const categories = await categoriesPromise()
  return (
    <Menus>
      <div className="flex flex-col gap-6">
        <h1 className="text-3xl font-bold">Categories</h1>

        <div className="flex gap-6">
          {categories?.map((category) => (
            <div
              key={category.id}
              className="flex w-fit items-center rounded-lg border border-gray-800 px-3 py-2"
            >
              <span>{category.name}</span>

              <Menu>
                <Toggle id={String(category.id)} />
                <List id={String(category.id)}>
                  <Button icon={<HiPencil />} ariaLabel="Edit">
                    Edit
                  </Button>

                  <Button icon={<HiTrash />} ariaLabel="Delete">
                    Delete
                  </Button>
                </List>
              </Menu>
            </div>
          ))}
        </div>
      </div>
    </Menus>
  )
}

export default Categories
