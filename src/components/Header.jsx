import React, { useState, useEffect, useRef } from "react";

const Header = ({ totalTask, handleConfirmation }) => {
  const [editing, setEditing] = useState(false);
  const [headerData, setHeaderData] = useState({
    title: "",
    description: "Add your groceries here",
  });
  const titleInputRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const MAX_TITLE_LENGTH = 20;
  const [prevTitle, setPrevTitle] = useState("");
  const [error, setError] = useState("");
  // const descriptionInputRef = useRef(null);

  useEffect(() => {
    // Load the header text from localStorage on component mount
    const storedHeaderData = localStorage.getItem("headerData");
    if (storedHeaderData) {
      const setParsedHeaderData = JSON.parse(storedHeaderData);
      setHeaderData((prevHeaderData) => ({
        ...prevHeaderData,
        ...setParsedHeaderData,
      }));
    }
    setLoading(false); // Mark loading as false once the data is loaded
  }, []);

  const saveTheTitle = () => {
    const numWords = headerData.title.length;

    if (numWords > MAX_TITLE_LENGTH) {
      // alert(`Title must be less than ${MAX_TITLE_LENGTH} words.`);
      setHeaderData((prevHeaderData) => ({
        ...prevHeaderData,
        title: prevTitle, // Revert back to the previous title
      }));
      return;
    }

    localStorage.setItem("headerData", JSON.stringify(headerData));
    setError("");
    console.log("updated");
  };

  const handleSave = () => {
    saveTheTitle();
  };

  const handleInputChange = (event) => {
    if (headerData.title.length > MAX_TITLE_LENGTH) {
      setError(`Title must be less than ${MAX_TITLE_LENGTH} words.`);
    } else {
      setError("");
    }

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

  const isDisabled = headerData.title.length > MAX_TITLE_LENGTH;

  return (
    <>
      <div>
        <div className="my-3">
          {editing ? (
            <section>
              <div className=" flex  ">
                {/* title input */}
                <input
                  ref={(element) => (titleInputRef.current = element)}
                  className="text-2xl ml-5 rounded-lg outline-none"
                  type="text"
                  name="title"
                  value={headerData.title}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  onFocus={() => setPrevTitle(headerData.title)}
                />
                {/* description input */}
                {/* <input ref={descriptionInputRef} className="text-2xl ml-5 hidden" name="description" type="text" value={headerData.description} onChange={handleInputChange} onBlur={handleInputBlur} /> */}
                <button type="button" onClick={handleSave} disabled={isDisabled} className="bg-blue-600 w-8 h-8 rounded-full text-white">
                  ✓
                </button>
              </div>
              {error && <p className="text-red-500 text-xs ml-5">{error}</p>}
            </section>
          ) : (
            <div>
              {loading ? (
                <h1>Loading...</h1>
              ) : (
                <h1 className="text-2xl ml-5 " onClick={handleEditClick}>
                  {headerData.title || "Click to add header title"}
                </h1>
              )}
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
