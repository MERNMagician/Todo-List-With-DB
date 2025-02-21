import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const Task = ({ taskName }) => {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useState(() => {
    if (successMessage) {
      show_deletion_success(successMessage);
    }
  }, [successMessage]);

  useState(() => {
    if (errorMessage) {
      show_error_message(errorMessage);
    }
  }, [errorMessage]);

  const deleteTask = (event) => {
    const innerParent = event.target.parentNode;
    const mainParent = innerParent.parentNode;
    const taskToRemove = mainParent.childNodes[0].textContent;

    axios
      .post(
        "http://localhost/PHP-Sessions/React-PHP-Api/todo-list/deleteTask.php",
        { taskToRemove }
      )
      .then((response) => {
        setSuccessMessage(response.data.success_message);
      })
      .catch((error) => {
        setErrorMessage(error.data.error_message);
      });
  };

  const show_deletion_success = () => {
    Swal.fire({
      title: "Success",
      text: "Task Deletion Successfull",
      icon: "success",
    });
  };

  const show_error_message = () => {
    Swal.fire({
      title: "Error",
      text: "Task Deletion Failed",
      icon: "error",
    });
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
          onClick={deleteTask}
        >
          Delete
        </button>
      </section>
    </div>
  );
};

export default Task;
