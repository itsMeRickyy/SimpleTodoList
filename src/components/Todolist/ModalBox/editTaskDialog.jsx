import { Dialog } from "@headlessui/react";
import { useState } from "react";

function EditTaskModal(props) {
  const { isOpen, onCancel, onClick = () => {}, children, title, task, onUpdateTask } = props;
  const { onKeyDown } = props;
  //   let [isOpen, setIsOpen] = useState(true);

  if (!open) {
    return null;
  }

  return (
    <Dialog open={isOpen} onClose={onCancel} task={task} onUpdateTask={onUpdateTask}>
      <Dialog.Panel className="bg-blue-500 text-white p-3  w-72 rounded-2xl  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-3 justify-center items-center">
        <Dialog.Title className="text-xl">{title}</Dialog.Title>

        <div className="addTask  gap-4 justify-between p-2 flex ">{children}</div>
        <div className="flex gap-3">
          <button onClick={onCancel} className="bg-red-400 flex pb-1 rounded-md px-2 ">
            Cancel
          </button>
          <button onClick={onClick} onKeyDown={onKeyDown} className="px-2 pb-1 ">
            Update Task
          </button>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
}

export default EditTaskModal;
