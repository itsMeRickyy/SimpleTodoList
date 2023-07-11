import { Dialog } from "@headlessui/react";
import { useState } from "react";

function ConfirmationModal(props) {
  const { isOpen, onCancel, onConfirm } = props;
  //   let [isOpen, setIsOpen] = useState(true);

  return (
    <Dialog open={isOpen} onClose={onCancel}>
      <Dialog.Panel className="bg-blue-500 text-white p-3  w-72 rounded-2xl  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-3 justify-center items-center">
        <Dialog.Title className="text-xl">Deleting plan</Dialog.Title>

        <p className="font-light w-full text-center">Delete this plan?</p>
        <div className="flex gap-3">
          <button onClick={onCancel} className="bg-red-400 rounded-md px-2 ">
            Cancel
          </button>
          <button onClick={onConfirm} className="px-2">
            Delete
          </button>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
}

export default ConfirmationModal;
