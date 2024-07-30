import { Menu, Toggle, List, Button } from '@/app/_components/Menus'
import Modal, { OpenModal, ModalWindow } from '@/app/_components/Modal'
import { HiPencil, HiTrash } from 'react-icons/hi2'
import DeleteCategory from './DeleteCategory'
import EditCategory from './EditCategory'
import { Tables } from '@/database.types'
import { Draggable, DraggableProvided } from '@hello-pangea/dnd'
import WarningModal from './WarningModal'

type Props = {
  category: Tables<'categories'>
  index: number
  categoryTasks: { category: number }[]
}
function CategoryCard({ category, index, categoryTasks }: Props) {
  return (
    <Draggable
      draggableId={String(category.orderIndex) ?? ''}
      index={index}
      disableInteractiveElementBlocking={false}
    >
      {(provided: DraggableProvided) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={{ ...provided.draggableProps.style }}
            className="bg-white"
          >
            <Modal>
              <div className="flex items-center justify-between gap-8 rounded-l p-3">
                <span className="flex items-center gap-2">
                  <span className="text-lg"> {category.name}</span>{' '}
                </span>

                <div className="relative flex flex-1 items-center justify-end">
                  <Menu>
                    <Toggle id={String(category.id)} />

                    <List id={String(category.id)}>
                      <OpenModal name="edit-category">
                        <Button icon={<HiPencil />} ariaLabel="Edit">
                          Edit
                        </Button>
                      </OpenModal>

                      <OpenModal name="delete-category">
                        <Button icon={<HiTrash />} ariaLabel="Delete">
                          Delete
                        </Button>
                      </OpenModal>
                    </List>
                  </Menu>
                </div>
              </div>

              <ModalWindow
                name="delete-category"
                label={categoryTasks?.length ? 'Warning' : 'Delete Category'}
              >
                {categoryTasks?.length > 0 ? (
                  <WarningModal />
                ) : (
                  <DeleteCategory categoryId={category.id} />
                )}
              </ModalWindow>

              <ModalWindow name="edit-category" label="Edit Category">
                <EditCategory categoryToEdit={category} />
              </ModalWindow>

              <div className="mt-28 text-center text-9xl text-gray-200">
                {categoryTasks?.length}
                <br />
                Tasks
              </div>
            </Modal>
          </div>
        )
      }}
    </Draggable>
  )
}

export default CategoryCard
