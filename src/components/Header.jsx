import React, { useState, useEffect, useRef } from "react";

const Header = ({ totalTask, handleConfirmation }) => {
  const [editing, setEditing] = useState(false);
  // const [updatedText, setUpdatedText] = useState("Groceries");
  const [headerData, setHeaderData] = useState({
    title: "Groceries",
    description: "Add your groceries here",
  });
  const titleInputRef = useRef(null);
  // const descriptionInputRef = useRef(null);

  useEffect(() => {
    const storedHeaderData = localStorage.getItem("headerData");
    if (storedHeaderData) {
      setHeaderData(JSON.parse(storedHeaderData));
    }
  }, []);

  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (editing && !titleInputRef.current.contains(event.target) && !descriptionInputRef.current.contains(event.target)) {
  //       handleSave();
  //       setEditing(false);
  //     }
  //   };

  //   document.addEventListener("click", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("click", handleClickOutside);
  //   };
  // }, [editing]);

  const handleSave = () => {
    if (headerData.title.trim() === "") {
      alert("Header title cannot be empty.");

      const storedHeaderText = localStorage.getItem("headerText");
      setHeaderData(storedHeaderText || "Default Header title");
      return;
    }
    // Save the updated header text to localStorage
    localStorage.setItem("headerData", JSON.stringify(headerData));
    console.log(headerData);
    console.log("updated");
  };

  const handleInputChange = (event) => {
    setHeaderData({
      ...headerData,
      [event.target.name]: event.target.value,
    });
  };

  const handleInputBlur = () => {
    if (editing) {
      handleSave();
      setEditing(false);
    }
  };

  const handleEditClick = () => {
    setEditing(true);
    console.log("clicked");
    setTimeout(() => {
      titleInputRef && titleInputRef.current.focus();
    }, 0);
  };

  return (
    <>
      <div>
        <div className="my-3">
          {editing ? (
            <section className=" flex  ">
              {/* title input */}
              <input ref={(element) => (titleInputRef.current = element)} className="text-2xl ml-5 rounded-lg outline-none" type="text" name="title" value={headerData.title} onChange={handleInputChange} onBlur={handleInputBlur} />
              {/* description input */}
              {/* <input ref={descriptionInputRef} className="text-2xl ml-5 hidden" name="description" type="text" value={headerData.description} onChange={handleInputChange} onBlur={handleInputBlur} /> */}
              <button type="button" onClick={handleSave} className="bg-blue-600 w-8 h-8 rounded-full text-white">
                ✓
              </button>
            </section>
          ) : (
            <div>
              <h1 className="text-2xl ml-5 " onClick={handleEditClick}>
                {headerData.title}
              </h1>
              <p className="hidden">{headerData.description}</p>
            </div>
          )}
        </div>

        <div className="flex justify-between px-5">
          <div className="flex gap-2">
            <p className="bg-blue-600 w-8 h-8 rounded-full flex items-center justify-center text-white">{totalTask}</p> <h1 className="text-2xl font-light">Task</h1>
          </div>
          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-blue-600">
            <button onClick={handleConfirmation}>
              <svg xmlns="http://www.w3.org/2000/svg" className="icon text-white icon-tabler icon-tabler-plus" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M12 5l0 14"></path>
                <path d="M5 12l14 0"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
