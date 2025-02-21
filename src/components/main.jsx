import { useState, useEffect, use } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import Task from "./task";

const Main = () => {
  const [currentTasks, updateTask] = useState([]);
  const [task, setTask] = useState("");
  const [id, setId] = useState(null);
  const [message, setMessage] = useState("");
  const [error_msg, setErrorMessage] = useState("");

  // ! FIx the querying problem
  // ! Implement deletion and updating of data

  TODO: useEffect(() => {
    axios
      .get(
        "http://localhost/PHP-Sessions/React-PHP-Api/todo-list/createConnection.php"
      )
      .then((response) => {
        updateTask(response.data);
      })
      .catch((error) => {
        console.error("Error at getting php data");
      });
  }, [currentTasks]);

  useEffect(() => {
    if (message) {
      show_success_message(message);
      document.getElementById("input").value = "";
    }
  }, [message]);

  useEffect(() => {
    if (error_msg) {
      show_alert_message(error_msg);
    }
  }, [error_msg]);

  const addTask = () => {
    axios
      .post(
        "http://localhost/PHP-Sessions/React-PHP-Api/todo-list/addTask.php",
        { id, task }
      )
      .then((response) => {
        setMessage(response.data.message);
      })
      .catch((error) => {
        setErrorMessage("Error at adding user");
      });
  };

  const show_alert_message = (error_message) => {
    Swal.fire({
      title: "Error",
      text: error_message,
      icon: "error",
    });
    setErrorMessage("");
  };

  const show_success_message = (success_message) => {
    Swal.fire({
      title: "Success",
      text: success_message,
      icon: "success",
    });

    setMessage("");
  };

  const handleValue = (event) => {
    setTask(event.target.value);
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
        {currentTasks.map((item) => (
          <Task taskName={item} />
        ))}
      </div>
    </div>
  );
};

export default Main;
