import { motion } from "framer-motion";
const framer = () => {
  return (
    <>
      <div className="h-full ">
        <div className="w-full flex flex-col items-center  min-h-screen">
          <div className="">
            <Nav />
          </div>
          <div>
            <motion.div
              className="bg-green-200 w-20 h-20 mt-10"
              animate={{
                scale: [1, 2, 2, 1, 1],
                rotate: [0, 0, 270, 270, 0],
                borderRadius: ["20%", "20%", "50%", "50%", "20%"],
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default framer;
