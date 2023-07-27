const Header = ({ totalTask, handleConfirmation }) => {
  return (
    <>
      <div>
        <h1 className="text-2xl  ml-5">Monday Shopping!</h1>
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
