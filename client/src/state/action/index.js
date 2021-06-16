import axios from "axios";
import { API_KEY, ROUTES, URI } from "../../config/config";

/* Start Dark mode action */
const darkMode = "DARK_MODE";
export const darkModeAction = () => ({ type: darkMode });
/* End Dark mode action */

/* Start Async Fetch Data from API action */
const fetchTaskSuccess = "FETCH_TASK_SUCCESS",
  fetchTaskFailure = "FETCH_TASK_FAILURE";

export const fetchDataSuccessAction = (data) => ({
  type: fetchTaskSuccess,
  payload: data,
});

export const fetchDataFailureAction = (error) => ({
  type: fetchTaskFailure,
  payload: error,
});

export const fetchDataAsyncAction = () => {
  return (dispatch) => {
    axios
      .get(`${URI.URI}${ROUTES.FETCH_ROUTE}`, {
        headers: {
          api_key: `${API_KEY.FETCH_API_KEY}`,
        },
      })
      .then((res) => {
        dispatch(fetchDataSuccessAction(res["data"]["data"]));
      })
      .catch((err) => {
        console.log(err);
        dispatch(fetchDataFailureAction(err["message"]));
      });
  };
};
/* End Async Fetch Data from API action */

/* Start Async Add Data from API action */
const addTaskSuccess = "ADD_TASK_SUCCESS",
  addTaskFailure = "ADD_TASK_FAILURE";

export const addDataSuccessAction = (data) => ({
  type: addTaskSuccess,
  payload: data,
});

export const addDataFailureAction = (error) => ({
  type: addTaskFailure,
  payload: error,
});

export const addTaskAsyncAction = (taskTitle) => {
  return (dispatch) => {
    axios
      .post(
        `${URI.URI}${ROUTES.ADD_ROUTE}`,
        {
          action: "CREATE",
          payload: {
            taskTitle,
            isCompleted: false,
            isImportant: false,
            isDeleted: false,
          },
        },
        {
          headers: {
            api_key: `${API_KEY.ADD_API_KEY}`,
          },
        }
      )
      .then((res) => {
        dispatch(
          addDataSuccessAction({
            _id: res["data"]["data"]["_id"],
            taskTitle,
            isCompleted: false,
            isImportant: false,
            isDeleted: false,
          })
        );
      })
      .catch((err) => {
        console.log(err);
        dispatch(addDataFailureAction(err["message"]));
      });
  };
};
/* End Async Add Data from API action */

/* Start Async Complete Task Data from API action */
const completeTaskSuccess = "COMPLETE_TASK_SUCCESS",
  completeTaskFailure = "COMPLETE_TASK_FAILURE";

export const completedDataSuccessAction = (data) => ({
  type: completeTaskSuccess,
  payload: data,
});

export const completedDataFailureAction = (error) => ({
  type: completeTaskFailure,
  payload: error,
});

export const completeTaskAsyncAction = ({ _id, isCompleted }) => {
  return (dispatch) => {
    axios
      .patch(
        `${URI.URI}${ROUTES.UPDATE_ROUTE}`,
        {
          action: "UPDATE",
          payload: {
            _id,
            data: { isCompleted: !isCompleted },
          },
        },
        {
          headers: {
            api_key: `${API_KEY.UPDATE_API_KEY}`,
          },
        }
      )
      .then((res) => {
        dispatch(
          completedDataSuccessAction({
            _id: res["data"]["data"]["_id"],
          })
        );
      })
      .catch((err) => {
        console.log(err);
        dispatch(completedDataFailureAction(err["message"]));
      });
  };
};
/* End Async Complete Task Data from API action */

/* Start Async Important Task Data from API action */
const importantTaskSuccess = "IMPORTANT_TASK_SUCCESS",
  importantTaskFailure = "IMPORTANT_TASK_FAILURE";

export const importantDataSuccessAction = (data) => ({
  type: importantTaskSuccess,
  payload: data,
});

export const importantDataFailureAction = (error) => ({
  type: importantTaskFailure,
  payload: error,
});

export const importantTaskAsyncAction = ({ _id, isImportant }) => {
  return (dispatch) => {
    axios
      .patch(
        `${URI.URI}${ROUTES.UPDATE_ROUTE}`,
        {
          action: "UPDATE",
          payload: {
            _id,
            data: { isImportant: !isImportant },
          },
        },
        {
          headers: {
            api_key: `${API_KEY.UPDATE_API_KEY}`,
          },
        }
      )
      .then((res) => {
        dispatch(
          importantDataSuccessAction({
            _id: res["data"]["data"]["_id"],
          })
        );
      })
      .catch((err) => {
        console.log(err);
        dispatch(importantDataFailureAction(err["message"]));
      });
  };
};
/* End Async Important Task Data from API action */

/* Start Delete Important Task Data from API action */
const deleteTaskSuccess = "DELETE_TASK_SUCCESS",
  deleteTaskFailure = "DELETE_TASK_FAILURE";

export const deleteDataSuccessAction = (data) => ({
  type: deleteTaskSuccess,
  payload: data,
});

export const deleteDataFailureAction = (error) => ({
  type: deleteTaskFailure,
  payload: error,
});

export const deleteTaskAsyncAction = ({ _id, isDeleted }) => {
  return (dispatch) => {
    axios
      .patch(
        `${URI.URI}${ROUTES.UPDATE_ROUTE}`,
        {
          action: "UPDATE",
          payload: {
            _id,
            data: { isDeleted: !isDeleted },
          },
        },
        {
          headers: {
            api_key: `${API_KEY.UPDATE_API_KEY}`,
          },
        }
      )
      .then((res) => {
        dispatch(
          deleteDataSuccessAction({
            _id: res["data"]["data"]["_id"],
          })
        );
      })
      .catch((err) => {
        console.log(err);
        dispatch(deleteDataFailureAction(err["message"]));
      });
  };
};
/* End Async Delete Task Data from API action */

/* Start Erase Task Data from API action */
const eraseTaskSuccess = "ERASE_TASK_SUCCESS",
  eraseTaskFailure = "ERASE_TASK_FAILURE";

export const eraseDataSuccessAction = (data) => ({
  type: eraseTaskSuccess,
  payload: data,
});

export const eraseDataFailureAction = (error) => ({
  type: eraseTaskFailure,
  payload: error,
});

export const eraseTaskAsyncAction = ({ _id }) => {
  return (dispatch) => {
    axios
      .delete(`${URI.URI}${ROUTES.DELETE_ROUTE}`, {
        headers: {
          api_key: `${API_KEY.DELETE_API_KEY}`,
        },
        data: {
          action: "DELETE",
          payload: {
            _id,
          },
        },
      })
      .then((res) => {
        dispatch(
          eraseDataSuccessAction({
            _id: res["data"]["data"]["_id"],
          })
        );
      })
      .catch((err) => {
        console.log(err);
        dispatch(eraseDataFailureAction(err["message"]));
      });
  };
};
/* End Erase Task Data from API action */
