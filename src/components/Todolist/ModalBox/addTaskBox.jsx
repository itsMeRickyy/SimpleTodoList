import { Dialog } from "@headlessui/react";
import { useState } from "react";

function AddTaskModal(props) {
  const { isOpen, onCancel, onClick = () => {}, children, title, task, onUpdateTask, btnTitle } = props;
  const { inputValue, handleChange, addTask, onKeyDown } = props;
  //   let [isOpen, setIsOpen] = useState(true);

  const [updatedText, setUpdatedText] = useState("");

  const handleSaveButtonClick = () => {
    onClick(task.id, updatedText);
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onCancel} task={task} onUpdateTask={onUpdateTask}>
      <Dialog.Panel className="bg-blue-500 text-white p-3  w-72 rounded-2xl  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-3 justify-center items-center">
        <Dialog.Title className="text-xl">{title}</Dialog.Title>

        <div className="addTask  gap-4 justify-between p-2 flex ">
          {/* <input className="border p-2 text-slate-500 border-blue-800 rounded-lg ml-3" placeholder="Add Task" value={inputValue} onChange={handleChange} onKeyDown={handleKeyDown} type="text" />
          <button className="hidden bg-blue-600 text-white  text-sm px-2 rounded-xl  " onClick={addTask}>
            + Add Task
          </button> */}
          {children}
        </div>
        <div className="flex gap-3">
          <button onClick={onCancel} className="bg-red-400 flex pb-1 rounded-md px-2 ">
            Cancel
          </button>
          <button onClick={onClick} onKeyDown={onKeyDown} className="px-2 pb-1 ">
            {btnTitle}
          </button>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
}

export default AddTaskModal;
