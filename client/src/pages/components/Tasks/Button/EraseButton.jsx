import { useRef } from "react";
import { useDispatch } from "react-redux";
import { eraseTaskAsyncAction } from "../../../../state/action";
import Delete from "../../svg/Delete";

function handleEraseButtonClick(e, eraseButtonRef, task, dispatch) {
  e.preventDefault();
  if (eraseButtonRef.current) {
    eraseButtonRef.current.setAttribute("disabled", "disabled");
    dispatch(eraseTaskAsyncAction(task));
    eraseButtonRef.current.removeAttribute("disabled");
  }
}

const EraseButton = ({ task }) => {
  const dispatch = useDispatch();
  const eraseButtonRef = useRef();
  return (
    <button
      ref={eraseButtonRef}
      onClick={(e) => handleEraseButtonClick(e, eraseButtonRef, task, dispatch)}
      className="p-2 bg-white border border-red-400 rounded dark:bg-gray-333 focus:outline-none"
    >
      <Delete />
    </button>
  );
};

export default EraseButton;
