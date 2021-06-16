import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";

import Header from "./pages/components/Header/Header";
import Home from "./pages/Home/Home";
import Important from "./pages/Important/Important";
import Deleted from "./pages/Deleted/Deleted";

const App = () => {
  const darkMode = useSelector((state) => state.darkModeReducer.darkMode);
  return (
    <div className={`${darkMode ? "dark" : null}`}>
      <div className="relative min-h-screen bg-white dark:bg-gray-333">
        <BrowserRouter>
          <Header />
          <main className="px-4 py-12 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
            <div className="p-6 border rounded dark:border-gray-50">
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/important" component={Important} />
                <Route path="/delete" component={Deleted} />
              </Switch>
            </div>
          </main>
        </BrowserRouter>
      </div>
    </div>
  );
};

export default App;
