import { useRef } from "react";
import { useDispatch } from "react-redux";
import { completeTaskAsyncAction } from "../../../../state/action";

function handleCompletedButtonClick(e, checkBoxRef, task, dispatch) {
  e.preventDefault();
  if (checkBoxRef.current) {
    checkBoxRef.current.setAttribute("disabled", "disabled");
    dispatch(completeTaskAsyncAction(task));
    checkBoxRef.current.removeAttribute("disabled");
  }
}

const CompleteButton = ({ task }) => {
  const dispatch = useDispatch();
  const checkBoxRef = useRef();
  return (
    <div
      ref={checkBoxRef}
      onClick={(e) =>
        handleCompletedButtonClick(e, checkBoxRef, task, dispatch)
      }
      className={`${
        task.isCompleted
          ? "bg-blue-500 transition duration-200 hover:bg-blue-600"
          : "border bg-white dark:bg-gray-333 dark:border-transparent"
      } w-5 h-5 items-center justify-center  flex rounded cursor-pointer`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`w-4 h-4 ${
          task.isCompleted ? null : "invisible"
        } text-white`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 13l4 4L19 7"
        />
      </svg>
    </div>
  );
};

export default CompleteButton;
