import { combineReducers } from "redux";
import { pageTheme, taskStore } from "../store";

function findItemIndex(state, { _id }) {
  return state.tasks.findIndex((task) => task._id === _id);
}

const darkModeReducer = (state = pageTheme, action) => {
  switch (action.type) {
    case "DARK_MODE":
      return { darkMode: !state.darkMode };
    default:
      return state;
  }
};

const taskReducer = (state = taskStore, action) => {
  switch (action.type) {
    /* Start Fetch task reducer */
    case "FETCH_TASK_SUCCESS":
      const data = [...state.tasks, ...action.payload];
      return {
        tasks: data.filter(
          (currentValue, index, arr) =>
            arr.findIndex((task) => task._id === currentValue._id) === index
        ),
      };
    case "FETCH_API_FAILURE":
      return { error: [action.payload] };
    /* End Fetch task reducer */

    /* Start Add task reducer */
    case "ADD_TASK_SUCCESS":
      return {
        tasks: [...state.tasks, action.payload],
      };
    case "ADD_TASK_FAILURE":
      return {
        tasks: [...state.tasks],
      };
    /* End Add task reducer */

    /* Start Complete task reducer */
    case "COMPLETE_TASK_SUCCESS": {
      let objIndex = findItemIndex(state, action.payload);
      state.tasks[objIndex]["isCompleted"] = !state.tasks[objIndex][
        "isCompleted"
      ];
      return { tasks: [...state.tasks] };
    }
    case "COMPLETE_TASK_FAILURE": {
      return { tasks: [...state.tasks] };
    }
    /* End Complete task reducer */

    /* Start Important task reducer */
    case "IMPORTANT_TASK_SUCCESS": {
      let objIndex = findItemIndex(state, action.payload);
      state.tasks[objIndex]["isImportant"] = !state.tasks[objIndex][
        "isImportant"
      ];
      return { tasks: [...state.tasks] };
    }
    case "IMPORTANT_TASK_FAILURE": {
      return { tasks: [...state.tasks] };
    }
    /* End Important task reducer */

    /* Start Delete task reducer */
    case "DELETE_TASK_SUCCESS": {
      let objIndex = findItemIndex(state, action.payload);
      state.tasks[objIndex]["isDeleted"] = !state.tasks[objIndex]["isDeleted"];
      return { tasks: [...state.tasks] };
    }
    case "DELETE_TASK_FAILURE": {
      return { tasks: [...state.tasks] };
    }
    /* End Delete task reducer */

    /* Start Erase task reducer */
    case "ERASE_TASK_SUCCESS":
      return {
        tasks: [
          ...state.tasks.filter(
            (task) => task["_id"] !== action.payload["_id"]
          ),
        ],
      };
    case "ERASE_TASK_FAILURE":
      return {
        tasks: [...state.tasks],
      };
    /* End Erase task reducer */

    default:
      return state;
  }
};

const rootReducers = combineReducers({
  darkModeReducer,
  taskReducer,
});

export default rootReducers;
