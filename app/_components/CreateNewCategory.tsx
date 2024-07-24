import { HiOutlinePlus } from "react-icons/hi";
import Modal, { ModalWindow, OpenModal } from "./Modal";

const CreateNewCategory = () => {
  return (
    <Modal>
      <OpenModal name="new-category">
        <button className="flex items-center gap-1 rounded-lg bg-gray-900 px-4 py-2 text-white">
          <span> New Category</span>
          <HiOutlinePlus fontSize={20} />
        </button>
      </OpenModal>

      <ModalWindow name="new-category">
        <h3 className="text-lg font-bold">Create New Category</h3>
      </ModalWindow>
    </Modal>
  );
};

export default CreateNewCategory;
