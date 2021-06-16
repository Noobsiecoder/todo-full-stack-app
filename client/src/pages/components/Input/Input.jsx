import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { addTaskAsyncAction } from "../../../state/action";

function handleChange(e, setInputValue) {
  e.preventDefault();
  setInputValue(e.target.value);
}

function handleSubmit(e, buttonRef, inputValue, setInputValue, dispatch) {
  e.preventDefault();
  if (buttonRef.current) {
    // Function to prevent double submit on click
    buttonRef.current.setAttribute("disabled", "disabled");
    if (inputValue.trim().length !== 0) {
      dispatch(addTaskAsyncAction(inputValue.trim()));
      setInputValue("");
    } else {
      alert("Invalid string, please enter again!");
    }
    buttonRef.current.removeAttribute("disabled");
  }
}

const Input = () => {
  let buttonRef = useRef();
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();
  return (
    <form
      onSubmit={(e) =>
        handleSubmit(e, buttonRef, inputValue, setInputValue, dispatch)
      }
    >
      <div className="flex items-center justify-center gap-x-2">
        <input
          className="w-full px-3 py-2 text-sm border rounded dark:text-gray-50 font-roboto dark:border-gray-300 dark:bg-gray-444 focus:outline-none"
          type="text"
          autoComplete="true"
          autoFocus={true}
          value={inputValue}
          onChange={(e) => handleChange(e, setInputValue)}
        />
        <button
          ref={buttonRef}
          className="px-3 py-2 text-sm border rounded font-roboto dark:border-gray-300 bg-gray-50 dark:bg-gray-444 focus:outline-none"
          type="submit"
        >
          <span className=" dark:text-gray-50">Add</span>
        </button>
      </div>
    </form>
  );
};

export default Input;
