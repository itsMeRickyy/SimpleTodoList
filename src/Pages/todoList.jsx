import { useState, useEffect, useRef } from "react";
import ConfirmationModal from "../components/Todolist/ModalBox/ConfirmationModal";
import TaskModal from "../components/Todolist/ModalBox/TaskDialog";
import EditTaskModal from "../components/Todolist/ModalBox/editTaskDialog";
import Header from "../components/Header";
import BtnInsideTask from "../components/ButtonInsideTask";

const TodoListApp = () => {
  const [todoList, setTodoList] = useState(() => {
    const storedTodoList = localStorage.getItem("todoList");
    return storedTodoList ? JSON.parse(storedTodoList) : [];
  });
  const [newTask, setNewTask] = useState("");
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [totalTask, setTotalTask] = useState(0);
  const [enterButtonClicked, setEnterButtonClicked] = useState(false);
  // edit task state
  const [showEditTaskModal, setShowEditTaskModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [updatedText, setUpdatedText] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);

  const MAX_TASK_LENGTH = 30;

  const handleChange = (e) => {
    setNewTask(e.target.value);
    setInputValue(e.target.value);
  };

  const addTask = () => {
    if (newTask === "") {
      alert("Please enter a task.");
      return;
    }

    if (newTask.length > MAX_TASK_LENGTH) {
      alert(`Task must be less than ${MAX_TASK_LENGTH} characters.`);
      return;
    }

    const existingTask = todoList.find((task) => task.taskName === newTask);

    if (existingTask) {
      alert("this task was added");
      // alert("Please enter a task.");
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
    console.log("add task clicked");
    setShowAddTaskModal(false);

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 10); // Simulating a 1-second asynchronous task
    });
  };

  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      if (newTask.trim() === "") {
        alert("Please enter a task.");
        return;
      }
      await addTask();
      setEnterButtonClicked(true);
      setShowAddTaskModal(false);
    }
  };

  useEffect(() => {
    const storedTodoList = localStorage.getItem("todoList");

    if (storedTodoList) {
      try {
        const parsedTodoList = JSON.parse(storedTodoList);
        setTodoList(parsedTodoList);
      } catch (error) {
        // Handle the error, such as showing a message or resetting the todoList state
        console.error("Error parsing stored todoList:", error);
        // Reset the todoList state to a default value, if needed
        setTodoList([]);
      }
    }
  }, []);

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

  // const handleCheckList = (id) => {
  //   setTodoList((prevList) => prevList.map((task) => (task.id === id ? { ...task, checked: !task.checked } : task)));
  // };

  const handleCheckList = (id) => {
    setTodoList((prevList) => prevList.map((task) => (task.id === id ? { ...task, checked: !task.checked } : task)));
    console.log(id);
  };

  useEffect(() => {
    const taskIds = todoList.map((task) => task.id);
    setTotalTask(taskIds.length);
  }, [todoList]);

  // modal box add task

  const handleConfirmationAddTaskModal = () => {
    event.preventDefault();

    setShowAddTaskModal(true);
  };

  const handleCancelAddTask = () => {
    setShowAddTaskModal(false);
  };

  const handleConfirmAddTask = () => {
    addTask();
    // console.log("clicked");
    console.log(inputValue);
    setShowAddTaskModal(false);
  };

  // Edit task

  const task = todoList.find((task) => task.id === selectedTask);

  const handleCloseModal = () => {
    setShowEditTaskModal(false);
    setSelectedTask(null);
    setUpdatedText("");
  };

  const handleInputChange = (e) => {
    setUpdatedText(e.target.value);
  };

  // const handleUpdateTask = (updatedTask) => {
  //   const taskIndex = todoList.findIndex((task) => task.id === updatedTask.id);
  //   if (taskIndex === -1) {
  //     console.log("task not found");
  //     return;
  //   }
  //   const updatedList = [...todoList.slice(0, taskIndex), updatedTask, ...todoList.slice(taskIndex + 1)];
  //   setTodoList(updatedList);
  //   localStorage.setItem("todoList", JSON.stringify(updatedList));
  // };

  const handleEditTaskClick = (task) => {
    setShowEditTaskModal(true);
    setEditingTaskId(task.id);
    setSelectedTask(task);
    setUpdatedText(task.taskName);
    console.log(task.taskName);
  };

  const handleSaveTask = () => {
    const existingTask = todoList.find((task) => task.taskName === updatedText && task.id !== selectedTask.id);

    if (existingTask) {
      alert("A task with this name already exists. Please choose a different name.");
      return;
    }

    const updatedTodoList = todoList.map((task) => (task.id === selectedTask.id ? { ...task, taskName: updatedText } : task));
    setTodoList(updatedTodoList);
    setShowEditTaskModal(false);
    console.log("updated");
  };

  // Save the updated todoList to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }, [todoList]);

  return (
    <>
      <div className="flex flex-col justify-center items-center bg-slate-300 min-h-screen ">
        <div className="App     w-[22rem]   rounded-xl  bg-white">
          <div className="mt-3">
            <Header totalTask={totalTask} handleConfirmation={handleConfirmationAddTaskModal}></Header>
          </div>
          <div className="  rounded-xl bg-white  py-3 shadow-2xl">
            <div className="overflow-auto scroll  w-full ">
              <div className="list max-h-full h-96  px-3">
                {todoList.map((task) => (
                  <div key={task.id} className="  flex justify-between gap-2 items-center mt-1 ">
                    <div className={` w-full h-28 px-3 py-2 rounded-3xl flex justify-between items-start ${task.checked ? "bg-green-200" : "bg-slate-200"}`}>
                      <p className={` mx-2 my-1 }`}>{task.taskName}</p>
                      <BtnInsideTask key={task.id} task={task} handleDelete={handleDeleteWithConfirmation} handleCheckList={handleCheckList} handleEditTask={() => handleEditTaskClick(task)} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="modalBox">
        {/* add task modal */}
        <div>
          {showAddTaskModal && (
            <TaskModal title={"Add Task"} btnTitle="Add Task" onCancel={handleCancelAddTask} onKeyDown={handleKeyDown} onClick={handleConfirmAddTask} isOpen={showAddTaskModal}>
              <input className="text-slate-800 border p-2 border-blue-800 rounded-lg ml-3" placeholder="Add Task" onChange={handleChange} onKeyDown={handleKeyDown} type="text" />
            </TaskModal>
          )}
        </div>
        {/* edit task modal */}

        <div>
          {showEditTaskModal && selectedTask && (
            <TaskModal task={selectedTask.id} title={"Update Task"} btnTitle="Update Task" onClick={handleSaveTask} onCancel={handleCloseModal} isOpen={showEditTaskModal}>
              <input className="text-slate-800 border p-2 border-blue-800 rounded-lg ml-3" placeholder="Add Task" type="text" key={selectedTask.id} value={updatedText} onChange={handleInputChange} />
            </TaskModal>
          )}
        </div>

        {/* delete task modal */}
        <div>{showConfirmationModal && <ConfirmationModal onCancel={handleCancelDelete} onConfirm={handleConfirmDelete} isOpen={showConfirmationModal} />}</div>
      </div>
    </>
  );
};

export default TodoListApp;
