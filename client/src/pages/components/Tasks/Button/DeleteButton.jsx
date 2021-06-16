import { useRef } from "react";
import { useDispatch } from "react-redux";
import { deleteTaskAsyncAction } from "../../../../state/action";
import Delete from "../../svg/Delete";

function handleDeleteButtonClick(e, deleteButtonRef, task, dispatch) {
  e.preventDefault();
  if (deleteButtonRef.current) {
    deleteButtonRef.current.setAttribute("disabled", "disabled");
    dispatch(deleteTaskAsyncAction(task));
    deleteButtonRef.current.removeAttribute("disabled");
  }
}

const DeleteButton = ({ task }) => {
  const dispatch = useDispatch();
  const deleteButtonRef = useRef();
  return (
    <button
      ref={deleteButtonRef}
      onClick={(e) =>
        handleDeleteButtonClick(e, deleteButtonRef, task, dispatch)
      }
      className="p-2 transition duration-300 bg-white border border-red-400 rounded hover:shadow-lg dark:bg-gray-333 focus:outline-none"
    >
      <Delete />
    </button>
  );
};

export default DeleteButton;
