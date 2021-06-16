import { useRef } from "react";
import { useDispatch } from "react-redux";
import { deleteTaskAsyncAction } from "../../../../state/action";
import Restore from "../../svg/Restore";

function handleDeleteButtonClick(e, restoreButtonRef, task, dispatch) {
  e.preventDefault();
  if (restoreButtonRef.current) {
    restoreButtonRef.current.setAttribute("disabled", "disabled");
    dispatch(deleteTaskAsyncAction(task));
    restoreButtonRef.current.removeAttribute("disabled");
  }
}

const RestoreButton = ({ task }) => {
  const dispatch = useDispatch();
  const restoreButtonRef = useRef();
  return (
    <button
      ref={restoreButtonRef}
      onClick={(e) =>
        handleDeleteButtonClick(e, restoreButtonRef, task, dispatch)
      }
      className="p-2 bg-white border border-gray-800 rounded dark:border-white dark:bg-gray-333 focus:outline-none"
    >
      <Restore />
    </button>
  );
};

export default RestoreButton;
