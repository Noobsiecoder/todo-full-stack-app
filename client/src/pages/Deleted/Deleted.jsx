import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchDataAsyncAction } from "../../state/action";

import Tasks from "../components/Tasks/Tasks";

const Deleted = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchDataAsyncAction());
  }, [dispatch]);
  return (
    <div className="w-full">
      <h2 className="text-lg text-center font-roboto dark:text-gray-50">
        Deleted Tasks
      </h2>
      <div className="mt-4">
        <Tasks type="DELETE" />
      </div>
    </div>
  );
};

export default Deleted;
