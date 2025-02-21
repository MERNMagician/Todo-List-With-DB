import { useState, useEffect } from "react";
import axios from "axios";

const Task = ({ taskName }) => {
  const dataBase = localStorage.getItem("Task");
  const [taskStorage, insertTask] = useState([]);
  const [handleEvent, setEvent] = useState({});

  //TODO:
  // Implement crud

  const deleteTask = () => {
    const previousTask = JSON.parse(dataBase);
    let stored_task = [];

    if (previousTask.length > 1) {
      previousTask.map((item) => {
        stored_task.push(item);
      });
    }

    const toDelete = getToDelete();

    console.log(toDelete);
  };

  const getToDelete = () => {
    return handleEvent;
  };

  const getCurrentEvent = (event) => {
    setEvent(event);
    console.log(handleEvent);
  };

  return (
    <div className="flex flex-row justify-between   text-center font-mono p-3 rounded-lg items-center w-180  shadow-lg border-2 ">
      <p className="font-[ubuntu] font-bold w-96">{taskName}</p>
      <section className="flex gap-3 ">
        <button className="border-1 border-black rounded-lg p-2  bg-green-600 text-white  hover:bg-black hover:text-white cursor-pointer font-[Kanit]">
          Complete
        </button>
        <button
          className="border-1 border-black rounded-lg p-2  bg-red-600 text-white hover:opacity-75 cursor-pointer font-[Kanit] hover:text-black"
          onClick={() => {
            getCurrentEvent();
            deleteTask();
          }}
        >
          Delete
        </button>
      </section>
    </div>
  );
};

export default Task;
