import { useDispatch, useSelector } from "react-redux";

import { darkModeAction } from "../../../state/action";

import Moon from "../svg/Moon";
import Sun from "../svg/Sun";

function handleClick(e, dispatch) {
  e.preventDefault();
  dispatch(darkModeAction());
}

const PageTheme = () => {
  const darkMode = useSelector((state) => state.darkModeReducer.darkMode);
  const dispatch = useDispatch();
  return (
    <button
      onClick={(e) => handleClick(e, dispatch)}
      className="p-2 focus:outline-none"
    >
      {!darkMode ? <Moon /> : <Sun />}
    </button>
  );
};

export default PageTheme;
