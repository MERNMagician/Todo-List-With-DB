import React from "react";

function Status({ completed, pending }) {
  return (
    <div className="flex flex-row gap-80 items-center font-[MonoLisa] text-[13px]">
      <TaskCompleted completed={completed ? ":" + completed : ":" + 0} />
      <TaskPending pending={pending ? ":" + pending : ":" + 0} />
    </div>
  );
}

function TaskCompleted({ completed }) {
  return (
    <div className="border-2 border-black p-5 rounded-xl">
      <p>Task Completed{completed}</p>
    </div>
  );
}

function TaskPending({ pending }) {
  return (
    <div className="border-2 border-black p-5 rounded-xl">
      <p>Task In Progress{pending}</p>
    </div>
  );
}

export default Status;
