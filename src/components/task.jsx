import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const Task = ({ taskName }) => {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [updateMessage, setUpdateMessage] = useState("");

  useEffect(() => {
    if (successMessage) {
      show_deletion_success(successMessage);
    }
  }, [successMessage]);

  useEffect(() => {
    if (errorMessage) {
      show_error_message(errorMessage);
    }
  }, [errorMessage]);

  useEffect(() => {
    if (updateMessage) {
      show_success_update(updateMessage);
    }
  }, [updateMessage]);

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
        console.log(response.data);
        setSuccessMessage(response.data);
      })
      .catch((error) => {
        setErrorMessage(error.data);
      });
  };

  const show_deletion_success = () => {
    console.log("Deletion success");

    Swal.fire({
      title: "Success",
      text: "Task Complete",
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

  const show_success_update = () => {
    Swal.fire({
      title: "Success",
      text: "TasK Update Successfull",
      icon: "success",
    });
  };

  const show_update_message = (event) => {
    const innerParent = event.target.parentNode;
    const mainParent = innerParent.parentNode;
    const taskToUpdate = mainParent.childNodes[0].textContent;

    Swal.fire({
      title: "Enter new task description",
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Update",
      showLoaderOnConfirm: true,
      preConfirm: async (new_task_description) => {},
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        const value = result.value;
        console.log(value);

        axios
          .post(
            "http://localhost/PHP-Sessions/React-PHP-Api/todo-list/updateTask.php",
            { value, taskToUpdate }
          )
          .then((response) => {
            setUpdateMessage(response.data);
          })
          .catch((error) => {
            throw new Error(error.data);
          });
      }
    });
  };

  const toggleDarkMode = () => {};

  return (
    <div className="flex flex-row justify-between   text-center font-mono p-3 rounded-lg items-center w-180  shadow-lg border-2 ">
      <p className="font-[ubuntu] font-bold w-96">{taskName}</p>
      <section className="flex gap-3 ">
        <button
          className="border-1 border-black rounded-lg p-2  bg-green-600 text-white hover:opacity-75 cursor-pointer font-[Kanit] hover:text-black"
          onClick={deleteTask}
        >
          Complete
        </button>
        <button
          className="border-1 border-black rounded-lg p-2  bg-red-600 text-white hover:opacity-75 cursor-pointer font-[Kanit] hover:text-black"
          onClick={show_update_message}
        >
          Update
        </button>
      </section>
    </div>
  );
};

export default Task;
