import { useRef } from "react";
import { useDispatch } from "react-redux";
import { importantTaskAsyncAction } from "../../../../state/action";

import Star from "../../../components/svg/Star";

function handleImportantButtonClick(e, importantButtonRef, task, dispatch) {
  e.preventDefault();
  if (importantButtonRef.current) {
    importantButtonRef.current.setAttribute("disabled", "disabled");
    dispatch(importantTaskAsyncAction(task));
    importantButtonRef.current.removeAttribute("disabled");
  }
}

const ImportantButton = ({ task }) => {
  const dispatch = useDispatch();
  const importantButtonRef = useRef();
  return (
    <button
      ref={importantButtonRef}
      onClick={(e) =>
        handleImportantButtonClick(e, importantButtonRef, task, dispatch)
      }
      className="p-2 transition duration-300 bg-white border border-yellow-400 rounded hover:shadow-lg dark:bg-gray-333 focus:outline-none"
    >
      <Star />
    </button>
  );
};

export default ImportantButton;
