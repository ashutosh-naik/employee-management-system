import React from "react";
import AcceptTask from "./AcceptTask";
import NewTask from "./NewTask";
import CompleteTask from "./CompleteTask";
import FailedTask from "./FailedTask";
import {
  updateEmployeeByEmail,
  saveLoggedInUser,
} from "../../utils/localStorage";

const TaskList = ({ data }) => {
  const handleUpdateTask = (taskIdx, changes) => {
    // build updated tasks
    const updatedTasks = data.tasks.map((t, i) =>
      i === taskIdx ? { ...t, ...changes } : t
    );

    // compute new taskCounts (simple recalculation)
    const counts = { active: 0, newTask: 0, completed: 0, failed: 0 };
    updatedTasks.forEach((t) => {
      if (t.active) counts.active += 1;
      if (t.newTask) counts.newTask += 1;
      if (t.completed) counts.completed += 1;
      if (t.failed) counts.failed += 1;
    });

    const updatedEmployee = {
      ...data,
      tasks: updatedTasks,
      taskCounts: counts,
    };

    // update employees in localStorage
    updateEmployeeByEmail(data.email, updatedEmployee);

    // if the logged in user is the same employee, update loggedInUser too
    try {
      const logged = JSON.parse(localStorage.getItem("loggedInUser"));
      if (
        logged &&
        logged.role === "employee" &&
        logged.data &&
        logged.data.email === data.email
      ) {
        saveLoggedInUser({ role: "employee", data: updatedEmployee });
      }
    } catch (e) {}

    // refresh to show updates (simple approach)
    window.location.reload();
  };

  return (
    <div
      id="tasklist"
      className="h-[50%] overflow-x-auto flex items-center justify-start gap-5 flex-nowrap w-full py-1 mt-16"
    >
      {data.tasks.map((elem, idx) => {
        if (elem.active) {
          return (
            <AcceptTask
              key={idx}
              data={elem}
              onComplete={() =>
                handleUpdateTask(idx, {
                  active: false,
                  completed: true,
                  newTask: false,
                  failed: false,
                })
              }
              onFail={() =>
                handleUpdateTask(idx, {
                  active: false,
                  failed: true,
                  newTask: false,
                  completed: false,
                })
              }
            />
          );
        }
        if (elem.newTask) {
          return (
            <NewTask
              key={idx}
              data={elem}
              onAccept={() =>
                handleUpdateTask(idx, {
                  active: true,
                  newTask: false,
                  completed: false,
                  failed: false,
                })
              }
            />
          );
        }
        if (elem.completed) {
          return (
            <CompleteTask
              key={idx}
              data={elem}
              onReopen={() =>
                handleUpdateTask(idx, {
                  active: true,
                  completed: false,
                  newTask: false,
                  failed: false,
                })
              }
            />
          );
        }
        if (elem.failed) {
          return (
            <FailedTask
              key={idx}
              data={elem}
              onRetry={() =>
                handleUpdateTask(idx, {
                  active: true,
                  failed: false,
                  newTask: false,
                  completed: false,
                })
              }
            />
          );
        }
        return null;
      })}
    </div>
  );
};

export default TaskList;
