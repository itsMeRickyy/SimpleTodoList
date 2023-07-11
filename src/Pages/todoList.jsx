import { useState, useEffect, useRef } from "react";
import ConfirmationModal from "../components/Todolist/ModalBox/ConfirmationModal";

const TodoListApp = () => {
  const [todoList, setTodoList] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e) => {
    setNewTask(e.target.value);
    setInputValue(e.target.value);
  };

  const addTask = () => {
    const MAX_TASK_LENGTH = 50;

    if (newTask.trim() === "") {
      alert("Please enter a task.");
      return;
    }

    if (newTask.length > MAX_TASK_LENGTH) {
      alert(`Task must be less than ${MAX_TASK_LENGTH} characters.`);
      return;
    }

    const existingTask = todoList.find((task) => task.taskName === newTask);

    if (existingTask) {
      return;
    }

    const task = {
      id: todoList.length === 0 ? 1 : todoList[todoList.length - 1].id + 1,
      taskName: newTask,
    };

    const updatedToDoList = [...todoList, task];
    setTodoList(updatedToDoList);

    localStorage.setItem("todoList", JSON.stringify(updatedToDoList));

    setInputValue("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addTask();
      e.target.value = "";
    }
    // setNewTask((e.target.value = "" ? "" : e.target.value) + "\n");
  };

  useEffect(() => {
    const storedTodoList = localStorage.getItem("todoList");

    if (storedTodoList) {
      setTodoList(JSON.parse(storedTodoList));
    }
  }, []);

  //   const removeTask = (index) => {
  //     const newTodoList = [...todoList];
  //     newTodoList.splice(index, 1);
  //     setTodoList(newTodoList);
  //   };

  const handleDeleteWithConfirmation = (id) => {
    setTaskToDelete(id);
    setShowConfirmationModal(true);
  };

  const handleCancelDelete = () => {
    setShowConfirmationModal(false);
    setTaskToDelete(null);
  };
  const deleteTask = (id) => {
    handleDeleteWithConfirmation(id);
    const updatedToDoList = todoList.filter((task) => task.id !== id);
    setTodoList(updatedToDoList);

    const updatedLocalStorageList = updatedToDoList.map((task) => ({
      id: task.id,
      taskName: task.taskName,
    }));
    localStorage.setItem("todoList", JSON.stringify(updatedLocalStorageList));
  };

  const handleConfirmDelete = () => {
    deleteTask(taskToDelete);
    setShowConfirmationModal(false);
  };

  const handleCheckList = (id) => {
    setTodoList((prevList) => prevList.map((task) => (task.id === id ? { ...task, checked: !task.checked } : task)));
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center bg-gradient-to-r from-sky-400 to-cyan-300 min-h-screen ">
        <div className="App   h-96  w-[22rem]   rounded-xl  pb-2">
          <div>
            <h1 className="text-4xl ml-2 text-white">Just do it!</h1>
          </div>
          <div className="addTask flex gap-4 justify-between p-2 bg-white rounded-xl shadow-md">
            <input className="border p-2 border-blue-800 rounded-lg ml-3" placeholder="Add Task" value={inputValue} onChange={handleChange} onKeyDown={handleKeyDown} type="text" />
            <button className="bg-blue-600 text-white text-sm px-2 rounded-xl font-bold " onClick={addTask}>
              Add Task
            </button>
          </div>
          <div className=" mt-3 rounded-xl bg-white  py-3 shadow-2xl">
            <div className="overflow-auto scroll  w-full ">
              <div className="list max-h-full h-80  px-3">
                {todoList.map((task) => (
                  <div key={task.id} className="  flex justify-between gap-2 items-center mt-1 ">
                    <div className={` w-56  rounded-lg ${task.checked ? "bg-green-200" : ""}`}>
                      <p className={` mx-2 my-1 }`}>{task.taskName}</p>
                      <hr />
                    </div>

                    {/* <button onClick={() => removeTask(todoList.indexOf(task))} className="mr-5 px-1 border border-slate-500 rounded-md">
                X
              </button> */}
                    <div className="flex gap-3 ">
                      <button onClick={() => handleDeleteWithConfirmation(task.id)} className=" px-1 border border-slate-500 rounded-md">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon icon-tabler icon-tabler-x"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                          stroke="currentColor"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                          <path d="M18 6l-12 12"></path>
                          <path d="M6 6l12 12"></path>
                        </svg>
                      </button>
                      <button className=" px-1 border border-slate-500 rounded-md">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon icon-tabler icon-tabler-edit"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                          stroke="currentColor"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                          <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1"></path>
                          <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z"></path>
                          <path d="M16 5l3 3"></path>
                        </svg>
                      </button>
                      <button onClick={() => handleCheckList(task.id)} className=" px-1 border border-slate-500 rounded-md">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon icon-tabler icon-tabler-check"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                          stroke="currentColor"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                          <path d="M5 12l5 5l10 -10"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {showConfirmationModal && <ConfirmationModal onCancel={handleCancelDelete} onConfirm={handleConfirmDelete} isOpen={showConfirmationModal} />}
    </>
  );
};

export default TodoListApp;
