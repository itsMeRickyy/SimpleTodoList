import { useEffect, useState } from "react";

function Counter() {
  const [color, setColor] = useState("text-blue-500");
  const [count, setCount] = useState(1);

  useEffect(() => {
    if (count > 2) {
      setColor("text-red-500");
    }
  });
  const changeColor = () => {
    setColor("text-red-500");
  };
  return (
    <>
      <h1>
        color is <span className={color}>||||</span>
      </h1>
      <button onClick={() => changeColor()}>Change Color</button>
      <h1>number is {count}</h1>
      <button onClick={() => setCount(count + 1)}>count +</button>
      <button onClick={() => setCount(count - 1)}>count -</button>
      {/* <Profile />
      <Introduction name="rizkiii" /> */}
    </>
  );
}

export default Counter;
