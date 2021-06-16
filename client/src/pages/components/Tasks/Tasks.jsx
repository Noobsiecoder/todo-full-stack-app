import { useSelector } from "react-redux";

import ImportantButton from "./Button/ImportantButton";
import DeleteButton from "./Button/DeleteButton";
import CompleteButton from "./Button/CompleteButton";
import RestoreButton from "./Button/RestoreButton";
import EraseButton from "./Button/EraseButton";

const TaskName = ({ taskTitle }) => (
  <span className="font-roboto dark:text-gray-50">{taskTitle}</span>
);

const TaskComponent = ({ task, type }) => (
  <li className="flex items-center justify-between px-4 py-2 rounded font-roboto dark:bg-gray-444 bg-gray-50">
    <div className="flex items-center justify-evenly gap-x-2">
      <CompleteButton task={task} />
      <TaskName taskTitle={task.taskTitle} />
    </div>
    {type ? (
      <div className="flex items-center text-sm justify-evenly gap-x-2 font-roboto">
        <RestoreButton task={task} />
        <EraseButton task={task} />
      </div>
    ) : (
      <div className="flex items-center text-sm justify-evenly gap-x-2 font-roboto">
        <ImportantButton task={task} />
        <DeleteButton task={task} />
      </div>
    )}
  </li>
);

const Tasks = ({ type }) => {
  const tasks = useSelector((state) => state.taskReducer.tasks);
  switch (type) {
    case "HOME":
      return (
        <ul className="grid gap-y-3">
          {tasks.length ? (
            tasks.map((task, i) =>
              task.isDeleted ? null : (
                <div key={i}>
                  <TaskComponent task={task} />
                </div>
              )
            )
          ) : (
            <span className="font-thin text-gray-444 dark:text-gray-50 font-roboto">NO data!</span>
          )}
        </ul>
      );
    case "IMPORTANT":
      return (
        <ul className="grid gap-y-3">
          {tasks.map((task, i) =>
            task.isImportant && !task.isDeleted ? (
              <div key={i}>
                <TaskComponent task={task} />
              </div>
            ) : null
          )}
        </ul>
      );
    case "DELETE":
      return (
        <ul className="grid gap-y-3">
          {tasks.map((task, i) =>
            task.isDeleted ? (
              <div key={i}>
                <TaskComponent task={task} type={type} />
              </div>
            ) : null
          )}
        </ul>
      );
    default:
      return null;
  }
};

export default Tasks;
