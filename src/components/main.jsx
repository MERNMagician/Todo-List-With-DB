import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Task from "./task";
import Status from "./status";

const Main = () => {
  const [currentTasks, updateTask] = useState([]);
  const [currentValue, getCurrentValue] = useState("");
  let [completed, setCompleted] = useState(0);
  let [inProgress, setInProgress] = useState(0);

  useEffect(() => {
    document.getElementById("input").value = "";
    localStorage.setItem("Task", JSON.stringify(currentTasks));
  }, [currentTasks]);

  const show_alert_message = () => {
    Swal.fire({
      title: "Error",
      text: "Input cannot be empty",
      icon: "error",
    });
  };

  const show_success_message = () => {
    console.log(inProgress);
    Swal.fire({
      title: "Success",
      text: "Task Added Successfully",
      icon: "success",
    });
  };

  const handleValue = (event) => {
    getCurrentValue(event.target.value);
  };

  const addTask = () => {
    if (!currentValue) {
      show_alert_message();
      return;
    }
    updateTask([...currentTasks, currentValue]);
    show_success_message();
    getCurrentValue("");
    setInProgress(inProgress + 1);
  };

  return (
    <div className="flex flex-col items-center gap-13 mt-10 font-[Fira Code] ">
      <header className="text-center ">
        <h1 className="text-3xl font-[Jetbrains Mono] font-bold text-black">
          Todo List
        </h1>
      </header>
      <section className="flex flex-row gap-5 w-300  justify-center">
        <section className="box flex flex-row items-center gap-2 border-2 border-black p-1 rounded-lg">
          <input
            type="text"
            placeholder="Enter task description"
            className=" outline-none  rounded-md placeholder:text-gray-500  w-120  placeholder:text-bold  font-[Kanit] placeholder:p-3"
            id="input"
            onChange={handleValue}
          />
        </section>
        <section className="flex items-center gap-5">
          <button
            className="border-2 p-4 w-40 rounded-xl  border-black text-black hover:bg-black hover:text-white cursor-pointer font-[Jetbrains Mono] font-bold "
            onClick={addTask}
          >
            Add Task
          </button>
          <i className=" fa-regular fa-moon text-4 text-black border-2 p-3 rounded-xl  w-13 text-center border-balck hover:bg-black hover:text-white cursor-pointer"></i>
        </section>
      </section>
      <div className="flex flex-col gap-5">
        {<Status completed={completed} pending={inProgress} />}

        {currentTasks.map((item) => (
          <Task taskName={item} />
        ))}
      </div>
    </div>
  );
};

export default Main;
