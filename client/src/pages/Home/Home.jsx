import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchDataAsyncAction } from "../../state/action";

import Input from "../components/Input/Input";
import Tasks from "../components/Tasks/Tasks";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchDataAsyncAction());
  }, [dispatch]);
  return (
    <div className="w-full">
      <h2 className="text-lg text-center font-roboto dark:text-gray-50">
        All Tasks
      </h2>
      <div className="mt-4">
        <Tasks type="HOME" />
      </div>
      <div className="mt-12">
        <Input />
      </div>
    </div>
  );
};

export default Home;
